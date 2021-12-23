import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { isUrlValid } from '../../utils/validation';
import style from './style.css';
import Loading from '../../components/loading';
import Info from '../../components/info';

const { get, CancelToken } = axios;

const Home: FunctionalComponent = function () {
  const api = `${window.location.href.replace('3000', '3001')}api/greeting`;

  const domId = 'url_form';
  const [urlValue, setUrlValue] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [linkType, setlinkType] = useState<string>();
  const axiosTokenSource = CancelToken.source();

  // If urlValue changes, trigger verification
  useEffect(() => {
    if (!urlValue) return;
    get(api, { params: { url: urlValue }, cancelToken: axiosTokenSource.token })
      .then((res : any) => {
        const { type } = JSON.parse(res.data);
        setlinkType(type);
        setLoading(false);
      }).catch((err) => {
        console.log(err.message);
      });
  }, [api, urlValue]);

  const onChange = (urlValue : string) => {
    setLoading(true);

    // If valid, trigger urlValue change
    if (isUrlValid(urlValue)) {
      setUrlValue((prevUrl? : string) => {
        if (prevUrl === urlValue) {
          setLoading(false);
          return prevUrl;
        }
        // Abort last call, if exists
        if (axiosTokenSource.token) {
          axiosTokenSource.cancel(
            `${prevUrl}" => ${urlValue}`,
          );
        }
        return urlValue;
      });
    } else {
      setLoading(false);
      setlinkType('invalid');
    }
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
          onChange={(e) => onChange((e?.target as HTMLInputElement).value)}
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
