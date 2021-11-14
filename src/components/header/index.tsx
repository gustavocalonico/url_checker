import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const Header: FunctionalComponent = function () {
  return (
    <header className={style.header}>
      <h1>Url Checker</h1>
    </header>
  );
};

export default Header;
