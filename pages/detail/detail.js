// pages/detail/detail.js

const WxParse = require('../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    currentId: null,
    collection: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var detail = wx.getStorageSync("detail");
    that.setData({
      currentId: detail.id
    });
    // 读取所有的文章列表点赞缓存状态
    var cache = wx.getStorageSync('like');
    // 如果缓存状态存在
    if (cache) {
      // 拿到所有缓存状态中的1个
      var currentCache = cache[detail.id] ? cache[detail.id] : false;
      // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
      that.setData({
        collection: currentCache
      })
    } else {
      // 如果所有的缓存状态都不存在 就让不存在的缓存存在
      var cache = {};
      // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false
      cache[detail.id] = false;
      // 把设置的当前文章点赞放在整体的缓存中
      wx.setStorageSync('like', cache);
    }
    // 编译HTML
    var article = detail.content;
    article = article.replace("iframe", "video");
    WxParse.wxParse('article', 'html', article, that, 5);
    that.setData({
      detail: detail
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
  
  },

  // 点击图片的点赞事件  这里使用的是同步的方式
  toCollect: function (event) {
    // 获取所有的缓存
    var cache = wx.getStorageSync('like');
    // 获取当前文章是否被点赞的缓存
    var currentCache = cache[this.data.currentId];
    // 取反，点赞的变成未点赞 未点赞的变成点赞
    currentCache = !currentCache;
    // 更新cache中的对应的1个的缓存值，使其等于当前取反的缓存值
    cache[this.data.currentId] = currentCache;
    // 重新设置缓存
    wx.setStorageSync('like', cache);
    // 更新数据绑定,从而切换图片
    this.setData({
      // collection 默认的是 false
      collection: currentCache
    });
    // 交互反馈
    wx.showToast({
      title: currentCache ? '点赞' : '取消',
      icon: 'success',
      duration: 2000
    });
  }
})