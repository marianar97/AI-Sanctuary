/**
 * localStorage.js
 * 
 * Utility functions for working with localStorage to persist application state.
 */

/**
 * Save data to localStorage with the given key
 * @param {string} key - The key to store the data under
 * @param {any} data - The data to store (will be JSON stringified)
 */
export const saveToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving to localStorage with key ${key}:`, error);
  }
};

/**
 * Load data from localStorage with the given key
 * @param {string} key - The key to retrieve data from
 * @param {any} defaultValue - Default value to return if key doesn't exist
 * @returns {any} The parsed data or defaultValue if not found
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error loading from localStorage with key ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage with the given key
 * @param {string} key - The key to remove
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage with key ${key}:`, error);
  }
};

/**
 * Clear all data from localStorage
 */
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Check if localStorage is available in the current environment
 * @returns {boolean} True if localStorage is available
 */
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};