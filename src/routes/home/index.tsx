import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import get from 'axios';
import style from './style.css';

const Home: FunctionalComponent = function () {
  const url = `${window.location.href.replace('3000', '3001')}api/greeting`;

  const domId = 'url_form';
  const [text, setText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const response = await get(url).then((res:any) => JSON.parse(res.data));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

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
          className={style.input}
          value={text}
          onInput={(e) => setText(e?.target?.value || '')}
        />
      </form>
    </div>
  );
};

export default Home;
