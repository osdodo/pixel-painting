/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconJiahao = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M928 480H544V96c0-19.2-12.8-32-32-32s-32 12.8-32 32v384H96c-19.2 0-32 12.8-32 32s12.8 32 32 32h384v384c0 19.2 12.8 32 32 32s32-12.8 32-32V544h384c19.2 0 32-12.8 32-32s-12.8-32-32-32z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconJiahao.defaultProps = {
  size: 18,
};

export default IconJiahao;
