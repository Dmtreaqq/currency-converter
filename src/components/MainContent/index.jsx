import Converter from '../Converter';

export default function MainContent() {
  return (
    <main className="main">
      <Converter currencies={['USD', 'EUR', 'UAH']} />
    </main>
  );
}
