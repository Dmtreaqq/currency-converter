import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { getCurrencyCode, getCountryByCode } from '../../helpers/getCurrencyCode';

function CurrentCourse({ currencies }) {
  const [fetchedData, setFetchedData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let data;
      const ls = localStorage.getItem('currencyConverter');

      if (!ls) {
        data = await axios.get('https://api.monobank.ua/bank/currency');
        localStorage.setItem('currencyConverter', JSON.stringify(data));
      } else {
        data = JSON.parse(ls);
      }

      setFetchedData(data);
    };

    getData();
  }, []);

  const getAllCurrencies = ({ data }) => {
    let currenciesArr = [];

    currencies.forEach((country) => {
      currenciesArr = currenciesArr.concat(
        data
          .filter((el) => el.currencyCodeA === getCurrencyCode(country)
            && el.currencyCodeB === 980),
      );
    });

    return (
      currenciesArr.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <span style={{ marginRight: '5px' }}>{getCountryByCode(el.currencyCodeA)}</span>
          <span>{el.rateSell}</span>
        </div>
      ))
    );
  };

  return (
    <aside className="currentcourse">
      <h3>Курс валют</h3>
      <div>
        {fetchedData
          && Object.keys(fetchedData).length !== 0
          ? getAllCurrencies(fetchedData) : null}
      </div>
    </aside>
  );
}

CurrentCourse.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CurrentCourse;
