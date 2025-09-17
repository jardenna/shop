type ProductCareListProps = {
  careList: string[];
  title: string;
};

const ProductCareList = ({ careList, title }: ProductCareListProps) => (
  <>
    <strong>{title}</strong>
    <ul className="product-care-info">
      {careList.map((list) => (
        <li key={list}>{list}</li>
      ))}
    </ul>
  </>
);

export default ProductCareList;
