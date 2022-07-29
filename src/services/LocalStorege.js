/**
 * If the result of parsing the local storage item is not a result, return undefined, otherwise return
 * the result.
 * @param key - The key of the item you want to get from localStorage.
 * @returns The value of the key in localStorage.
 */
export const getLocalStore = (key) => {
  const result = JSON.parse(localStorage.getItem(key));
  return !result ? undefined : result;
};

/**
 * It sets the local storage to the value of the key.
 * @param key - The key to store the value under.
 * @param value - The value to be stored in the local storage.
 */
export const setLocalStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * It takes a key and a value, gets the local storage for that key, checks if it's an array, and if it
 * is, it adds the value to the array and sets the local storage for that key to the new array
 * @param key - The key of the localStorage item.
 * @param value - The value to be added to the list.
 * @returns the value of the key in localStorage.
 */
export const addToList = (key, value) => {
  const localStorage = getLocalStore(key);

  if (!Array.isArray(localStorage)) return null;

  const newArray = [...localStorage, value];

  console.log(newArray);

  setLocalStore(key, newArray);
};

/**
 * It removes an item from a list in local storage
 * @param key - The key of the local storage item
 * @param id - The id of the item you want to remove.
 * @returns the value of the key in localStorage.
 */
export const removeToList = (key, id) => {
  const localStorage = getLocalStore(key);

  if (!Array.isArray(localStorage)) return null;

  const newValue = localStorage.filter((item) => item.id !== id);

  setLocalStore(key, newValue);
};
