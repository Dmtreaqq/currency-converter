const currencyCodes = {
  USD: 840,
  EUR: 978,
};

export function getCurrencyCode(stringCode) {
  return currencyCodes[stringCode];
}

export function getCountryByCode(value) {
  return Object.keys(currencyCodes).find((key) => currencyCodes[key] === value);
}
