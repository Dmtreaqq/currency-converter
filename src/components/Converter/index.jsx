import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';
import { getCourse, getCurrencyCode } from '../../helpers/currency';

// import { map } from 'rxjs/operators';
// import useObservable from '../../hooks/useObservable';

function Converter({ currencies }) {
  const firstEl = useRef(null);
  const secondEl = useRef(null);
  const firstSelect = useRef(null);
  const secondSelect = useRef(null);

  useEffect(() => {
    const inputFirst$ = fromEvent(firstEl.current, 'input')
      .subscribe(() => {
        secondEl.current.value = (firstEl.current.value * getCourse(
          getCurrencyCode(firstSelect.current.value),
          getCurrencyCode(secondSelect.current.value),
        )).toFixed(2);
      });

    const inputSecond$ = fromEvent(secondEl.current, 'input')
      .subscribe(() => {
        firstEl.current.value = (secondEl.current.value / getCourse(
          getCurrencyCode(firstSelect.current.value),
          getCurrencyCode(secondSelect.current.value),
        )).toFixed(2);
      });

    const selectFirst = fromEvent(firstSelect.current, 'input')
      .subscribe(() => {
        secondEl.current.value = (firstEl.current.value * getCourse(
          getCurrencyCode(firstSelect.current.value),
          getCurrencyCode(secondSelect.current.value),
        )).toFixed(2);
      });

    const selectSecond = fromEvent(secondSelect.current, 'input')
      .subscribe(() => {
        firstEl.current.value = (secondEl.current.value / getCourse(
          getCurrencyCode(firstSelect.current.value),
          getCurrencyCode(secondSelect.current.value),
        )).toFixed(2);
      });

    return () => {
      inputFirst$.unsubscribe();
      inputSecond$.unsubscribe();
      selectFirst.unsubscribe();
      selectSecond.unsubscribe();
    };
  }, []);

  return (
    <section className="converter">
      <h2>Converter</h2>
      <div className="converter-wrapper">
        <div className="converter-block">
          <input type="number" autoComplete="off" ref={firstEl} />
          <select name="currencyFirst" ref={firstSelect}>
            {currencies.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </div>
        <div className="converter-block">
          <input type="number" autoComplete="off" ref={secondEl} />
          <select defaultValue="UAH" name="currencySecond" ref={secondSelect}>
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
