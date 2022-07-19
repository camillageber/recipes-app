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

/**
 * It takes a letter as an argument, and returns an array of meals whose names start with that letter
 * @param firstLetter - The first letter of the meal you want to search for.
 * @returns An array of objects.
 */
export async function searchFirstLetter(firstLetter) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals);

  return result;
}

/**
 * It takes an id as an argument, fetches the data from the API, and returns the meal details
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
 * @returns An object with three properties: CategoriesList, AreaList, and IngredientsList.
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
 * It takes in a string as an argument, and returns an array of objects
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
 * @param Category - The category of the meal.
 * @returns the result of the fetch request.
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
 * It takes in a filter and a dataFilter, and returns an array of food objects
 * @param dataFilter - the value of the filter
 * @param filter - a, i, c, s, f
 * @returns An array of objects
 */
export async function getFoodBy(dataFilter, filter) {
  if (!dataFilter) return [];
  switch (filter) {
  case 'a':
    return getByArea(dataFilter);
  case 'i':
    return getByMainIngredient(dataFilter);
  case 'c':
    return getByCategory(dataFilter);
  case 's':
    return searchMealByName(dataFilter);
  case 'f':
    return searchFirstLetter(dataFilter);
  default:
    return [];
  }
}
