// pages/whisper/whisper.js
const app = getApp()

const WxParse = require('../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whisperArr: [],
    whisper: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWhisper();
  },

  getWhisper: function () {
    if (wx.getStorageSync("whisperPages") && this.data.page > wx.getStorageSync("whisperPages")) {
      return false
    }
    var that = this;
    wx.request({
      url: app.globalData.host + app.globalData.route.whisper,
      data: {
        page: that.data.page,
        limit: 10
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.setStorageSync("whisperPages", res.data.pages)
          that.data.page += 1
          var data = that.data.whisper
          for (var index in res.data.data) {
            data.push(res.data.data[index]);
            that.data.whisperArr.push(res.data.data[index].content);
          }
          for (let i = 0; i < that.data.whisperArr.length; i++) {
            WxParse.wxParse('whisperCon' + i, 'html', that.data.whisperArr[i], that);
            if (i === that.data.whisperArr.length - 1) {
              WxParse.wxParseTemArray("replyTemArray", 'whisperCon', that.data.whisperArr.length, that);
            }
          }
          that.setData({
            whisper: data
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getWhisper();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})