/* eslint-disable */

import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchBooks } from '@reducers/books';
import styles from './index.module.css';

const Search = (props) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);

  }

  const successSearch = () => {

  }

  const failureSearch = () => {

  }

  useEffect(
    () => {
      props.searchBooks(searchText)
        .then(successSearch)
        .catch(failureSearch);
    },
    [searchText]
  );

  return (
    <div className="row">
      <div className="col px-4 pt-3">
        <input type="text" onChange={handleChange} className={styles.searchText} placeholder="Search for a particular Book"/>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchBooks,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);
