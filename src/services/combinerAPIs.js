import * as foodAPI from './foodAPI';
import * as drinkAPI from './drinkAPI';

/**
 * It returns an object with the same keys, but the values are different depending on the type of
 * result
 * @param typeResult - This is the type of result you want to get. It can be either 'foods' or
 * 'drinks'.
 * @returns An object with the following properties:
 * getBy, getByAlcoholic, getByAllList, getByArea, getByCategory, getByFirstLetter, getByGlass,
 * getById, getByIdIngredient, getByIngredient, getByName
 */
export default function useResultAPIs(typeResult) {
  if (typeResult === 'foods') {
    return {
      getBy: foodAPI.getFoodBy,
      getByAlcoholic: null,
      getByAllList: foodAPI.getAllCategoriesAreaIngredients,
      getByArea: foodAPI.getByArea,
      getByCategory: foodAPI.getByCategory,
      getByFirstLetter: foodAPI.searchFirstLetter,
      getByGlass: null,
      getById: foodAPI.getAllMealDetailsById,
      getByIdIngredient: null,
      getByIngredient: foodAPI.getByMainIngredient,
      getByName: foodAPI.searchMealByName,
      getAllCategories: foodAPI.getAllCategories,
    };
  }
  if (typeResult === 'drinks') {
    return {
      getBy: drinkAPI.getDrinkBy,
      getByAlcoholic: drinkAPI.getByAlcoholic,
      getByAllList: drinkAPI.getAllCategoriesAlcoholicGlassesIngredients,
      getByArea: null,
      getByCategory: drinkAPI.getByCategory,
      getByFirstLetter: drinkAPI.searchFirstLetter,
      getByGlass: drinkAPI.getByGlass,
      getById: drinkAPI.getAllDrinkDetailsById,
      getByIdIngredient: drinkAPI.getAllIngredientDetailsById,
      getByIngredient: drinkAPI.getByDrinkIngredient,
      getByName: drinkAPI.searchDrinkByName,
      getAllCategories: drinkAPI.getAllCategories,
    };
  }
  return null;
}
