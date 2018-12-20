//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    posts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostsList()
  },

  toDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.setStorageSync('detail', this.data.posts[index]);
    wx.navigateTo({
      url: app.globalData.url.detail,
    })
  },

  getPostsList: function () {
    if (wx.getStorageSync("pages") && this.data.page > wx.getStorageSync("pages")) {
      return false
    }
    wx.request({
      url: app.globalData.host + app.globalData.route.blog,
      data: {
        page: this.data.page,
        limit: 6
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.setStorageSync("pages", res.data.pages)
          this.data.page += 1
          var data = this.data.posts
          for (var index in res.data.data) {
            data.push(res.data.data[index])
          }
          this.setData({
            posts: data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.clearStorageSync()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getPostsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPostsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
