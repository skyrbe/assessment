/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({ selectedKey, onChangeItem }) => {
  return (
    <Fragment>
      <select defaultValue={selectedKey} onChange={onChangeItem}>
        <option value="0">Continue Reading</option>
        <option value="1">Want To Read</option>
        <option value="2">Read</option>
      </select>
    </Fragment>
  );
};

ActionButton.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  onChangeItem: PropTypes.func.isRequired
};

export default ActionButton;
