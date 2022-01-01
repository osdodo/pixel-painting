import Taro from '@tarojs/taro';
import { DividingLineType } from '../type';

const drawRect = (
    ctx: Taro.CanvasContext,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.draw(true);
};

const clearRect = (
    ctx: Taro.CanvasContext,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    ctx.clearRect(x, y, w, h);
    ctx.draw(true);
};

const canvasToTempFilePath = (canvasId: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Taro.canvasToTempFilePath({
                canvasId: canvasId,
                success: res => {
                    resolve(res.tempFilePath);
                },
                fail: err => {
                    reject(err);
                },
            });
        }, 2000);
    });
};

const saveImageToPhotosAlbum = (filePath: string) => {
    return new Promise<void>((resolve, reject) => {
        Taro.saveImageToPhotosAlbum({
            filePath,
            success: () => {
                resolve();
            },
            fail: e => {
                reject(e);
            },
        });
    });
};

export const getImageData = ({
    canvasId,
    dx,
    dy,
    dWidth,
    dHeight,
}: {
    canvasId: string;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
}): Promise<Uint8ClampedArray> => {
    return new Promise((resolve, reject) => {
        Taro.canvasGetImageData({
            canvasId: canvasId,
            x: dx,
            y: dy,
            width: dWidth,
            height: dHeight,
            success: res => {
                console.log('res:', res);
                resolve(res.data);
            },
            fail: err => {
                reject(err);
            },
        });
    });
};

export const putImageData = ({
    canvasId,
    dx,
    dy,
    dWidth,
    dHeight,
    imageData,
}: {
    canvasId: string;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    imageData: Uint8ClampedArray;
}) => {
    return new Promise<void>((resolve, reject) => {
        Taro.canvasPutImageData({
            canvasId: canvasId,
            x: dx,
            y: dy,
            width: dWidth,
            height: dHeight,
            data: imageData,
            success: () => {
                resolve();
            },
            fail: err => {
                reject(err);
            },
        });
    });
};

export const thresholdConvert = (
    pixels: Uint8ClampedArray,
    threshold: number
) => {
    for (let i = 0, len = pixels.length; i < len; i += 4) {
        let red = pixels[i];
        let green = pixels[i + 1];
        let blue = pixels[i + 2];
        let alpha = pixels[i + 3];
        let gray = 0.299 * red + 0.587 * green + 0.114 * blue;
        let color = gray >= threshold ? 255 : 0;

        pixels[i] = color;
        pixels[i + 1] = color;
        pixels[i + 2] = color;
        pixels[i + 3] = alpha >= threshold ? 255 : 0;
    }
};

export const drawGrid = ({
    canvasId,
    canvasW,
    brushW,
}: {
    canvasId: string;
    canvasW: number;
    brushW: number;
}) => {
    const ctx = Taro.createCanvasContext(canvasId);

    ctx.setStrokeStyle('lightgray');
    ctx.setLineWidth(0.5);
    for (let i = brushW + 0.5; i < canvasW; i = i + brushW) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasW);
        ctx.stroke();
    }
    for (let i = brushW + 0.5; i < canvasW; i = i + brushW) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasW, i);
        ctx.stroke();
    }

    ctx.draw();
};

export const drawLine = ({
    canvasId,
    canvasW,
    dividingLineType,
}: {
    canvasId: string;
    canvasW: number;
    dividingLineType: DividingLineType;
}) => {
    const ctx = Taro.createCanvasContext(canvasId);
    const C = canvasW / 2;

    ctx.setStrokeStyle('green');
    ctx.setLineWidth(1);

    if (dividingLineType === 1) {
        ctx.beginPath();
        ctx.moveTo(C, 0);
        ctx.lineTo(C, canvasW);
        ctx.stroke();
    } else if (dividingLineType === 2) {
        ctx.beginPath();
        ctx.moveTo(0, C);
        ctx.lineTo(canvasW, C);
        ctx.stroke();
    } else if (dividingLineType === 3) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(C, 0);
        ctx.lineTo(C, canvasW);
        ctx.stroke();

        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(0, C);
        ctx.lineTo(canvasW, C);
        ctx.stroke();
    } else {
        ctx.clearRect(0, 0, canvasW, canvasW);
    }

    ctx.draw();
};

