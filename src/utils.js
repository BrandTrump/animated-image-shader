export const debounce = (callback, delay = 250) => {
  let timeoutID;

  return (...args) => {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = null;
      callback(...args);
    }, delay);
  };
};
