/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconFlip = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 200c-16.568 0-30-13.432-30-30V30c0-16.568 13.432-30 30-30s30 13.432 30 30v140c0 16.568-13.432 30-30 30zM512 474c-16.568 0-30-13.432-30-30v-140c0-16.568 13.432-30 30-30s30 13.432 30 30v140c0 16.568-13.432 30-30 30zM512 750c-16.568 0-30-13.432-30-30v-140c0-16.568 13.432-30 30-30s30 13.432 30 30v140c0 16.568-13.432 30-30 30zM512 1024c-16.568 0-30-13.432-30-30v-140c0-16.568 13.432-30 30-30s30 13.432 30 30v140c0 16.568-13.432 30-30 30z"
        fill={getIconColor(color, 0, '#FFAB1D')}
      />
      <path
        d="M358.804 207.006l-240-73.684A29.998 29.998 0 0 0 80 162v700a29.998 29.998 0 0 0 38.804 28.678l240-73.684A30.002 30.002 0 0 0 380 788.316V235.684a30 30 0 0 0-21.196-28.678z"
        fill={getIconColor(color, 1, '#FFF54F')}
      />
      <path
        d="M512 0v200c16.568 0 30-13.432 30-30V30c0-16.568-13.432-30-30-30zM512 274v200c16.568 0 30-13.432 30-30v-140c0-16.568-13.432-30-30-30zM512 550v200c16.568 0 30-13.432 30-30v-140c0-16.568-13.432-30-30-30zM512 824v200c16.568 0 30-13.432 30-30v-140c0-16.568-13.432-30-30-30z"
        fill={getIconColor(color, 2, '#FF9810')}
      />
      <path
        d="M931.83 137.874a29.992 29.992 0 0 0-26.634-4.552l-240 73.684A30.002 30.002 0 0 0 644 235.684v552.63a29.998 29.998 0 0 0 21.196 28.678l240 73.684A30 30 0 0 0 944 862V162c0-9.518-4.516-18.47-12.17-24.126z"
        fill={getIconColor(color, 3, '#FFDD3E')}
      />
    </svg>
  );
};

IconFlip.defaultProps = {
  size: 18,
};

export default IconFlip;
