// pages/photo/photo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPhotos();
  },

  getPhotos: function () {
    if (wx.getStorageSync("photoPages") && this.data.page > wx.getStorageSync("photoPages")) {
      return false
    }
    var id = wx.getStorageSync("travelId");
    wx.request({
      url: app.globalData.host + app.globalData.route.photo,
      data: {
        id: id,
        page: this.data.page,
        limit: 8
      },
      success: res => {
        if (res.statusCode === 200) {
          wx.setStorageSync("photoPages", res.data.pages)
          this.data.page += 1
          var data = this.data.photos
          for (var index in res.data.data) {
            data.push(res.data.data[index])
          }
          this.setData({
            photos: data
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getPhotos();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})