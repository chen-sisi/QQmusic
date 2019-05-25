$(function () {
    // 0.自定义滚动条
    $(".content_list").mCustomScrollbar();

    var $audio = $("audio");
    var player = new Player($audio);

    //1.加载歌曲列表
    getPlayerList();
    function getPlayerList() {
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
        $.ajax({
            url:url,
            type:"get",
            dataType:'jsonp',
            jsonp: "jsonpCallback",
            scriptCharset: 'GBK',//解决中文乱码
            success: function(data){
                //最新音乐数据
                console.log(data);
                player.musicList = data;
                var $musicList = $(".content_list ul");
                $.each(data.songlist, function (index, music) {
                    var $item = createMusicItem(index, music);
                    $musicList.append($item);
                })
            },
            error:function (e) {
                console.log('error');
            }
        });
    }
    // 2.初始化事件监听
    initEvens();
    function initEvens() {
        // 1.监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music","mouseenter", function () {
            // 显示子菜单
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music","mouseleave", function () {
            // 显示子菜单
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeIn(100);
        });
        // 2.监听复选框的点击事件
        $(".content_list").delegate(".list_check","click", function () {
            $(this).toggleClass("list_checked");
        });
        //3.添加子菜单播放按钮
        var $musicPlay = $(".music_play");
        $(".content_list").delegate(".list_menu_play","click",function () {
            var $item = $(this).parents(".list_music");
            //3.1切换播放图标
            $(this).toggleClass("list_menu_play2");

            //3.2复原其他播放图标
            $(this).parents(".list_music").siblings().find(".list_menu_play").removeClass("list_menu_play2");

            //3.3同步底部播放按钮
            if($(this).attr("class").indexOf("list_menu_play2") != -1){
                //当前子菜单按钮为播放
                $musicPlay.addClass("music_play2");
                //让文字高亮
                $item.find("div").css("color","#fff");
                $item.siblings().find("div").css("color","rgba(255,255,255,0.6)");
            }
            else {
                //当前子菜单按钮不为播放
                $musicPlay.removeClass("music_play2");
                //让文字高亮
                $item.find("div").css("color","rgba(255,255,255,0.6)");
            }
            //3.4 序号状态切换
            $item.find(".list_number").toggleClass("list_number2");
            $item.siblings().find(".list_number").removeClass("list_number2");
            //3.5 播放音乐
            player.playMusic($item.get(0).index,$item.get(0).music);

        })
    }
    //创建音乐条
    function createMusicItem(index, music) {
        var singerArray = [];
        var singerList = music.data.singer;
        for(let i in singerList){
            singerArray.push(singerList[i].name);
        }
        var singer = singerArray.join("/");
        var $item = $("<li class=\"list_music\">\n" +
            "                        <div class=\"list_check\"><i></i></div>\n" +
            "                        <div class=\"list_number\">"+ (index+1) +"</div>\n" +
            "                        <div class=\"list_name\">" + music.data.songname +
            "                            <div class=\"list_menu\">\n" +
            "                                <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "                                <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "                                <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "                                <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                        <div class=\"list_singer\">"+ singer+"</div>\n" +
            "                        <div class=\"list_time\">\n" +
            "                            <span>05:07</span>\n" +
            "                            <a href=\"javascript:;\" title=\"删除\"></a>\n" +
            "                        </div>\n" +
            "                    </li>");

        $item.get(0).index = index;
        $item.get(0).music = music;

        return $item;
    }
});