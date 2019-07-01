import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Carousel from '@components/common/Carousel';
import { getAllBooks, changeShelf } from '@reducers/books';

const Books = (props) => {
  const successBooks = () => {

  };

  const failureBooks = () => {

  };

  useEffect(
    () => {
      props.getAllBooks()
        .then(successBooks)
        .catch(failureBooks);
    },
    []
  );

  const onChangeShelf = (itemId, shelfType) => {
    props.changeShelf(itemId, shelfType);
  };

  const { loading, items } = props;
  return (
    <Fragment>
      {!loading && Array.isArray(items) && (
        <Fragment>
          <Carousel title="Continue Reading" values={items.filter(book => book.shelfType === '0')} onChangeShelf={onChangeShelf} />
          <Carousel title="Want to Read" values={items.filter(book => book.shelfType === '1')} onChangeShelf={onChangeShelf} />
          <Carousel title="Read" values={items.filter(book => book.shelfType === '2')} onChangeShelf={onChangeShelf} />
        </Fragment>
      )}
    </Fragment>
  );
};

function mapStateToProps({ books }) {
  return {
    loading: books.loading,
    items: books.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllBooks,
    changeShelf
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);
