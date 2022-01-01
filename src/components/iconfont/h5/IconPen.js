/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconPen = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M756.688 75.312L224 608l192 192 532.688-532.688a15.984 15.984 0 0 0 0-22.624L779.312 75.312a16 16 0 0 0-22.624 0z"
        fill={getIconColor(color, 0, '#DB9B7C')}
      />
      <path
        d="M880 336l68.688-68.688a15.984 15.984 0 0 0 0-22.624L779.312 75.312a15.984 15.984 0 0 0-22.624 0L688 144z"
        fill={getIconColor(color, 1, '#243242')}
      />
      <path
        d="M352 608l256-256a45.248 45.248 0 1 1 64 64L416 672"
        fill={getIconColor(color, 2, '#E7E4DD')}
      />
      <path
        d="M352 608l192-192h128L416 672z"
        fill={getIconColor(color, 3, '#EFBE9A')}
      />
      <path
        d="M223.92 607.984l64-64 191.968 191.968-64 64z"
        fill={getIconColor(color, 4, '#243242')}
      />
      <path
        d="M224 608l-32 112 112 112 112-32M784 80l25.376-25.376a77.248 77.248 0 0 1 109.248 0l50.752 50.752a77.248 77.248 0 0 1 0 109.248L944 240"
        fill={getIconColor(color, 5, '#C66B60')}
      />
      <path
        d="M208 880l-48 48H32l112-112"
        fill={getIconColor(color, 6, '#E47C6E')}
      />
      <path
        d="M192 720l-48 96 64 64 96-48"
        fill={getIconColor(color, 7, '#243242')}
      />
      <path
        d="M192 720l-48 96 37.2 37.2a576.72 576.72 0 0 0 85.12-58.88z"
        fill={getIconColor(color, 8, '#4D5D7A')}
      />
      <path
        d="M338.432 722.432L224 608l-32 112 74.32 74.32a578.56 578.56 0 0 0 72.112-71.888z"
        fill={getIconColor(color, 9, '#E47C6E')}
      />
      <path
        d="M391.76 647.76L288 544l-64 64 114.432 114.432a579.712 579.712 0 0 0 53.328-74.672z"
        fill={getIconColor(color, 10, '#4D5D7A')}
      />
      <path
        d="M946.512 82.512l-27.888-27.888a77.248 77.248 0 0 0-109.248 0L784 80l117.536 117.536a278.4 278.4 0 0 0 44.976-115.024z"
        fill={getIconColor(color, 11, '#E47C6E')}
      />
      <path
        d="M779.312 75.312a15.984 15.984 0 0 0-22.624 0L688 144l132.128 132.128a281.472 281.472 0 0 0 81.408-78.592z"
        fill={getIconColor(color, 12, '#4D5D7A')}
      />
      <path
        d="M16 975.968h992v32.016H16z"
        fill={getIconColor(color, 13, '#E47C6E')}
      />
    </svg>
  );
};

IconPen.defaultProps = {
  size: 18,
};

export default IconPen;
