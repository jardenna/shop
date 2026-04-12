import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import validateScheduledDate from '../utils/validateScheduledDate.js';
import { t } from './translator.js';

const validateSubCategory = async ({
  categoryStatus,
  scheduledDate,
  categoryId,
  translationKey,
  subCategoryName,
  lang,
}) => {
  const dateValidation = validateScheduledDate(
    categoryStatus,
    scheduledDate,
    lang,
  );

  if (!dateValidation.success) {
    return dateValidation;
  }

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return {
      success: false,
      message: 'The selected category is invalid',
    };
  }

  const mainCategory = await Category.findById(categoryId);
  if (!mainCategory) {
    return {
      success: false,
      message: 'Parent category does not exist',
    };
  }

  if (!translationKey) {
    return {
      success: false,
      message: t('pleaseEnterTranslationKey', lang),
    };
  }

  if (!subCategoryName) {
    return {
      success: false,
      message: t('pleaseEnterCategoryName', lang),
    };
  }

  return { success: true };
};

export default validateSubCategory;
