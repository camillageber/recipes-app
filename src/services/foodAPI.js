/**
 * It takes a meal name as an argument, and returns an array of meals that match the name
 * @param mealName - The name of the meal you want to search for.
 * @returns An array of objects.
 */
export async function searchMealByName(mealName) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals);

  return result;
}
export async function searchFirstLetter(mealName) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals);

  return result;
}

/**
 * It takes the id of a meal, fetches the data from the API, and returns an object with the data
 * @param id - The id of the meal you want to get the details for.
 * @returns An object with the meal details.
 */
export async function getAllMealDetailsById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals);

  result[0].strMealThumbPreview = `${result[0].strMealThumb}/preview`;
  return result[0];
}

/**
 * It fetches the data from the API and returns the data in an object
 * @returns An object with 3 properties: CategoriesList, AreaList, IngredientsList.
 */
export async function getAllCategoriesAreaIngredients() {
  const urlCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const CategoriesList = await fetch(urlCategories)
    .then((response) => response.json())
    .then((response) => response.meals);

  const urlArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const AreaList = await fetch(urlArea)
    .then((response) => response.json())
    .then((response) => response.meals);

  const urlIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const IngredientsList = await fetch(urlIngredients)
    .then((response) => response.json())
    .then((response) => response.meals);

  return {
    CategoriesList,
    AreaList,
    IngredientsList,
  };
}

/**
 * It takes an ingredient as a parameter, fetches the data from the API, and returns the data
 * @param Ingredient - The main ingredient of the meal.
 * @returns An array of objects.
 */
export async function getByMainIngredient(Ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals)
    .catch((e) => console.log(`error ${e}`));

  return result;
}
/**
 * It takes a category as a parameter, fetches the data from the API, and returns the data
 * @param Category - The category of the meal you want to filter by.
 * @returns An array of objects.
 */
export async function getByCategory(Category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals)
    .catch((e) => console.log(`error ${e}`));

  return result;
}
/**
 * It takes an area as a parameter, fetches the data from the API, and returns the data
 * @param Area - String
 * @returns An array of objects.
 */
export async function getByArea(Area) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals)
    .catch((e) => console.log(`error ${e}`));

  return result;
}

/**
 * It takes a dateFilter and a filter as parameters, and returns an array of meals
 * @param dataFilter - The date you want to filter by.
 * @param filter - a = Area, i = Main Ingredient, c = Category
 * @returns An array of objects.
 */
export async function getFoodBy(dataFilter, filter) {
  if (!'aicsf'.includes(filter) || !dataFilter) return [];
  if (filter === 's') {
    return searchMealByName(dataFilter);
  } if (filter === 'f') {
    return searchFirstLetter(dataFilter);
  }
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${filter}=${dataFilter}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response)
    .catch((e) => console.log(`error ${e}`));

  return result;
}
