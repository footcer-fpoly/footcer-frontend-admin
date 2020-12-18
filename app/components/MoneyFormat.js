export function formatNumber(num) {
  return num?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export function removeString(str) {
  return str?.toString()?.replace(/,/g, '');
}
