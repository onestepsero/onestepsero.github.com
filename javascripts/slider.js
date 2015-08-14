/**
 * Created by 강나루 on 2015-08-14.
 */
/**
 * Created by Rosalia on 15. 4. 29..
 */

/**
 * �곷떒 �대�吏�瑜� �먮룞�쇰줈 �щ씪�대뵫�섎뒗 而댄룷�뚰듃
 * @param sElementId �щ씪�대뱶 �대�吏��ㅼ쓣 媛먯떥怨� �덈뒗 ul �붿냼�� id (ex. '#_slider')
 * @constructor
 */
var Slider = function(sElementId){
    $(document).ready(function(){
        // �곷떒 �대�吏� �щ씪�대뱶 �곸뿭 �대�吏� 泥섎━
        // 硫붿씤 BG �대�吏� �ш린 �명똿
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

            // 洹몃┝ �꾩튂 �↔린
            positioning(windowWidth, windowHeight, imgHeightAttr, imgWidthAttr);

        };

        function positioning(windowWidth, windowHeight, imgHeightAttr, imgWidthAttr){
            if(imgWidthAttr > windowWidth){
                $(".img").css('left', -(imgWidthAttr - windowWidth)/2);
            }else{
                $(".img").css('left', 0);
            }

            if(imgHeightAttr > windowHeight){
                $(".img").css('top', -(imgHeightAttr - windowHeight)/2);
            }else{
                $(".img").css('top', 0);
            }
        };

        $(sElementId).responsiveSlides({
            auto: true,
            speed: 1500,
            timeout: 6000
        });

    });
};