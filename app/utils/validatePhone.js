export const validatePhone = (phone) => {
  var regexp = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return regexp?.test(phone);
};
