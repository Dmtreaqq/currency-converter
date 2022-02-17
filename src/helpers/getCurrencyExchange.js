const { data } = JSON.parse(localStorage.getItem('currencyConverter'));

function getCurrencyExchange(firstCode, secondCode) {
  const test = data.filter(obj => (
    obj.currencyCodeA === firstCode && obj.currencyCodeB === secondCode
  ));

  return test[0].rateSell;
}

export default getCurrencyExchange;
