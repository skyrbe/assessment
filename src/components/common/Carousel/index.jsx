/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Book from '@components/common/Book';
import styles from './Carousel.module.css';

const Carousel = ({ title, values, onChangeShelf }) => {
  const createCarousel = () => {
    return values.map(item => {
      return (
        <Book key={item.id} data={item} onChangeShelf={onChangeShelf} />
      )
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="col-12">
          {title}
        </h1>
        <div className="col-12">
          <div className="row">
            {createCarousel()}
          </div>
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
};

export default Carousel;
