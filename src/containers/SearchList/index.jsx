/* eslint-disable */

import React  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeShelf } from '@reducers/books';
import Book from '@components/common/Book';

const SearchList = ({changeShelf, searchLoading, bookList}) => {

  const onChangeShelf = (itemId, shelfType) => {
    changeShelf(itemId, shelfType, 'Search');
  };

  const generateList = () => {
    return bookList.map(item => {
      return (
        <Book key={item.id} data={item} onChangeShelf={onChangeShelf} />
      )
    });
  }

  return (
    <div className="row mt-5">
      {!searchLoading && bookList && generateList()}
    </div>
  );
}

function mapStateToProps({ books }) {
  return {
    searchLoading: books.searchLoading,
    bookList: books.searchData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeShelf,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
