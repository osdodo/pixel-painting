import { promise } from 'when'

const drawRect = (ctx, x, y, w, h, color) => {
    ctx.setFillStyle(color)
    ctx.fillRect(x, y, w, h)
    ctx.draw(true)
}

const clearRect = (ctx, x, y, w, h) => {
    ctx.clearRect(x, y, w, h)
    ctx.draw(true)
}

const canvasToTempFilePath = (canvasId) => {
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

const saveImageToPhotosAlbum = (filePath) => {
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

export const drawGrid = (canvasId, canvasW, brushW) => {
    const ctx = wx.createCanvasContext(canvasId)
    ctx.save()
    ctx.setStrokeStyle('lightgray')
    ctx.setLineWidth(0.5)
    for (let i = brushW + 0.5; i < canvasW; i = i + brushW) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvasW)
        ctx.stroke()
    }
    for (let i = brushW + 0.5; i < canvasW; i = i + brushW) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvasW, i)
        ctx.stroke()
    }
    ctx.restore()
    ctx.draw()
}

export const drawLine = (canvasId, canvasW, dividingLineType) => {
    const ctx = wx.createCanvasContext(canvasId)
    const C = canvasW / 4
    ctx.save()
    ctx.setStrokeStyle('#543c8d')
    ctx.setLineWidth(1)

    if (dividingLineType === 1) {
        ctx.beginPath()
        ctx.moveTo(C, 0)
        ctx.lineTo(C, canvasW)
        ctx.stroke()
    }
    else if (dividingLineType === 2) {
        ctx.beginPath()
        ctx.moveTo(0, C)
        ctx.lineTo(canvasW, C)
        ctx.stroke()
    }
    else if (dividingLineType === 3) {
        ctx.beginPath()
        ctx.moveTo(C, 0)
        ctx.lineTo(C, canvasW)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, C)
        ctx.lineTo(canvasW, C)
        ctx.stroke()
    }
    else {
        ctx.clearRect(0, 0, canvasW, canvasW)
    }

    ctx.restore()
    ctx.draw()
}


export const drawCanvas = 
(ctx, canvasW, touchX, touchY, brushW, brushColor, dividingLineType, isChooseEraser, eraserW) => {
    const { red, green, blue, alpha } = brushColor
    const x = Number((touchX / brushW).toFixed(0)) * brushW
    const y = Number((touchY / brushW).toFixed(0)) * brushW
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`

    if (isChooseEraser) { clearRect(ctx, x, y, eraserW, eraserW) }
    else { drawRect(ctx, x, y, brushW, brushW, color) }

    if (dividingLineType !== 0) {
        let c = canvasW / 4
        let x2_ = x - c
        let x2 = 0
        let y2_ = y - c
        let y2 = 0
        if (dividingLineType === 1) {

            if (x2_ < 0) { x2 = c + x2_ * (-1) - brushW }
            else { x2 = c - x2_ - brushW }

            if (isChooseEraser) { clearRect(ctx, x2, y, eraserW, eraserW) }
            else { drawRect(ctx, x2, y, brushW, brushW, color) }

        }
        else if (dividingLineType === 2) {

            if (y2_ < 0) { y2 = c + y2_ * (-1) - brushW }
            else { y2 = c - y2_ - brushW }

            if (isChooseEraser) { clearRect(ctx, x, y2, eraserW, eraserW) }
            else { drawRect(ctx, x, y2, brushW, brushW, color) }

        }
        else if (dividingLineType === 3) {

            if (x2_ < 0) { x2 = c + x2_ * (-1) - brushW }
            else { x2 = c - x2_ - brushW }

            if (y2_ < 0) { y2 = c + y2_ * (-1) - brushW }
            else { y2 = c - y2_ - brushW }

            if (isChooseEraser) {
                clearRect(ctx, x2, y, eraserW, eraserW)
                clearRect(ctx, x, y2, eraserW, eraserW)
                clearRect(ctx, x2, y2, eraserW, eraserW)
            }
            else {
                drawRect(ctx, x2, y, brushW, brushW, color)
                drawRect(ctx, x, y2, brushW, brushW, color)
                drawRect(ctx, x2, y2, brushW, brushW, color)
            }
        }
    }
}

export const save = (canvasId) => {
    wx.showModal({
        content: '🐥确认保存到手机相册吗？',
        success: (tip) => {
            if (tip.confirm) {
                wx.showLoading({
                    title: '处理中',
                })
                canvasToTempFilePath(canvasId).then(filePath => {
                    saveImageToPhotosAlbum(filePath).then(() => {
                        wx.hideLoading()
                        wx.showToast({
                            title: '😁已保存至手机相册',
                            icon: 'none',
                            duration: 2000
                        })
                    }).catch(e => {
                        if (e.errMsg.indexOf('auth') != -1) {
                            wx.showModal({
                                content: '❗同意访问您的相册，才能保存图片',
                                showCancel: false,
                                success: (tip) => {
                                    if (tip.confirm) {
                                        wx.openSetting({
                                            success: (res) => { }
                                        })
                                    }
                                }
                            })
                        } else {
                            wx.showToast({
                                title: '❌保存失败，请重试',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                })
            }
        }
    })
}

export const clearCanvas = (ctx, canvasW) => {
    wx.showModal({
        content: '🐥确认清空画布吗？',
        success: (tip) => {
            if (tip.confirm) {
                ctx.clearRect(0, 0, canvasW, canvasW)
                ctx.draw()
            }
        }
    })
}

export const upload = (ctx, canvasW) => {
    return new Promise((resolve, reject) => { 
        wx.showModal({
            title: '🐥小提示🐥',
            content: '上传对比度高的位图转化成的像素图效果更佳',
            showCancel: true,
            success: (tip) => {
                if (tip.confirm) {
                    wx.chooseImage({
                        count: 1,
                        sizeType: ['compressed'],
                        sourceType: ['album'],
                        success: (res) => {
                            let tempFilePath = res.tempFilePaths[0]
                            wx.getImageInfo({
                                src: tempFilePath,
                                success: (res) => {
                                    let dWidth = res.width * 0.5
                                    let dHeight = res.height * 0.5
                                    let dx = canvasW / 4 - dWidth / 2
                                    let dy = canvasW / 4 - dHeight / 2
                                    ctx.drawImage(
                                        tempFilePath,
                                        dx, dy,
                                        dWidth, dHeight
                                    )
                                    ctx.draw()
                                    resolve({ dx, dy, dWidth, dHeight })
                                },
                                fail: (err) => {
                                    reject()
                                }
                            })
                        },
                        fail: () => {
                            reject()
                        }
                    })
                } 
            }
        })
    })
}
