Component({
  properties: {
    // save | wangge | delete | xiangpi | flip | pen | quse | baocun | share | about | jiantou | kafei | tuoniao | jiahao | feedback
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    svgSize: 18,
    quot: '"',
    isStr: true,
  },
});
