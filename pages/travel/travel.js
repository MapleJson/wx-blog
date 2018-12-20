// pages/travel/travel.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    travels: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.host + app.globalData.route.travels,
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            travels: res.data.data
          })
        }
      }
    })
  },

  toPhoto: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.setStorageSync('travelId', this.data.travels[index].id);
    wx.navigateTo({
      url: app.globalData.url.photo,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('posts')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})