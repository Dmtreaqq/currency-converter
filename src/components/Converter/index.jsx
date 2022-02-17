import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';

import getCurrencyExchange from '../../helpers/getCurrencyExchange';
// import { map } from 'rxjs/operators';
// import useObservable from '../../hooks/useObservable';

function Converter({ currencies }) {
  const firstEl = useRef(null);
  const secondEl = useRef(null);

  getCurrencyExchange(840, 980);

  useEffect(() => {
    const inputFirst$ = fromEvent(firstEl.current, 'input')
      .subscribe(e => {
        secondEl.current.value = (+e.target.value * getCurrencyExchange(840, 980)).toFixed(2);
      });

    const inputSecond$ = fromEvent(secondEl.current, 'input')
      .subscribe(e => {
        firstEl.current.value = (+e.target.value / getCurrencyExchange(840, 980)).toFixed(2);
      });

    return () => {
      inputFirst$.unsubscribe();
      inputSecond$.unsubscribe();
    };
  }, []);

  return (
    <section className="converter">
      <h2>Converter</h2>
      <div className="converter-wrapper">
        <div className="converter-block">
          <input type="number" autoComplete="off" ref={firstEl} />
          <select name="currencyFirst" id="currencyFirst">
            {currencies.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
        <div className="converter-block">
          <input type="number" autoComplete="off" ref={secondEl} />
          <select defaultValue="UAH" name="currencySecond" id="currencySecond">
            {currencies.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

Converter.propTypes = { currencies: PropTypes.arrayOf(PropTypes.string).isRequired };

export default Converter;
