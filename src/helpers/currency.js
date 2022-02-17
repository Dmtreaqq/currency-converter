const { data } = JSON.parse(localStorage.getItem('currencyConverter')) || '';

const currenciesCodes = {
  USD: 840,
  EUR: 978,
  UAH: 980,
};

export function getCourse(curr1, curr2) {
  if (curr1 === curr2) {
    return 1;
  }

  let result;
  let arr;

  arr = data.filter(obj => (
    obj.currencyCodeA === curr1 && obj.currencyCodeB === curr2
  ));

  if (arr.length !== 0) {
    result = arr[0].rateSell;
  } else {
    arr = data.filter(obj => (
      obj.currencyCodeA === curr2 && obj.currencyCodeB === curr1
    ));

    result = 1 / arr[0].rateSell;
  }

  return result;
}

export function getCurrencyCode(abbr) {
  return currenciesCodes[abbr];
}

export function getAbbrByCode(currencyCode) {
  return Object.keys(currenciesCodes).find(key => currenciesCodes[key] === currencyCode);
}
