/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconShare = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M808 759.984c0 44.192-35.824 80-80.016 80L216 839.984c-44.192 0-80-35.808-80-80l0-416c0-44.176 35.808-80 80-80l95.984 0 0-32-112 0c-53.008 0-95.984 42.992-95.984 96l0 448c0 53.008 42.976 96 95.984 96l544 0c53.008 0 96-42.992 96-96l0-160L808 615.984 808 759.984zM919.84 252.288l0.192-0.336-7.856-4.288-22.144-13.312-0.56 0.912L716.496 140.864l-17.088 32 144.192 77.792C625.072 276.304 456 433.52 456 664.336c0 10.688 0.848 21.152 1.568 31.648L488 695.984c-0.832-10.672 0-21.104 0-32 0-214.672 167.296-363.728 373.312-383.008l-92.656 150.304 30.8 19.152 102.576-168.24 0.96 0.512 12.688-22.864 4.48-7.36L919.84 252.288z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconShare.defaultProps = {
  size: 18,
};

export default IconShare;
