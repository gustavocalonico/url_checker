import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import get from 'axios';
import { isUrlValid } from '../../utils/validation';
import style from './style.css';

const Home: FunctionalComponent = function () {
  const api = `${window.location.href.replace('3000', '3001')}api/greeting`;

  const domId = 'url_form';
  const [urlValue, setUrlValue] = useState<string>();
  const [inputTimeout, setInputTimeout] = useState<any>();
  // used to check if url is valid and how many were tested
  const [urlCounter, setUrlCounter] = useState(0);

  // If url valid, check its content
  useEffect(() => {
    const timeout = 500 + (urlCounter * 10);
    const debounceTimeout = setTimeout(async () => {
      if (urlValue) {
        const response = await get(api).then((res:any) => JSON.parse(res.data));
        console.log(urlCounter, urlValue, `${timeout}`, response);
      }
    }, timeout);
    return () => clearTimeout(debounceTimeout);
  }, [urlCounter]);

  // When user stops typing, trigger url syntax check.
  // If valid, trigger throttled verification
  const onKeyUp = (value : string) => {
    clearTimeout(inputTimeout); // Prevent last "onKeyUp" to execute

    setInputTimeout(setTimeout(() => {
      setUrlValue((prevState : string) => {
        if (isUrlValid(value)) {
          setUrlCounter(urlCounter + 1);
          return value;
        }
        return prevState;
      });
    }, 800));
  };

  const onSubmit = (e : h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
  };

  return (
    <div className={style.home}>
      <h2>Please enter a valid URL:</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="url"
          id={domId}
          onKeyUp={(e) => onKeyUp(e?.target?.value)}
          className={style.input}
        />
      </form>
    </div>
  );
};

export default Home;
