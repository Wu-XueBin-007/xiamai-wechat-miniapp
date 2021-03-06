Component({
  externalClasses: ["l-class", "l-single-image-class", "l-multi-image-class"],
  properties: {
    urls: {
      type: Array
    },
    preview: {
      type: Boolean,
      value: !0
    },
    gapRow: {
      type: Number,
      value: 10
    },
    gapColumn: {
      type: Number,
      value: 10
    },
    singleSize: {
      type: Number,
      value: 360
    },
    multipleSize: {
      type: Number,
      value: 158
    },
    singleMode: {
      type: String,
      value: "aspectFit"
    },
    multipleMode: {
      type: String,
      value: "aspectFill"
    },
    key: {
      type: String,
      value: "url"
    },
    maxNumber: {
      type: Number,
      value: 9
    },
    customRowNumber: {
      type: Boolean,
      value: !1
    },
    everyRowNumber: {
      type: Number,
      value: 3
    },
    previewFullImage: {
      type: Boolean,
      value: !0
    }
  },
  data: {
    newType: !0,
    shortSideValue: 0,
    row: 0,
    colum: 0,
    showUrls: [],
    isLong: !1
  },
  lifetimes: {
    attached() {
      let e = [];
      if (this.data.urls.length > this.data.maxNumber ? (e = this.data.urls.slice(0, this.data.maxNumber), this.setData({
          isLong: !0
        }), console.warn("图片数量超过maxNumber指定数量")) : e = this.data.urls, this.setData({
          showUrls: e
        }), !this.data.customRowNumber) {
        let e = this.data.showUrls.length;
        e > 1 && e < 5 ? this.setData({
          everyRowNumber: 2
        }) : this.setData({
          everyRowNumber: 3
        })
      }
      this.preview()
    }
  },
  observers: {
    urls: function() {
      this.preview()
    }
  },
  methods: {
    judgeType() {
      const e = this.data.urls;
      return 0 === e.length || "object" == typeof e[0]
    },
    horizontalOrVertical: function(e) {
      wx.getImageInfo({
        src: e,
        success: e => {
          const t = e.width >= e.height ? e.width : e.height,
            a = e.width >= e.height ? e.height : e.width;
          this.setData({
            horizontalScreen: e.width >= e.height,
            shortSideValue: a * this.data.singleSize / t
          })
        }
      })
    },
    preview: function() {
      const e = this.judgeType();
      this.setData({
        newType: e
      });
      const t = this.data.urls,
        a = this.data.key;
      1 === t.length && this.horizontalOrVertical(e ? t[0][a] : t[0])
    },
    onPreviewTap(e) {
      const t = e.currentTarget.id;
      let a;
      a = this.data.previewFullImage ? this.data.urls : this.data.showUrls;
      let s = "",
        i = [];
      const l = this.data.newType,
        r = this.data.key;
      if (l) {
        s = a[t][r];
        for (let e = 0; e < a.length; e++) i.push(a[e][r])
      } else s = a[t], i = a;
      let h = {
        index: t,
        current: a[t],
        all: a
      };
      !0 === this.data.preview && wx.previewImage({
        current: s,
        urls: i
      }), this.triggerEvent("lintap", h, {})
    }
  }
});