import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import get from 'axios';
import { isUrlValid } from '../../utils/validation';
import style from './style.css';
import Loading from '../../components/loading';
import Info from '../../components/info';

const Home: FunctionalComponent = function () {
  const api = `${window.location.href.replace('3000', '3001')}api/greeting`;

  const domId = 'url_form';
  const [urlValue, setUrlValue] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [linkType, setlinkType] = useState<string>();

  // Effect for checking url content
  useEffect(() => {
    const timeout = 500;

    // Debouncing server call
    const debounceTimeout = setTimeout(async () => {
      if (urlValue) {
        setLoading(true);
        const response = await get(api, { params: { url: urlValue }})
          .then((res:any) => JSON.parse(res.data));
        const { type } = response;
        setlinkType(type);
        setLoading(false);
      }
    }, timeout);
    return () => clearTimeout(debounceTimeout);
  }, [api, urlValue]);

  // When user stops typing, trigger url syntax check.
  // If valid, trigger throttled verification
  const onKeyUp = (value : string) => {
    setUrlValue((prevState? : string) => {
      if (value === prevState) return prevState;

      if (isUrlValid(value)) {
        return value;
      }
      setlinkType('invalid');
      return prevState;
    });
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
          onKeyUp={(e) => onKeyUp((e?.target as HTMLInputElement).value)}
          className={style.input}
        />
        {isLoading ? (
          <Loading />
        ) : <Info type={linkType} />}
      </form>

    </div>
  );
};

export default Home;
