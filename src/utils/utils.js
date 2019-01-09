import { promise } from "when";

export const drawRect = (ctx, x, y, w, h, color) => {
    ctx.setFillStyle(color)
    ctx.fillRect(x, y, w, h)
    ctx.draw(true)
}

export const clearRect = (ctx, x, y, w, h) => {
    ctx.clearRect(x, y, w, h)
    ctx.draw(true)
}

export const getImageData = (canvasId, dx, dy, dWidth, dHeight) => {
    return new Promise((resolve, reject) => {
        wx.canvasGetImageData({
            canvasId: canvasId,
            x: dx,
            y: dy,
            width: dWidth,
            height: dHeight,
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export const putImageData = (canvasId, dx, dy, dWidth, dHeight, imageData) => {
    return new Promise((resolve, reject) => {
        wx.canvasPutImageData({
            canvasId: canvasId,
            x: dx,
            y: dy,
            width: dWidth,
            height: dHeight,
            data: imageData,
            success: res => {
                resolve()
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export const thresholdConvert = (imageData, threshold) => {
    for (let i = 0, len = imageData.length; i < len; i += 4) {
        let red = imageData[i]
        let green = imageData[i + 1]
        let blue = imageData[i + 2]
        let alpha = imageData[i + 3]
        let gray = 0.299 * red + 0.587 * green + 0.114 * blue
        let color = gray >= threshold ? 255 : 0

        imageData[i]     = color
        imageData[i + 1] = color
        imageData[i + 2] = color
        imageData[i + 3] = alpha >= threshold ? 255 : 0
    } 
}


export const canvasToTempFilePath = (canvasId) => {
    return new promise((resolve, reject) => {
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: canvasId,
                success: res => {
                    resolve(res.tempFilePath)
                },
                fail: err => {
                    reject(err)
                }
            })
        },2000)
    })
}


export const saveImageToPhotosAlbum = (filePath) => {
    return new promise((resolve, reject) => { 
        wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: () => {
                resolve()
            },
            fail: e => {
                reject(e)
            }
        })
    })
}
