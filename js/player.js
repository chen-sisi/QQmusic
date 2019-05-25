(function (window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init:function ($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        playMusic: function (index,music) {
            //是否是同一首音乐
            if(this.currentIndex == index){
                //同一首音乐
                if (this.audio.paused) {
                    this.audio.play();
                }else {
                    this.audio.pause();
                }
            }else {
                //不是同一首音乐
                this.$audio.attr("src","https://api.bzqll.com/music/tencent/url?key=579621905&id="+music.data.songmid+"br=320");
                this.audio.play();
                this.currentIndex = index;
            }
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);