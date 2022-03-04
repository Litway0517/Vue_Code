/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

let vue = new Vue({
    el: "#player",
    data: {
        // 搜索框中的歌曲名称
        musicName: "",
        // 歌曲列表
        searchMusicList: [],
        // 歌曲URL
        musicUrl: "",
        // 歌曲Img地址
        musicImgUrl: "",
        // 当前歌曲的评论
        musicHotComments: [],



    },
    methods: {
        // 搜索音乐功能
        searchMusic: function () {
            console.log(this.musicName);
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.musicName)
                .then(function (response) {
                    console.log("歌曲数据 -> " + response.data.result.songs);
                    that.searchMusicList = response.data.result.songs;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 播放音乐功能
        playMusic: function (musicId) {
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    // 注意取数据的正确性. 不正确的 -> response.data.data.url.
                    // 正确的取值顺序 -> response.data.data[0].url
                    console.log("音乐播放地址 ->" + response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;
                })
                .catch(function (err) {
                    console.log(err);
                });

            // 调用加载图片功能
            this.setMusicImg(musicId);
            // 调用获取评论功能
            this.setMusicCommons(musicId);
        },

        // 设置播放时的图片
        setMusicImg: function (musicId) {
            var that = this;
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (response) {
                    console.log("音乐图片地址 -> " + response.data.songs[0].al.picUrl);
                    that.musicImgUrl = response.data.songs[0].al.picUrl;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 设置歌曲的评论
        setMusicCommons: function (musicId) {
            var that = this;
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    console.log(response.data.hotComments);
                    that.musicHotComments = response.data.hotComments;
                })
                .catch(function () {});

        },
    }

});


















