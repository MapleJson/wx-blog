//app.js
// 如果审核通过则可以将其加入app.json中去
// "pages/index/index",
//   "pages/detail/detail",
//   {
//     "pagePath": "pages/index/index",
//     "text": "博客"
//   },
//   {
//     "pagePath": "pages/about/about",
//     "text": "关于"
//   },
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    host: 'https://52zoe.cn',
    route:{
      blog: "/api/app-loadBlog",
      travels: "/api/app-travels",
      photo: "/api/app-loadPhoto",
      whisper: "/api/app-whisper",
      about: "/api/app-about",
    },
    url: {
      detail: "/pages/detail/detail",
      photo: "/pages/photo/photo",
    }
  }
})