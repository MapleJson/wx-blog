// pages/about/about.js
const app = getApp()

const WxParse = require('../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    about: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.host + app.globalData.route.about,
      success: res => {
        if (res.statusCode === 200) {
          var article = res.data.data.content;
          WxParse.wxParse('article', 'html', article, that, 5);
          that.setData({
            about: res.data.data
          })
        }
      }
    })
  },

  wxParseTagATap: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.src,
      success: function (res) {
        wx.showModal({
          title: '复制成功',
          content: '请转至浏览器打开链接！',
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})