import CurrentCourse from '../CurrentCourse';

function Header() {
  return (
    <header className="header">
      <CurrentCourse
        currencies={['USD', 'EUR']}
      />
    </header>
  );
}

export default Header;
