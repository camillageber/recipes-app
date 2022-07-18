export async function searchCocktailByName(drinkName) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks);

  console.log(result);

  return result;
}

export async function searchFirstLetter(drinkName) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drinkName}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks);

  return result;
}

export async function getAllCategoriesAreaIngredients() {
  const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const CategoriesList = await fetch(urlCategories)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const urlAlcoholic = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  const AlcoholicList = await fetch(urlAlcoholic)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const urlIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const IngredientsList = await fetch(urlIngredients)
    .then((response) => response.json())
    .then((response) => response.drinks);

  const urlGlass = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
  const GlassList = await fetch(urlGlass)
    .then((response) => response.json())
    .then((response) => response.drinks);

  return {
    CategoriesList,
    AlcoholicList,
    IngredientsList,
    GlassList,
  };
}

export async function getAllDrinkDetailsById(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks);

  result[0].strDrinkThumbPreview = `${result[0].strDrinkThumb}/preview`;
  console.log(result[0]);
  return result[0];
}

export async function getDrinkBy(dataFilter, filter) {
  if (!'aicsf'.includes(filter) || !dataFilter) return [];
  if (filter === 's') {
    return searchCocktailByName(dataFilter);
  } if (filter === 'f') {
    return searchFirstLetter(dataFilter);
  }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filter}=${dataFilter}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((response) => response)
    .catch((e) => console.log(`error ${e}`));

  return result;
}
