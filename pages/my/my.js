//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    phone: [
      {
        image: "../../images/my.jpg"
      }
    ]
  },
  onLoad(){
    const that = this
    wx.showLoading({
      title: '获取用户信息',
    })
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.setData({
          userInfo: res.userInfo
        })
        console.log({
          userInfo: res.userInfo
        })
      },
      complete(){
        wx.hideLoading()
      },
      fail(){
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }
})

