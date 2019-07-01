import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '@containers/Search';
import SearchList from '@containers/SearchList';

const Search = () => {
  return (
    <Fragment>
      <Link to="/" className="mt-3 mb-3">
        Back To Home
      </Link>
      <SearchBox />
      <SearchList />
    </Fragment>
  );
};

export default Search;
