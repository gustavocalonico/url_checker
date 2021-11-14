import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

const Home: FunctionalComponent = function () {
  const domId = 'url_form';
  const [text, setText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(text); // Implement the verification here
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
