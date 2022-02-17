import './styles.css';
import Header from './components/Header';
import Converter from './components/Converter';

function App() {
  return (
    <>
      <Header />
      <Converter currencies={['USD', 'EUR', 'UAH']} />
    </>
  );
}

export default App;
