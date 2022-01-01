/* eslint-disable */

import React from 'react';

import Icon from './h5';

const IconFont = (props) => {
  const { name, size, color, style } = props;

  return <Icon name={name} size={size} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
