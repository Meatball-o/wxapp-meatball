//index.js
//获取应用实例
var WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../../images/tooopen_sy_143912755726.jpg',
      '../../../images/tooopen_sy_175833047715.jpg',
      '../../../images/tooopen_sy_175866434296.jpg'
    ],
    title: [
      {
        title: "大户数的萨达是"
      }
    ],
    content: [
      {
        title: "◎译　　名　蜡笔小新：外星人噼噼怪来袭！！(港)/蜡笔小新：宇宙人Pi力来袭(台)sh<br/>◎片　　名　クレヨンしんちゃん 襲来!!宇宙人シリリ/Crayon Shinchan: Invasion!! Alien Shiriri<br/>◎年　　份　2017<br/>◎国　　家　日本<br/>◎类　　别　动画/喜剧<br/>◎语　　言　日语<br/>◎字　　幕　中字<br/>◎导　　演　桥本昌和<br/>◎主　　演　矢岛晶子<br/>　　　　　　楢桥美纪<br/>　　　　　　森川智之<br/>　　　　　　兴梠里美<br/>　　　　　　泽城美雪<br/>　　　　　　宫迫博之<br/>　　　　　　萤原徹<br/>　　　　　　志田未来"
      }
    ],
    downLoad:[
      {
        content:"蜡笔小新：宇宙人来袭.720p.国粤日三语.BD中字.mp4"
      }
    ],
    introduction:[
      {
        content:"    太空船中走出了一个谜样生物，他是从距离地球20067光年远的「NICE BODY星」来的小小宇宙人「Pi力」，小新充满好奇地慢慢靠近，神秘光线却突然发射，小新灵巧地闪开了，可是广志和美冴躲不开，反而年轻了25岁，变成了小孩子！为了要变回大人，就得找到「Pi力」的爸爸，于是「Pi力」躲在小新屁屁里，跟幼幼版的野原一家开始了日本环岛之旅…"
      }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000
  },
  onLoad: function () {
    var _this = this
    // console.log('onLoad')
    WxParse.wxParse('content.title', 'html', _this.data.content[0].title, _this, 5);
  }
})