export const drawCanvas = ({
    ctx,
    canvasW,
    touchX,
    touchY,
    brushW,
    brushColor,
    dividingLineType,
    isChooseEraser,
    eraserW,
}: {
    ctx: Taro.CanvasContext;
    canvasW: number;
    touchX: number;
    touchY: number;
    brushW: number;
    brushColor: string;
    dividingLineType: DividingLineType;
    isChooseEraser: boolean;
    eraserW: number;
}) => {
    const x = Number((touchX / brushW).toFixed(0)) * brushW;
    const y = Number((touchY / brushW).toFixed(0)) * brushW;

    if (isChooseEraser) {
        clearRect(ctx, x, y, eraserW, eraserW);
    } else {
        drawRect(ctx, x, y, brushW, brushW, brushColor);
    }

    if (dividingLineType !== 0) {
        let c = canvasW / 2;
        let x2_ = x - c;
        let x2 = 0;
        let y2_ = y - c;
        let y2 = 0;
        if (dividingLineType === 1) {
            if (x2_ < 0) {
                x2 = c + x2_ * -1 - brushW;
            } else {
                x2 = c - x2_ - brushW;
            }

            if (isChooseEraser) {
                clearRect(ctx, x2, y, eraserW, eraserW);
            } else {
                drawRect(ctx, x2, y, brushW, brushW, brushColor);
            }
        } else if (dividingLineType === 2) {
            if (y2_ < 0) {
                y2 = c + y2_ * -1 - brushW;
            } else {
                y2 = c - y2_ - brushW;
            }

            if (isChooseEraser) {
                clearRect(ctx, x, y2, eraserW, eraserW);
            } else {
                drawRect(ctx, x, y2, brushW, brushW, brushColor);
            }
        } else if (dividingLineType === 3) {
            if (x2_ < 0) {
                x2 = c + x2_ * -1 - brushW;
            } else {
                x2 = c - x2_ - brushW;
            }

            if (y2_ < 0) {
                y2 = c + y2_ * -1 - brushW;
            } else {
                y2 = c - y2_ - brushW;
            }

            if (isChooseEraser) {
                clearRect(ctx, x2, y, eraserW, eraserW);
                clearRect(ctx, x, y2, eraserW, eraserW);
                clearRect(ctx, x2, y2, eraserW, eraserW);
            } else {
                drawRect(ctx, x2, y, brushW, brushW, brushColor);
                drawRect(ctx, x, y2, brushW, brushW, brushColor);
                drawRect(ctx, x2, y2, brushW, brushW, brushColor);
            }
        }
    }
};

export const save = (canvasId: string) => {
    Taro.showLoading({
        title: '处理中',
    });
    canvasToTempFilePath(canvasId)
        .then((filePath: string) => saveImageToPhotosAlbum(filePath))
        .then(() => {
            Taro.hideLoading();
            Taro.showToast({
                title: '已保存',
                icon: 'success',
                duration: 2000,
            });
        })
        .catch(e => {
            if (e.errMsg.indexOf('auth') != -1) {
                Taro.showModal({
                    content: '同意访问您的相册，才能保存图片',
                    showCancel: false,
                    success: tip => {
                        if (tip.confirm) {
                            Taro.openSetting({
                                success: () => {},
                            });
                        }
                    },
                });
            } else {
                Taro.showToast({
                    title: '保存失败',
                    icon: 'error',
                    duration: 2000,
                });
            }
            Taro.hideLoading();
        });
};

export const clearCanvas = (ctx: Taro.CanvasContext, canvasW: number) => {
    Taro.showModal({
        content: '确认清空画布吗？',
        success: tip => {
            if (tip.confirm) {
                clearRect(ctx, 0, 0, canvasW, canvasW);
            }
        },
    });
};

export const upload = (ctx: Taro.CanvasContext, canvasW: number) => {
    return new Promise((resolve, reject) => {
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: res => {
                let tempFilePath = res.tempFilePaths[0];
                Taro.getImageInfo({
                    src: tempFilePath,
                    success: res => {
                        let dWidth = res.width * 0.5;
                        let dHeight = res.height * 0.5;
                        let dx = canvasW / 2 - dWidth / 2;
                        let dy = canvasW / 2 - dHeight / 2;
                        ctx.drawImage(tempFilePath, dx, dy, dWidth, dHeight);
                        ctx.draw();
                        resolve({ dx, dy, dWidth, dHeight });
                    },
                    fail: () => {
                        reject();
                    },
                });
            },
            fail: () => {
                reject();
            },
        });
    });
};

export const rgbToHex = (r: number, g: number, b: number) => {
    const componentToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };

    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
