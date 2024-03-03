import { useState, useEffect } from 'react';


/**
 * Dùng để cập nhật dữ liệu vào localstorage
 * @param {String} key 
 * @param {*} defaultValue 
 * @returns {Array} [value , setValueInLocalStorage]
 */

export default function useLocalStorage(key, defaultValue) {

  /**
   * useState nhân vào một callback
   * Trả về defaultValue nếu storedValue === null ngược lại JSON.parse(storedValue)
   */
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  /**
   * @param{Function} Được thực thi khi render component hoặc dependency thay đổi
   * @param{[]} các tham số 
   * @returns{Function} clean function được gọi khi component bị huỷ bỏ hoặc dependency thay đổi
   */

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', listener);



    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);


  /**
   * 
   * @param {object| function} newValue
   * setValueInLocalStorage được dùng để cập nhật newvalue, nó gọi đến hàm setValue đê update value
   * setValue nhận một callback(update function ) với tham số là value hiện tại và trả về một object
   * setValue update value = result
   */

  const setValueInLocalStorage = (newValue) => {

    setValue((currentValue) => {
     
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

      localStorage.setItem(key, JSON.stringify(result));

      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
