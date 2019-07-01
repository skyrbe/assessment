import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SearchImg from '@assets/images/search.svg';
import Books from '@containers/Books';
import styles from './home.module.css';

const Home = () => {
  return (
    <Fragment>
      <Books />
      <Link className={styles.search} to="/search">
        <img src={SearchImg} alt="search" className="img-fluid" width="20" />
      </Link>
    </Fragment>
  );
};

export default Home;
