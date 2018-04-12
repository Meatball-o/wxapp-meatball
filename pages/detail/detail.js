//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    content: null,
  },
  // 获取
  onLoad: function (event) {
    console.log('onLoad');
    var that = this
    var content = wx.getStorageSync('content')
    if (content) {
      that.setData({content})
    }
    WxParse.wxParse('content.more', 'html', content.more, that, 5);
    console.log(that.data)

    wx.setNavigationBarTitle({
      title: content.name
    })
  },
  // previewImage(event) {
  //   var vm = this
  //   var url = event.currentTarget.dataset.url
  //   var imgArr = vm.data.houseDetail.images.map(function (img, index) {
  //     return img.url
  //   })
  //   // houseDetail = houseDetail.split(",");
  //   // console.log(houseDetail);
  //   wx.previewImage({
  //     current: url, // 当前显示图片的http链接
  //     urls: imgArr // 需要预览的图片http链接列表
  //   })
  // },

// 收藏
  collect: function (event) {
    var item = event.currentTarget.dataset.item
    wx.getStorage({
      key: 'collect',
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          wx.setStorage({
            key: "collect",
            data: item
          })
          console.log(event);
        } else {
          wx.showToast({
            title: '已收藏过',
            duration: 300
          })
        }
      }
    })
  },
  // 复制
  setClipboardData: function (event) {
    var vm=this
    var url = event.currentTarget.dataset.url
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
})

