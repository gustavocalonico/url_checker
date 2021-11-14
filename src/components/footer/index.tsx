import { FunctionalComponent, h } from 'preact';
import style from './style.css';

const Footer: FunctionalComponent = function() {
  return (
    <div className={style.footer}>
      <h5>Made with Preact, 2021 </h5>
    </div>
  );
};

export default Footer;
