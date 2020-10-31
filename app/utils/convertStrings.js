export const convertStrings = (str) => {
  const newStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return newStr;
};
