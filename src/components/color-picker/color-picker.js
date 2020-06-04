Component({
    properties: {
        show: {
            type: Boolean,
            value: false,
            observer: function (val) {
                if (val) {
                    this._initSize()
                }
            },
        },
        color: {
            type: String,
            value: '#FF0000',
        },
    },
    data: {
        rpxRatio: 1,
        // 基础色相(色盘右上顶点的颜色)
        hueData: {
            colorStopRed: 255,
            colorStopGreen: 0,
            colorStopBlue: 0
        },
        // 选择点的颜色
        pickerData: {
            x: 0,
            y: 480,
            red: 0,
            green: 0,
            blue: 0,
            hex: '#000000'
        },
        input: {
            red: '',
            green: '',
            blue: '',
            hex: '',
        },
        // 色相控制条位置
        barY: 0,
        top: 0, // 组件的位置
        left: 0,
        width: 0,
        scrollTop: 0, // 滚动位置
        scrollLeft: 0,
        timer: 0,
        //
        initFlag: false,
        colorMap: {
            'aliceblue': '#F0F8FF',
            'antiquewhite': '#FAEBD7',
            'aqua': '#00FFFF',
            'aquamarine': '#7FFFD4',
            'azure': '#F0FFFF',
            'beige': '#F5F5DC',
            'bisque': '#FFE4C4',
            'black': '#000000',
            'blanchedalmond': '#FFEBCD',
            'blue': '#0000FF',
            'blueviolet': '#8A2BE2',
            'brown': '#A52A2A',
            'burlywood': '#DEB887',
            'cadetblue': '#5F9EA0',
            'chartreuse': '#7FFF00',
            'chocolate': '#D2691E',
            'coral': '#FF7F50',
            'cornflowerblue': '#6495ED',
            'cornsilk': '#FFF8DC',
            'crimson': '#DC143C',
            'cyan': '#00FFFF',
            'darkblue': '#00008B',
            'darkcyan': '#008B8B',
            'darkgoldenrod': '#B8860B',
            'darkgray': '#A9A9A9',
            'darkgreen': '#006400',
            'darkkhaki': '#BDB76B',
            'darkmagenta': '#8B008B',
            'darkolivegreen': '#556B2F',
            'darkorange': '#FF8C00',
            'darkorchid': '#9932CC',
            'darkred': '#8B0000',
            'darksalmon': '#E9967A',
            'darkseagreen': '#8FBC8F',
            'darkslateblue': '#483D8B',
            'darkslategray': '#2F4F4F',
            'darkturquoise': '#00CED1',
            'darkviolet': '#9400D3',
            'deeppink': '#FF1493',
            'deepskyblue': '#00BFFF',
            'dimgray': '#696969',
            'dodgerblue': '#1E90FF',
            'firebrick': '#B22222',
            'floralwhite': '#FFFAF0',
            'forestgreen': '#228B22',
            'fuchsia': '#FF00FF',
            'gainsboro': '#DCDCDC',
            'ghostwhite': '#F8F8FF',
            'gold': '#FFD700',
            'goldenrod': '#DAA520',
            'gray': '#808080',
            'green': '#008000',
            'greenyellow': '#ADFF2F',
            'honeydew': '#F0FFF0',
            'hotpink': '#FF69B4',
            'indianred': '#CD5C5C',
            'indigo': '#4B0082',
            'ivory': '#FFFFF0',
            'khaki': '#F0E68C',
            'lavender': '#E6E6FA',
            'lavenderblush': '#FFF0F5',
            'lawngreen': '#7CFC00',
            'lemonchiffon': '#FFFACD',
            'lightblue': '#ADD8E6',
            'lightcoral': '#F08080',
            'lightcyan': '#E0FFFF',
            'lightgoldenrodyellow': '#FAFAD2',
            'lightgray': '#D3D3D3',
            'lightgreen': '#90EE90',
            'lightpink': '#FFB6C1',
            'lightsalmon': '#FFA07A',
            'lightseagreen': '#20B2AA',
            'lightskyblue': '#87CEFA',
            'lightslategray': '#778899',
            'lightsteelblue': '#B0C4DE',
            'lightyellow': '#FFFFE0',
            'lime': '#00FF00',
            'limegreen': '#32CD32',
            'linen': '#FAF0E6',
            'magenta': '#FF00FF',
            'maroon': '#800000',
            'mediumaquamarine': '#66CDAA',
            'mediumblue': '#0000CD',
            'mediumorchid': '#BA55D3',
            'mediumpurple': '#9370DB',
            'mediumseagreen': '#3CB371',
            'mediumslateblue': '#7B68EE',
            'mediumspringgreen': '#00FA9A',
            'mediumturquoise': '#48D1CC',
            'mediumvioletred': '#C71585',
            'midnightblue': '#191970',
            'mintcream': '#F5FFFA',
            'mistyrose': '#FFE4E1',
            'moccasin': '#FFE4B5',
            'navajowhite': '#FFDEAD',
            'navy': '#000080',
            'oldlace': '#FDF5E6',
            'olive': '#808000',
            'olivedrab': '#6B8E23',
            'orange': '#FFA500',
            'orangered': '#FF4500',
            'orchid': '#DA70D6',
            'palegoldenrod': '#EEE8AA',
            'palegreen': '#98FB98',
            'paleturquoise': '#AFEEEE',
            'palevioletred': '#DB7093',
            'papayawhip': '#FFEFD5',
            'peachpuff': '#FFDAB9',
            'peru': '#CD853F',
            'pink': '#FFC0CB',
            'plum': '#DDA0DD',
            'powderblue': '#B0E0E6',
            'purple': '#800080',
            'red': '#FF0000',
            'rosybrown': '#BC8F8F',
            'royalblue': '#4169E1',
            'saddlebrown': '#8B4513',
            'salmon': '#FA8072',
            'sandybrown': '#F4A460',
            'seagreen': '#2E8B57',
            'seashell': '#FFF5EE',
            'sienna': '#A0522D',
            'silver': '#C0C0C0',
            'skyblue': '#87CEEB',
            'slateblue': '#6A5ACD',
            'slategray': '#708090',
            'snow': '#FFFAFA',
            'springgreen': '#00FF7F',
            'steelblue': '#4682B4',
            'tan': '#D2B48C',
            'teal': '#008080',
            'thistle': '#D8BFD8',
            'tomato': '#FF6347',
            'turquoise': '#40E0D0',
            'violet': '#EE82EE',
            'wheat': '#F5DEB3',
            'white': '#FFFFFF',
            'whitesmoke': '#F5F5F5',
            'yellow': '#FFFF00',
            'yellowgreen': '#9ACD32',
        },
    },
    lifetimes: {
        attached() {
            wx.getSystemInfo({
                success: (res) => {
                    this.setData({
                        rpxRatio: res.screenWidth / 750
                    })
                }
            })
        },
    },
    methods: {
        // 初始化布局
        _initSize() {
            if (this.data.show) {
                if (!this.initFlag) {
                    this.setData({
                        initFlag: true,
                    }, () => {
                        const _this = this
                        const query = wx.createSelectorQuery().in(this)
                        query.select('#wrapper').boundingClientRect()
                        query.selectViewport().scrollOffset()
                        query.exec(res => {
                            _this.setData({
                                top: res[0].top,
                                left: res[0].left,
                                width: res[0].width,
                                scrollTop: res[1].scrollTop,
                                scrollLeft: res[1].scrollLeft
                            })
                            _this._initColor()
                        })
                    })
                } else {
                    this._initColor()
                }
            }
        },
        // 初始化颜色
        _initColor() {
            let { r, g, b, hex } = this.formatColor(this.data.color.trim())
            this._getBarY(r, g, b, hex)
        },
        // 转换颜色
        formatColor(color) {
            color = color.toLowerCase()
            let r = 0
            let g = 0
            let b = 0
            let hex = '000000'
            if (this.data.colorMap[color]) {
                hex = this.data.colorMap[color];
                [r, g, b] = this._hexToRgb(hex)
            } else {
                let matches
                if (matches = color.match(/rgb\((.*)\)/)) {
                    [r, g, b] = matches[1].split(',')
                    hex = this._rgbToHex(r, g, b)
                } else if (matches = color.match(/^#([0-9a-f]{3})$/)) {
                    hex = '#' + matches[1].split('').map(char => char + char).join('').toUpperCase();
                    [r, g, b] = this._hexToRgb(hex)
                } else if (/^#[0-9a-f]{6}$/.test(color)) {
                    hex = color.toUpperCase();
                    [r, g, b] = this._hexToRgb(hex)
                } else {
                    throw new Error('错误的颜色格式')
                }
            }
            return { r, g, b, hex }
        },
        // 选中颜色
        _chooseColor(e) {
            clearTimeout(this.data.timer)
            let x = (e.changedTouches[0].pageX - this.data.left - this.data.scrollLeft) / this.data.rpxRatio
            let y = (e.changedTouches[0].pageY - this.data.top - this.data.scrollTop) / this.data.rpxRatio
            x = x > 480 ? 480 : x
            y = y > 480 ? 480 : y
            x = x < 0 ? 0 : x
            y = y < 0 ? 0 : y
            const { pickerData } = this.data
            pickerData.x = x
            pickerData.y = y
            this.setData({
                pickerData,
                timer: setTimeout(() => {
                    this._changeColor(x, y)
                }, 50)
            })
        },
        // 拖动色相bar
        // 这个地方选择出来的颜色就是色盘最右上角的颜色
        _changeBar(e) {
            let y = (e.changedTouches[0].pageY - this.data.top - this.data.scrollTop) / this.data.rpxRatio
            y = y > 490 ? 490 : y
            y = y < 0 ? 0 : y
            this.setData({
                barY: y
            })
            this._changeHue(y)
        },
        // 改变颜色
        _changeColor(x, y) {
            // 获取色相（色盘最右上角的颜色）
            const sRed = this.data.hueData.colorStopRed
            const sGreen = this.data.hueData.colorStopGreen
            const sBlue = this.data.hueData.colorStopBlue
            // 选择的颜色
            // 实际上这里是先算出假设y等于0时(不考虑Y轴)的颜色，后面需要再减去y*比例的颜色值
            let [pRed, pGreen, pBlue] = [this.data.pickerData.red, this.data.pickerData.green, this.data.pickerData.blue]
            // 首先计算X轴
            if (sRed === 255) {
                // 移动1单位需要减少多少颜色值
                const greenRatioX = (255 - sGreen) / 480
                const blueRatioX = (255 - sBlue) / 480
                const greenValueX = 255 - x * greenRatioX
                const blueValueX = 255 - x * blueRatioX
                pRed = 255
                pGreen = Math.round(greenValueX > sGreen ? greenValueX : sGreen)
                pBlue = Math.round(blueValueX > sBlue ? blueValueX : sBlue)
            }
            if (sGreen === 255) {
                const redRatioX = (255 - sRed) / 480
                const blueRatioX = (255 - sBlue) / 480
                const redValueX = 255 - x * redRatioX
                const blueValueX = 255 - x * blueRatioX
                pRed = Math.round(redValueX > sRed ? redValueX : sRed)
                pGreen = 255
                pBlue = Math.round(blueValueX > sBlue ? blueValueX : sBlue)
            }
            if (sBlue === 255) {
                const redRatioX = (255 - sRed) / 480
                const greenRatioX = (255 - sGreen) / 480
                const redValueX = 255 - x * redRatioX
                const greenValueX = 255 - x * greenRatioX
                pRed = Math.round(redValueX > sRed ? redValueX : sRed)
                pGreen = Math.round(greenValueX > sGreen ? greenValueX : sGreen)
                pBlue = 255
            }

            // 考虑Y轴，减去y*比例的颜色值，得到最终颜色
            const redRatioY = pRed / 480
            const greenRatioY = pGreen / 480
            const blueRatioY = pBlue / 480

            const redValueY = y * redRatioY
            const greenValueY = y * greenRatioY
            const blueValueY = y * blueRatioY
            const hex = this._rgbToHex(pRed - redValueY, pGreen - greenValueY, pBlue - blueValueY)
            const { pickerData } = this.data
            pickerData.red = Math.round(pRed - redValueY)
            pickerData.green = Math.round(pGreen - greenValueY)
            pickerData.blue = Math.round(pBlue - blueValueY)
            pickerData.hex = hex
            this.setData({
                pickerData,
                input: {
                    red: pickerData.red,
                    green: pickerData.green,
                    blue: pickerData.blue,
                    hex: pickerData.hex,
                },
            })
        },
        // 根据颜色获取色相x,y
        _getPos(r, g, b, hex) {
            // 获取色相（色盘最右上角的颜色）
            const sRed = this.data.hueData.colorStopRed
            const sGreen = this.data.hueData.colorStopGreen
            const sBlue = this.data.hueData.colorStopBlue
            // 选择的颜色
            // 实际上这里是先算出假设y等于0时(不考虑Y轴)的颜色，后面需要再减去y*比例的颜色值
            let x = 0
            let y = 0

            // 首先计算X轴
            if (sRed === 255) {
                // 移动1单位需要减少多少颜色值
                const greenRatioX = (255 - sGreen) / 480
                const blueRatioX = (255 - sBlue) / 480
                y = 480 * (1 - r / 255)
                x = 480 * (1 - g / r) * 255 / (255 - sGreen)
            }
            if (sGreen === 255) {
                const redRatioX = (255 - sRed) / 480
                const blueRatioX = (255 - sBlue) / 480
                y = 480 * (1 - g / 255)
                x = 480 * (1 - r / g) * 255 / (255 - sRed)
            }
            if (sBlue === 255) {
                const redRatioX = (255 - sRed) / 480
                const greenRatioX = (255 - sGreen) / 480
                y = 480 * (1 - b / 255)
                x = 480 * (1 - r / b) * 255 / (255 - sRed)
            }

            this.setData({
                // 选择点的颜色
                pickerData: {
                    x: x,
                    y: y,
                    red: r,
                    green: g,
                    blue: b,
                    hex: hex,
                },
                input: {
                    red: r,
                    green: g,
                    blue: b,
                    hex: hex,

                },
            })
        },
        // 根据颜色获取bar y值
        _getBarY(r, g, b, hex) {
            let y = 0
            const { hueData } = this.data
            if (r >= g && r >= b) {
                if (g > b) {
                    hueData.colorStopRed = 255
                    hueData.colorStopGreen = g
                    hueData.colorStopBlue = 0
                    y = 0.32 * g
                } else if (g < b) {
                    hueData.colorStopRed = 255
                    hueData.colorStopGreen = 0
                    hueData.colorStopBlue = b
                    y = 490 - 0.32 * b
                } else {
                    hueData.colorStopRed = 255
                    hueData.colorStopGreen = 0
                    hueData.colorStopBlue = 0
                    y = 0
                }
            } else if (g >= r && g >= b) {
                if (r > b) {
                    hueData.colorStopRed = r
                    hueData.colorStopGreen = 255
                    hueData.colorStopBlue = 0
                    y = 163.34 - 0.32 * r
                } else if (r < b) {
                    hueData.colorStopRed = 0
                    hueData.colorStopGreen = 255
                    hueData.colorStopBlue = b
                    y = 163.34 + 0.32 * b
                } else {
                    hueData.colorStopRed = 0
                    hueData.colorStopGreen = 255
                    hueData.colorStopBlue = 0
                    y = 163.34
                }
            } else if (b >= r && b >= g) {
                if (r > g) {
                    hueData.colorStopRed = r
                    hueData.colorStopGreen = 0
                    hueData.colorStopBlue = 255
                    y = 326.68 + 0.32 * r
                } else if (r < g) {
                    hueData.colorStopRed = 0
                    hueData.colorStopGreen = g
                    hueData.colorStopBlue = 255
                    y = 245.01 + 0.32 * g
                } else {
                    hueData.colorStopRed = 0
                    hueData.colorStopGreen = 0
                    hueData.colorStopBlue = 255
                    y = 326.68
                }
            }
            this.setData({
                barY: y,
                hueData,
            })
            this._getPos(r, g, b, hex)
        },
        // 改变色相
        _changeHue(y) {
            // 根据色相bar的长度(490)计算出每拖动0.32距离就改变一次色相（R或G或B的值增减1）
            // 色相的变化一共分为六个阶段,每次拖动81.67距离就完成一个阶段
            const { hueData } = this.data
            if (y < 81.67) { // r > g > b
                const value = y / 0.32 > 255 ? 255 : y / 0.32
                hueData.colorStopRed = 255
                hueData.colorStopGreen = Math.round(value)
                hueData.colorStopBlue = 0
            }
            if (y >= 81.67 && y < 163.34) { // g > r > b
                const value = (y - 81.67) / 0.32 > 255 ? 255 : (y - 81.67) / 0.32
                hueData.colorStopRed = 255 - Math.round(value)
                hueData.colorStopGreen = 255
                hueData.colorStopBlue = 0
            }
            if (y >= 163.34 && y < 245.01) { // g > b > r
                const value = (y - 163.34) / 0.32 > 255 ? 255 : (y - 163.34) / 0.32
                hueData.colorStopRed = 0
                hueData.colorStopGreen = 255
                hueData.colorStopBlue = Math.round(value)
            }
            if (y >= 245.01 && y < 326.68) { // b > g > r
                const value = (y - 245.01) / 0.32 > 255 ? 255 : (y - 245.01) / 0.32
                hueData.colorStopRed = 0
                hueData.colorStopGreen = 255 - Math.round(value)
                hueData.colorStopBlue = 255
            }
            if (y >= 326.68 && y < 408.35) { // b > r > g
                const value = (y - 326.68) / 0.32 > 255 ? 255 : (y - 326.68) / 0.32
                hueData.colorStopRed = Math.round(value)
                hueData.colorStopGreen = 0
                hueData.colorStopBlue = 255
            }
            if (y >= 408.35) { // r > b > g
                const value = (y - 408.35) / 0.32 > 255 ? 255 : (y - 408.35) / 0.32
                hueData.colorStopRed = 255
                hueData.colorStopGreen = 0
                hueData.colorStopBlue = 255 - Math.round(value)
            }
            this.setData({
                hueData
            })
            // 改变完色相需要再次改变选择的颜色
            this._changeColor(this.data.pickerData.x, this.data.pickerData.y)
        },
        _rgbToHex(r, g, b) {
            let hex = ((r << 16) | (g << 8) | b).toString(16)
            if (hex.length < 6) {
                hex = `${'0'.repeat(6 - hex.length)}${hex}`
            }
            if (hex == '0') {
                hex = '000000'
            }
            return `#${hex}`
        },
        _hexToRgb(hex) {
            let r, g, b
            if (hex.length === 4) {
                r = Number.parseInt('0x' + hex[1] + hex[1])
                g = Number.parseInt('0x' + hex[2] + hex[2])
                b = Number.parseInt('0x' + hex[3] + hex[3])
            } else if (hex.length === 7) {
                r = Number.parseInt('0x' + hex.slice(1, 3))
                g = Number.parseInt('0x' + hex.slice(3, 5))
                b = Number.parseInt('0x' + hex.slice(5, 7))
            } else {
                throw new Error('错误的Hex颜色格式')
            }
            return [r, g, b]
        },
        // 手动输入颜色
        handleInputRgb(e) {
            let val = +e.detail.value
            let type = e.currentTarget.dataset.type
            val = val.replace(/\D/g, '')
            if (val > 255) {
                val = val / 10 << 0
            }
            this.setData({
                ['input.' + type]: val,
            })
        },
        handleBlurRgb(e) {
            let obj = {
                red: this.data.pickerData.red,
                green: this.data.pickerData.green,
                blue: this.data.pickerData.blue,
            }
            let val = e.detail.value
            let type = e.currentTarget.dataset.type
            obj[type] = val
            let { r, g, b, hex } = this.formatColor(`rgb(${obj.red},${obj.green},${obj.blue})`)
            this._getBarY(r, g, b, hex)
        },
        handleInputHex(e) {
            let val = e.detail.value + ''
            val = val.replace(/[^0-9a-fA-F]/g, '')
            if (val.length > 6) {
                val = val.slice(0, 6)
            }
            this.setData({
                'input.hex': val,
            })
        },
        handleBlurHex(e) {
            let val = e.detail.value + ''
            if (val.length === 3 || val.length === 6) {
                let { r, g, b, hex } = this.formatColor('#' + val)
                this._getBarY(r, g, b, hex)
            }
        },
        // 确认选择
        handleCancel() {
            this.triggerEvent('close')
        },
        handleConfirm() {
            this.triggerEvent('change', this.data.pickerData)
        },
    }
})
