//detail.js
//获取应用实例
var utils = require('../../utils/util.js');

const app = getApp()
Page({
  data: {
    content: []
  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://gitee.com/heiliuer/wxapp-meatball-backend/raw/master/api/v1/movies.json',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log({
          data: res.data,
          isStr: typeof res.data
        });
        if (typeof res.data == 'string') {
          res.data = JSON.parse(res.data)
        }
        console.log(res.data.data)
        const content = res.data.data;
        content.forEach(
          d => d.listDesc = (d.desc || '').trim()
        )
        that.setData({content})
      },
      fail(){
        wx.showToast({
          title: '获取数据失败 ',
          icon: 'error',
          duration: 2000
        })
        console.log(arguments)
      },
      complete(){
        wx.hideLoading()
      }
    })

  },
  jumpDetail: function (event) {
    wx.setStorage({
      key: "content",
      data: event.currentTarget.dataset.item
    })
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
    console.log(event);
  },
  previewImage: function (e) {
    var current=e.target.dataset.url;
    var content=this.data.content;
    var urls=content.map(function (item) {
      return item.thumb
    })
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls:urls // 需要预览的图片http链接列表
    })
  }
})

