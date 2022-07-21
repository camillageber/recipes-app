import standardizeAPIResult from './standardizeAPIResult';

function alert(result) {
  if (result.length === 0) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
}

/**
 * It takes a drink name as an argument, and returns an array of drinks that match that name
 * @param drinkName - The name of the drink you want to search for.
 * @returns An array of objects.
 */
export async function searchDrinkByName(drinkName) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .then((response) => (!response ? []
      : response.map((recipe) => standardizeAPIResult(recipe))));

  alert(result);

  return result;
}

/**
 * It takes a letter as an argument, and returns an array of drinks that start with that letter
 * @param firstLetter - The first letter of the drink name.
 * @returns An array of objects.
 */
export async function searchFirstLetter(firstLetter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .then((response) => (!response ? []
      : response.map((recipe) => standardizeAPIResult(recipe))));

  alert(result);

  return result;
}

/**
 * It takes an ingredient name as an argument, and returns an array of drinks that contain that
 * ingredient
 * @param ingredient - The ingredient you want to search for.
 * @returns An array of objects.
 */
export async function searchIngredientName(ingredient) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`;
  console.log(url);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .then((response) => response.map((recipe) => standardizeAPIResult(recipe)));

  return result;
}

/**
 * It takes in a drink id, fetches the drink details from the API, and returns the drink details
 * @param id - The id of the drink you want to get the details for.
 * @returns An object with the drink details.
 */
export async function getAllDrinkDetailsById(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log(url);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks[0])
    .then((response) => standardizeAPIResult(response));

  return result;
}

/**
 * It takes an idIngredient as a parameter, fetches the data from the API, and returns the result
 * @param idIngredient - The id of the ingredient you want to get the details for.
 * @returns An object with the details of the ingredient.
 */
export async function getAllIngredientDetailsById(idIngredient) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${idIngredient}`;
  console.log(url);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const newResult = standardizeAPIResult(await result);

  return newResult;
}

/**
 * It fetches the data from the API and returns an object with the data
 * @returns An object with the following properties:
 * categoriesList
 * alcoholicList
 * ingredientsList
 * glassesList
 */
export async function getAllCategoriesAlcoholicGlassesIngredients() {
  const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const categoriesList = await fetch(urlCategories)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const urlAlcoholic = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  const alcoholicList = await fetch(urlAlcoholic)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const urlGlasses = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
  const glassesList = await fetch(urlGlasses)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const urlIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const ingredientsList = await fetch(urlIngredients)
    .then((response) => response.json())
    .then((response) => response.drinks);

  return {
    categoriesList,
    alcoholicList,
    ingredientsList,
    glassesList,
  };
}

/**
 * It fetches the list of categories from the API and returns it
 * @returns An array of objects.
 */
export async function getAllCategories() {
  const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const categoriesList = await fetch(urlCategories)
    .then((response) => response.json())
    .then((response) => response.drinks);

  return categoriesList;
}

/**
 * It takes an ingredient as a parameter, and returns a list of drinks that contain that ingredient
 * @param Ingredient - The ingredient you want to search for.
 * @returns An array of objects.
 */
export async function getByDrinkIngredient(Ingredient) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${Ingredient}`;
  console.log(url);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .then((response) => (!response ? []
      : response.map((recipe) => standardizeAPIResult(recipe))));

  alert(result);

  return result;
}

/**
 * It takes a category as a parameter, fetches the data from the API, and returns the data
 * @param Category - The category of the drink.
 */
export async function getByCategory(Category) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${Category}`;
  console.log(url);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .catch((e) => console.log(`error ${e}`));

  const newResult = await result.map((recipe) => standardizeAPIResult(recipe));

  return newResult;
}

/**
 * It takes a glass type as a parameter, fetches the data from the API, and returns the data
 * @param glass - The glass to use to filter the drinks.
 * @returns An array of objects.
 */
export async function getByGlass(glass) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .catch((e) => console.log(`error ${e}`));

  return result;
}

/**
 * It takes a boolean value and returns an array of objects
 * @param isAlcoholic - "Alcoholic", "Non_Alcoholic" or "Optional_Alcohol"
 * @returns An array of objects.
 */
export async function getByAlcoholic(isAlcoholic) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${isAlcoholic}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .catch((e) => console.log(`error ${e}`));

  const newResult = await result.map((recipe) => standardizeAPIResult(recipe));

  return newResult;
}

/**
 * It takes a filter and a filter value, and returns an array of drinks that match the filter
 * @param dataFilter - The value of the filter.
 * @param filter - a, i, c, s, f, g
 */
export async function getDrinkBy(dataFilter, filter) {
  if (!dataFilter) return [];
  switch (filter) {
  case 'a':
    return getByAlcoholic(dataFilter);
  case 'i':
    return getByDrinkIngredient(dataFilter);
  case 'c':
    return getByCategory(dataFilter);
  case 's':
    return searchDrinkByName(dataFilter);
  case 'f':
    return searchFirstLetter(dataFilter);
  case 'g':
    return getByGlass(dataFilter);
  default:
    return [];
  }
}
