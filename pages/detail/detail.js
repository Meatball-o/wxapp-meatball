//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js')
const app = getApp()

Page({
  data: {
    content: null,
  },
  // 获取
  onLoad: function (event) {
    console.log('onLoad')
    var vm = this
    var content = wx.getStorageSync('content')
    var contentMore = content.more.split("<br/>")
    var createTime = new Date(content.createTime).toLocaleDateString()
    if (content) {
      vm.setData({
        content,
        contentMore,
        createTime
      })
    }
    WxParse.wxParse('content.more', 'html', content.more, vm, 5)
    console.log(vm.data)
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
  //   // houseDetail = houseDetail.split(",")
  //   // console.log(houseDetail)
  //   wx.previewImage({
  //     current: url, // 当前显示图片的http链接
  //     urls: imgArr // 需要预览的图片http链接列表
  //   })
  // },

// 收藏
  collect: function (event) {
    var item = event.currentTarget.dataset.item
    wx.getStorage({
      key: 'content',
      data: item,
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1200
          })
          console.log(event)
        } else {
          wx.showToast({
            title: '取消收藏成功',
            icon: 'success',
            duration: 1200
          })
        }
      },
    })
  },
  // 复制
  setClipboardData: function (event) {
    var vm = this
    var url = event.currentTarget.dataset.url
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 1200
            })
          }
        })
      }
    })
  },
  // 分享
  onShareAppMessage(res, event) {
    const vm = this
    return {
      path: '/pages/index/index',
      form: 'menu',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

})

