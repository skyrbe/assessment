/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import ActionButton from '@components/common/ActionButton';
import styles from './index.module.css';

const Book = ({ data, onChangeShelf }) => {
  const { name, imgPath, shelfType } = data;

  const onChangeItem = (e) => {
    onChangeShelf(data.id, e.target.value);
  }

  const onAddToShelf = () => {
    onChangeShelf(data.id, "1");
  }

  return (
    <div className="col-3 mb-5">
      <img alt={name} src={imgPath} className="img-fluid" />
      <p className="m-0">
        {name}
      </p>
      {data.isInShelf && (
        <ActionButton selectedKey={shelfType} onChangeItem={onChangeItem} />
      )}
      {!data.isInShelf && (
        <button type="button" onClick={onAddToShelf}>
          Move To Shelf
        </button>
      )}
    </div>
  );
};

export default Book;
