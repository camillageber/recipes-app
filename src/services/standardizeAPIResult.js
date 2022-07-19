export default function standardizeAPIResult(recipes) {
  const result = Object.entries(recipes)
    .reduce((acc, current) => {
      const [key, value] = current;
      if (value && value !== ' ') {
        const keyWithoutStr = key.split('str').join('');
        const keyWithoutMeal = keyWithoutStr
          .toLocaleLowerCase().replace('meal', 'recipe');
        const keyWithoutDrink = keyWithoutMeal
          .toLocaleLowerCase().replace('drink', 'recipe');
        acc[keyWithoutDrink] = value;
      }
      return acc;
    }, {});

  return result;
}
