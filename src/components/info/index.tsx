import { FunctionalComponent, h } from 'preact';
import {
  BsFillFileCheckFill, BsFillFolderFill, BsFillQuestionSquareFill, BsFillExclamationSquareFill,
} from 'react-icons/bs';
import style from './style.css';

interface Props {
  type?: string;
}

const Info: FunctionalComponent<Props> = ({ type }) => {
  const getInfo = () => {
    if (!type) {
      return <div />;
    } if (type === 'file') {
      return (
        <div className={style.info}>
          <h3>File found in url</h3>
          <h1 className={style.icon}>
            <BsFillFileCheckFill />
          </h1>
        </div>
      );
    } if (type === 'directory') {
      return (
        <div className={style.info}>
          <h3>Folder found in url</h3>
          <h1 className={style.icon}>
            <BsFillFolderFill />
          </h1>
        </div>
      );
    } if (type === 'invalid') {
      return (
        <div className={style.info}>
          <h3>Url is invalid</h3>
          <h1 className={style.icon}>
            <BsFillExclamationSquareFill />
          </h1>
        </div>
      );
    }

    return (
      <div className={style.info}>
        <h3>Unknown type of file found in url</h3>
        <h1 className={style.icon}>
          <BsFillQuestionSquareFill />
        </h1>
      </div>
    );
  };

  return getInfo();
};

export default Info;
