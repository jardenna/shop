import mongoose from 'mongoose';
import { PUBLISHED } from '../config/constants.js';
import Product from '../models/productModel.js';

const buildCategoryJoinPipeline = ({ subCategoryId, mainCategory }) => {
  const categoryMatchStage = [
    {
      $match: {
        'subCategoryData.categoryStatus': PUBLISHED,
        'categoryData.categoryStatus': PUBLISHED,
      },
    },
  ];

  if (subCategoryId) {
    categoryMatchStage.push({
      $match: {
        'subCategoryData._id': new mongoose.Types.ObjectId(subCategoryId),
      },
    });
  }

  if (mainCategory) {
    categoryMatchStage.push({
      $match: {
        'categoryData.categoryName': {
          $regex: `^${mainCategory}$`,
          $options: 'i',
        },
      },
    });
  }

  return [
    {
      $lookup: {
        from: 'subcategories',
        localField: 'subCategory',
        foreignField: '_id',
        as: 'subCategoryData',
      },
    },
    { $unwind: '$subCategoryData' },
    {
      $lookup: {
        from: 'categories',
        localField: 'subCategoryData.category',
        foreignField: '_id',
        as: 'categoryData',
      },
    },
    { $unwind: '$categoryData' },
    ...categoryMatchStage,
  ];
};

const buildProductFieldsPipeline = () => [
  {
    $addFields: {
      discountedPrice: {
        $round: [
          {
            $subtract: [
              '$price',
              {
                $multiply: ['$price', { $divide: ['$discount', 100] }],
              },
            ],
          },
          0,
        ],
      },
      image: {
        $arrayElemAt: ['$images', 0],
      },
    },
  },
  { $unset: 'images' },
];

const buildShopProductProjection = () => [
  {
    $addFields: {
      id: '$_id',
      subCategoryId: '$subCategory',
      subCategoryName: '$subCategoryData.subCategoryName',
      categoryName: '$categoryData.categoryName',
    },
  },
  {
    $project: {
      _id: 0,
      subCategoryData: 0,
      categoryData: 0,
      __v: 0,
      subCategory: 0,
    },
  },
];

const getProductListing = async ({
  productsPerPage,
  page,
  subCategoryId,
  mainCategory,
  filter = {},
  saleOnly = false,
}) => {
  const categoryJoinPipeline = buildCategoryJoinPipeline({
    subCategoryId,
    mainCategory,
  });

  const baseMatch = {
    ...filter,
    productStatus: PUBLISHED,
    ...(saleOnly && { discount: { $gt: 0 } }),
  };

  const productPipeline = [
    ...categoryJoinPipeline,
    { $match: baseMatch },
    ...buildProductFieldsPipeline(),
    { $sort: { createdAt: -1 } },
    { $skip: productsPerPage * (page - 1) },
    { $limit: productsPerPage },
    ...buildShopProductProjection(),
  ];

  const countPipeline = [
    ...categoryJoinPipeline,
    { $match: baseMatch },
    { $count: 'total' },
  ];

  const metaPipeline = [
    ...categoryJoinPipeline,
    { $match: { productStatus: PUBLISHED } },
    ...(saleOnly ? [{ $match: { discount: { $gt: 0 } } }] : []),
    {
      $group: {
        _id: null,
        brands: { $addToSet: '$brand' },
        sizes: { $addToSet: '$sizes' },
      },
    },
    {
      $project: {
        _id: 0,
        brands: 1,
        sizes: 1,
      },
    },
  ];

  const [products, countResult, metaResult] = await Promise.all([
    Product.aggregate(productPipeline),
    Product.aggregate(countPipeline),
    Product.aggregate(metaPipeline),
  ]);

  const productCount = countResult[0]?.total || 0;

  const availableSizesRaw = metaResult[0]?.sizes?.flat() || [];
  const availableSizes = [...new Set(availableSizesRaw)];

  const availableBrandsRaw = metaResult[0]?.brands || [];
  const availableBrands = [...new Set(availableBrandsRaw)].sort(
    (firstBrand, secondBrand) =>
      firstBrand.localeCompare(secondBrand, undefined, {
        sensitivity: 'base',
      }),
  );

  return {
    products,
    productCount,
    availableBrands,
    availableSizes,
  };
};

export default getProductListing;
