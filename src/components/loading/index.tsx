import { FunctionalComponent, h } from 'preact';
import Loader from 'react-loader-spinner';
import style from './style.css';

const Loading: FunctionalComponent = function () {
  return (
    <div className={style.loading}>
      <Loader
        type="TailSpin"
      />
    </div>
  );
};

export default Loading;
