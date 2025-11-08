import { ChangeEvent, useEffect, useState } from 'react';
import useQueryParams from '../hooks/useQueryParams';

const AboutUsPage = () => {
  const {
    allQueryParams,
    getQueryParamByKey,
    setQueryParam,
    removeQueryParamByKey,
  } = useQueryParams();

  const [input, setInput] = useState<string>(getQueryParamByKey('search'));
  const [page, setPage] = useState<number>(Number(getQueryParamByKey('page')));

  useEffect(() => {
    setQueryParam('search', input);
  }, [input]);

  useEffect(() => {
    setQueryParam('page', page.toString());
  }, [page]);

  return (
    <div>
      <h1>All Query Params:</h1>
      <pre>{JSON.stringify(allQueryParams)}</pre>
      <h1>Query Param by Key:</h1>
      <span>Search Box : </span>
      <input
        type="text"
        value={input}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setInput(event.target.value);
        }}
      />
      <div>
        <button
          type="button"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
        >
          {'<'}
        </button>
        <span> Current Page: {getQueryParamByKey('page')} </span>
        <button
          type="button"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {'>'}
        </button>
      </div>
      <h1> Remove query param </h1>
      <button
        type="button"
        onClick={() => {
          removeQueryParamByKey('page');
        }}
      >
        Revome page
      </button>
      <button
        type="button"
        onClick={() => {
          removeQueryParamByKey('search');
        }}
      >
        Remove search
      </button>
    </div>
  );
};

export default AboutUsPage;
