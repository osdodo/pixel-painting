/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconWangge = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M272 784m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 0, '#C4A2FC')}
      />
      <path
        d="M528 784m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 1, '#C4A2FC')}
      />
      <path
        d="M784 784m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 2, '#C4A2FC')}
      />
      <path
        d="M272 528m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 3, '#C4A2FC')}
      />
      <path
        d="M528 528m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 4, '#C4A2FC')}
      />
      <path
        d="M784 528m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 5, '#C4A2FC')}
      />
      <path
        d="M272 272m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 6, '#C4A2FC')}
      />
      <path
        d="M528 272m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 7, '#C4A2FC')}
      />
      <path
        d="M784 272m48 0l128 0q48 0 48 48l0 128q0 48-48 48l-128 0q-48 0-48-48l0-128q0-48 48-48Z"
        fill={getIconColor(color, 8, '#C4A2FC')}
      />
      <path
        d="M624 432h66.24a64 64 0 1 0 0-32H624V240h66.24a64 64 0 1 0 0-32H624V141.76a64 64 0 1 0-32 0V208H432V141.76a64 64 0 1 0-32 0V208H240V141.76a64 64 0 1 0-32 0V208H141.76a64 64 0 1 0 0 32H208v160H141.76a64 64 0 1 0 0 32H208v160H141.76a64 64 0 1 0 0 32H208v66.24a64 64 0 1 0 32 0V624h160v66.24a64 64 0 1 0 32 0V624h160v66.24a64 64 0 1 0 32 0V624h66.24a64 64 0 1 0 0-32H624z m128-48a32 32 0 1 1-32 32 32 32 0 0 1 32-32z m0-192a32 32 0 1 1-32 32 32 32 0 0 1 32-32zM576 80a32 32 0 1 1 32 32 32 32 0 0 1-32-32zM384 80a32 32 0 1 1 32 32 32 32 0 0 1-32-32zM192 80a32 32 0 1 1 32 32 32 32 0 0 1-32-32zM80 256a32 32 0 1 1 32-32 32 32 0 0 1-32 32z m0 192a32 32 0 1 1 32-32 32 32 0 0 1-32 32z m0 192a32 32 0 1 1 32-32 32 32 0 0 1-32 32z m176 112a32 32 0 1 1-32-32 32 32 0 0 1 32 32z m192 0a32 32 0 1 1-32-32 32 32 0 0 1 32 32z m192 0a32 32 0 1 1-32-32 32 32 0 0 1 32 32z m112-176a32 32 0 1 1-32 32 32 32 0 0 1 32-32zM592 240v160H432V240z m-352 0h160v160H240z m0 352V432h160v160z m192 0V432h160v160z"
        fill={getIconColor(color, 9, '#151A6A')}
      />
    </svg>
  );
};

IconWangge.defaultProps = {
  size: 18,
};

export default IconWangge;
