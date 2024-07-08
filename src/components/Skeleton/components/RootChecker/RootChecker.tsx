import _ from 'lodash';
import React from 'react';

/**
 * Checks if the parent is a root component.
 *
 * @param {JSX.Element} parent - The parent component to check.
 * @returns {boolean} - Returns true if the parent is a root component, otherwise false.
 */
const RootChecker = (parent: JSX.Element) => {
  return _.isEqual(parent, <></>);
};

export default RootChecker;
