/**
 * Youtube player를 컨트롤 하는 컴포넌트
 * @author 이선규 <sungyu.lee@nhn.com>
 * @version 0.1.0
 * @since 15. 5. 8.
 * @copyright Copyright (c) 2015, NHN Technology Services inc.
 *
 * @class VideoPlayer
 * @example 
 */

var VideoPlayer = function(){
    /**
     * 초기화
     */
    this.init = function(){
        this._video = $('#video');
        this._playArea = $('.ly_movie');
        this._dimmedArea = $('.dimmed');
        this._showBtn = $('#_btn_video');

        if(this._isMobile()){
            this._onVideoReady();
        } else {
            this._useYoutubeAPI();
        }

    };

    /**
     * 모바일인지 확인
     * @returns {boolean}
     * @private
     */
    this._isMobile = function(){
        var uAgent = navigator.userAgent.toLowerCase(),
        mobilePhones = new Array('iphone','ipod','android','blackberry','windows ce', 'nokia','webos','opera mini','sonyericsson','opera mobi','iemobile'),
        index, length = mobilePhones.length;


        for( index=0 ; index<length ; index++ ) {
            if(uAgent.indexOf(mobilePhones[index]) !== -1) {
                return true;
            }
        }
        return false;

    };

    /**
     * IE인지 확인
     * @returns {boolean}
     * @private
     */
    this._isIE = function(){
        var uAgent = window.navigator.userAgent;

        var msie = uAgent.indexOf('MSIE ');
        var trident = uAgent.indexOf('Trident/');
        var edge = uAgent.indexOf('Edge/');

        if (msie > 0 || trident > 0 || edge > 0) {
            return true;
        }

        return false;
    };

    /**
     * 유투브 API를 사용할 수 있도록 설정
     * @private
     */
    this._useYoutubeAPI = function () {
        if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
            var self = this;
            var tag = document.createElement('script');
            tag.src = "http://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubePlayerAPIReady = function () {
                self._createPlayer();
            };
        } else {
            this._createPlayer();
        }
    };

    /**
     * 유투브 API사용을 위한 플레이어 객체를 생성
     * @private
     */
    this._createPlayer = function(){
        var self = this;
        this._player = new YT.Player('video' , {
            events: {
                'onReady': function(){ self._onVideoReady(); }
            }
        });

        if (this._isIE()) {
            this._onVideoReady();
        }
    };

    /**
     * 동영상 재생 준비 완료
     * @private
     */
    this._onVideoReady = function(){
        var self = this;
        this._showBtn.on('click', function(e){ self._show(e); });
        this._dimmedArea.on('click', function(e){ self._hide(e); });
    };

    /**
     * 동영상 레이어를 띄움
     * @param event
     * @private
     */
    this._show = function(event){
        event.stopPropagation();
        event.preventDefault();

        this._playArea.css('display', 'block');
        this._dimmedArea.show();

        if(this._player){
            var self = this;
            var fn = function(){ self._player.playVideo()};
            setTimeout(fn, 500);
        }
    };

    /**
     * 동영상 레이어를 닫음
     * @private
     */
    this._hide = function(){
        if(this._player) {
            this._player.stopVideo();
        }
        this._video.attr('src', '');
        this._playArea.css('display', 'none');
        this._dimmedArea.hide();
        this._video.attr('src', 'https://www.youtube.com/embed/uc27IyZwSLI?enablejsapi=1&controls=0&autohide=1&rel=0');
    };

    // 초기화 함수 호출
    this.init();
};
