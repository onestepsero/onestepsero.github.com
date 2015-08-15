/**
 * Created by Rosalia on 15. 4. 29..
 */

/**
 * 상단 이미지를 자동으로 슬라이딩하는 컴포넌트
 * @param sElementId 슬라이드 이미지들을 감싸고 있는 ul 요소의 id (ex. '#_slider')
 * @constructor
 */
var Slider = function(sElementId){
    $(document).ready(function(){
        // 상단 이미지 슬라이드 영역 이미지 처리
        // 메인 BG 이미지 크기 세팅
        var imgWidth = $(".img").attr("width");
        var imgHeight = $(".img").attr("height");

        $(".img").attr({"width" : imgWidth, "height" : imgHeight});
        resize();

        $(window).resize(function() {
            resize();
        });

        function resize(scrollLeftVal){
            if(typeof scrollLeftVal == "undefined") {
                scrollLeftVal = 0;
            }
            var windowWidth = $(window).width();
            //var windowHeight = $(window).height();
            var windowHeight = $(".spot").height();
            var imgWidthAttr = $(".img").attr('width');
            var imgHeightAttr = $(".img").attr('height');

            var widthpx = windowWidth / imgWidthAttr;
            var heightpx = windowHeight / imgHeightAttr;

            if(widthpx > heightpx){
                var rate =  windowWidth / imgWidth;
                imgWidthAttr = windowWidth;
                imgHeightAttr = imgHeight*rate;
                $(".img").attr({"width" : windowWidth, "height" : imgHeightAttr});
            }else{
                var rate =  windowHeight / imgHeight;
                imgWidthAttr = imgWidth*rate;
                imgHeightAttr = windowHeight;
                $(".img").attr({"width" : imgWidthAttr, "height" : windowHeight});
            }

            // 그림 위치 잡기
            positioning(windowWidth, windowHeight, imgHeightAttr, imgWidthAttr);

        };

        function positioning(windowWidth, windowHeight, imgHeightAttr, imgWidthAttr){
           /* if(imgWidthAttr > windowWidth){
                $(".img").css('left', -(imgWidthAttr - windowWidth)/2);
            }else{
                $(".img").css('left', 0);
            }*/
            $(".img").css('left', 0);

            if(imgHeightAttr > windowHeight){
                $(".img").css('top', -(imgHeightAttr - windowHeight)/2);
            }else{
                $(".img").css('top', 0);
            }
        };

        $(sElementId).responsiveSlides({
            auto: true,
            speed: 1000,
            timeout: 2500
        });

    });
};