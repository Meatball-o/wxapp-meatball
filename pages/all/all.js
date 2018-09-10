//detail.js
//获取应用实例
var utils = require('../../utils/util.js')

const app = getApp()
Page({
  data: {
    score: false,
    date: null,
  },
  toggleListActive(event){
    const vm = this
    const {type} = event.currentTarget.dataset
    if (type == "date") {
      vm.setData({
        score: null,
        date: !vm.data.date
      })
    } else if (type == "score") {
      vm.setData({
        date: null,
        score: !vm.data.score
      })
    }
    // 当前分页
    vm._index_curPage = 1
    // 分页全部加载完 分页重置
    vm._index_loaded=false
    vm.setData({
      content:[]
    })
    vm.requestData()
  },
  requestData(){
    var vm = this
    // loading 还在请求 加载中
    if (vm.data.loading || vm._index_loaded) {
      return
    }
    vm.setData({
      loading: true
    })
    vm._index_curPage = vm._index_curPage || 1
    const {date, score} = vm.data
    wx.request({
      method: "GET",
      url: 'https://heiliuer.com/crawler/api/6v/video',
      dataType: 'json',
      header: {},
      data: {
        sort: {
          createTime: date,
          score: score
        },
        page: vm._index_curPage,
        limit: 100
      },
      success(res) {
        if (res.statusCode == 200) {
          const {docs, page, pages} = res.data.data
          const content = (vm.data.content || []).concat(docs)
          if (page >= pages) {
            vm._index_loaded = true
            // loaded 数据加载完
            vm.setData({
              loaded: true
            })
          }
          vm.setData({content})
          vm._index_curPage++
        } else {
          wx.showModal({
            title: '提示',
            content: '请求出错',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '请求出错',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      },
      complete() {
        vm.setData({
          loading: false
        })
      },
    })
  },
  onLoad: function () {
    this.requestData()
  },
  jumpDetail: function (event) {
    wx.setStorage({
      key: "content",
      data: event.currentTarget.dataset.item
    })
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
    console.log(event)
  },
  onShareAppMessage(res) {
    const vm = this
    return {
      title: '影集',
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

