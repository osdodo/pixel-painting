/* eslint-disable */

import React from 'react';
import IconSave from './IconSave';
import IconWangge from './IconWangge';
import IconDelete from './IconDelete';
import IconXiangpi from './IconXiangpi';
import IconFlip from './IconFlip';
import IconPen from './IconPen';
import IconQuse from './IconQuse';
import IconBaocun from './IconBaocun';
import IconShare from './IconShare';
import IconAbout from './IconAbout';
import IconJiantou from './IconJiantou';
import IconKafei from './IconKafei';
import IconTuoniao from './IconTuoniao';
import IconJiahao from './IconJiahao';
import IconFeedback from './IconFeedback';
export { default as IconSave } from './IconSave';
export { default as IconWangge } from './IconWangge';
export { default as IconDelete } from './IconDelete';
export { default as IconXiangpi } from './IconXiangpi';
export { default as IconFlip } from './IconFlip';
export { default as IconPen } from './IconPen';
export { default as IconQuse } from './IconQuse';
export { default as IconBaocun } from './IconBaocun';
export { default as IconShare } from './IconShare';
export { default as IconAbout } from './IconAbout';
export { default as IconJiantou } from './IconJiantou';
export { default as IconKafei } from './IconKafei';
export { default as IconTuoniao } from './IconTuoniao';
export { default as IconJiahao } from './IconJiahao';
export { default as IconFeedback } from './IconFeedback';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'save':
      return <IconSave {...rest} />;
    case 'wangge':
      return <IconWangge {...rest} />;
    case 'delete':
      return <IconDelete {...rest} />;
    case 'xiangpi':
      return <IconXiangpi {...rest} />;
    case 'flip':
      return <IconFlip {...rest} />;
    case 'pen':
      return <IconPen {...rest} />;
    case 'quse':
      return <IconQuse {...rest} />;
    case 'baocun':
      return <IconBaocun {...rest} />;
    case 'share':
      return <IconShare {...rest} />;
    case 'about':
      return <IconAbout {...rest} />;
    case 'jiantou':
      return <IconJiantou {...rest} />;
    case 'kafei':
      return <IconKafei {...rest} />;
    case 'tuoniao':
      return <IconTuoniao {...rest} />;
    case 'jiahao':
      return <IconJiahao {...rest} />;
    case 'feedback':
      return <IconFeedback {...rest} />;

  }

  return null;
};

export default IconFont;
