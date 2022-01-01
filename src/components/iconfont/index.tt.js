/* eslint-disable */

import React from 'react';


const IconFont = (props) => {
  const { name, size, color, style } = props;

  return <iconfont name={name} size={size} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
