//app.js
// 如果审核通过则可以将其加入app.json中去

App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    host: '',
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