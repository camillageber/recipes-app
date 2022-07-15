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

  console.log(result);

  return result;
}

/**
 * It takes an id as an argument, and returns the details of the meal with that id
 * @param id - The id of the meal you want to fetch.
 * @returns The result is an array of objects.
 */
export async function getAllMealDetailsById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals);

  const resultwhitPreview = { ...result[0],
    strMealThumbPreview: `${result[0].strMealThumb}/preview`,
  };
  console.log(resultwhitPreview);
  return { resultwhitPreview };
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

  console.log(result);
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

  console.log(result);
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

  console.log(result);
  return result;
}

/**
 * It takes a dateFilter and a filter as parameters, and returns an array of meals
 * @param dateFilter - The date you want to filter by.
 * @param filter - a = Area, i = Main Ingredient, c = Category
 * @returns An array of objects.
 */
export async function getBy(dateFilter, filter) {
  if (!'aic'.includes(filter)) return [];
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${filter}=${dateFilter}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.meals)
    .catch((e) => console.log(`error ${e}`));

  console.log(result);
  return result;
}
