import { atom } from 'recoil';
import { DividingLineType } from '../type';

export const showActionSheetState = atom({
    key: 'showActionSheetState',
    default: false,
});

export const penToolState = atom({
    key: 'penToolState',
    default: {
        show: false,
        brushW: 10,
        showPicker: false,
        color: 'green',
    },
});

export const showGridToolState = atom({
    key: 'showGridToolState',
    default: true,
});

export const dividingLineToolState = atom<{
    type: DividingLineType;
    show: boolean;
}>({
    key: 'dividingLineState',
    default: {
        type: 0,
        show: false,
    },
});

export const showPickingToolState = atom({
    key: 'showPickingToolState',
    default: false,
});

export const eraserToolState = atom({
    key: 'eraserToolState',
    default: {
        show: false,
        eraserW: 10,
    },
});
