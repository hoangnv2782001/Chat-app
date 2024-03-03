export const getValueFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
 
    return value ? value : '';
  };
  