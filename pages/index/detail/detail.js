//index.js
//获取应用实例
var WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    content: null,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
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
// 保存
  collect: function (event) {
    var item = event.currentTarget.dataset.item
    wx.getStorage({
      key: 'collect',
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          // TODO 判断当前电影是否已经收藏
          wx.setStorage({
            key: "collect",
            data: item
          })
          // wx.navigateTo({
          //   url:event.currentTarget.dataset.url
          // })
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
  // 图片预览
  previewImage: function (e) {
    var current=e.target.dataset.url;
    var urls=this.data.content.images;
    // var urls=content.map(function (item) {
    //   return item.thumb
    // })
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls:urls // 需要预览的图片http链接列表
    })
  }
})

