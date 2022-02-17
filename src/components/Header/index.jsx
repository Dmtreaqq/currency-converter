import CurrentCourse from '../CurrentCourse';

function Header() {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav className="nav">Nav</nav>
      <CurrentCourse
        currencies={['USD', 'EUR']}
      />
    </header>
  );
}

export default Header;
