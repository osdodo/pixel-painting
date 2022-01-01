/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconSave = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M1004 812c0 66.28-53.72 120-120 120H140c-66.28 0-120-53.72-120-120z"
        fill={getIconColor(color, 0, '#EEFAFF')}
      />
      <path
        d="M110 332h804v480H110z"
        fill={getIconColor(color, 1, '#A0C8FF')}
      />
      <path
        d="M692 452l-180 240-180-240h90V212h180v240z"
        fill={getIconColor(color, 2, '#A7E8A6')}
      />
      <path
        d="M722 232c11.044 0 20-8.954 20-20V92c0-11.046-8.956-20-20-20H302c-11.044 0-20 8.954-20 20v120c0 11.046 8.956 20 20 20s20-8.954 20-20V112h380v100c0 11.046 8.956 20 20 20z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <path
        d="M1004 792h-70V332c0-11.046-8.956-20-20-20H622v-100c0-11.046-8.956-20-20-20h-180c-11.044 0-20 8.954-20 20v100H110c-11.044 0-20 8.954-20 20v460H20c-11.044 0-20 8.954-20 20 0 77.196 62.804 140 140 140h282c11.044 0 20-8.954 20-20s-8.956-20-20-20H140c-48.292 0-88.7-34.412-97.99-80.02h939.98C972.7 877.588 932.292 912 884 912H602c-11.044 0-20 8.954-20 20s8.956 20 20 20h282c77.196 0 140-62.804 140-140 0-11.046-8.956-20-20-20zM422 472c11.044 0 20-8.954 20-20V232h140v220c0 11.046 8.956 20 20 20h50l-140 186.666L372 472z m472 320H130V352h272v80h-70a20 20 0 0 0-16 32l180 240a20.004 20.004 0 0 0 32 0l180-240a20 20 0 0 0-16-32h-70v-80h272z"
        fill={getIconColor(color, 4, '#333333')}
      />
      <path
        d="M512 932m-20 0a20 20 0 1 0 40 0 20 20 0 1 0-40 0Z"
        fill={getIconColor(color, 5, '#333333')}
      />
    </svg>
  );
};

IconSave.defaultProps = {
  size: 18,
};

export default IconSave;
