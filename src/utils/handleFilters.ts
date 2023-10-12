import { PlanFilterOptions } from '../types/FilterOptions';

export const handlePlanFilter = (
  filters: Omit<PlanFilterOptions, 'search'>,
) => {
  const filterObj = {} as Record<string, unknown>;
  const { maxPrice, minPrice, title } = filters;

  if (Object.keys(filters).length === 0) {
    return filterObj;
  }

  if (title) {
    filterObj['title'] = {
      contains: title,
      mode: 'insensitive',
    };
  }

  if (maxPrice) {
    filterObj.price = {
      lte: +maxPrice,
    };
  }

  if (minPrice) {
    filterObj.price = {
      gte: +minPrice,
    };
  }

  return filterObj;
};
