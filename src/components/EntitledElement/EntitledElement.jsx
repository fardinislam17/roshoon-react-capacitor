import React from 'react';

const EntitledElement = (props) => {
  const { children, fallback, role } = props;
  if (role !== 'dev') {
    return fallback ? fallback : <>........</>;
  }
  return children;
};

export default EntitledElement;
