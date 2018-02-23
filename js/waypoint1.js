/**
 * Created by dhis on 23/02/2018.
 */

$(document).ready(function() {
    $(this).scrollTop(0);
    //waypoints stuff
    var waypoint1 = new Waypoint({
        element: document.getElementById('thing1'),
        handler: function (direction) {
            console.log('You have scrolled to a thing1 ' + direction)
            anim2.goToAndStop(0);
            if (direction === 'down') {
                TweenMax.fromTo($('#thing1'), 2, {
                    backgroundColor: '#000000'
                }, {
                    backgroundColor: '#ffffff',
                    ease: Power3.easeOut
                });

                TweenMax.fromTo($('.thingText'), 2, {
                    color: '#ffffff'
                }, {
                    color: '#000000',
                    ease: Power3.easeOut
                });

                $('#img1').toggleClass('hide');
                $('#img2').toggleClass('hide');
            }

            if (direction === 'up') {

                TweenMax.fromTo($('#thing1'), 2, {
                    backgroundColor: '#ffffff'
                }, {
                    backgroundColor: '#000000',
                    ease: Power3.easeOut
                });

                TweenMax.fromTo($('.thingText'), 2, {
                    color: '#000000'
                }, {
                    color: '#ffffff',
                    ease: Power3.easeOut
                });

                $('#img1').toggleClass('hide');
                $('#img2').toggleClass('hide');

            }
        },
        offset: '-30%'
    })

    var waypoint2 = new Waypoint({
        element: document.getElementById('thing2'),
        handler: function (direction) {
            console.log('You have scrolled to a thing2 ' + direction)
            anim2.play();
        },
        offset: -200
    })

    var waypoint22 = new Waypoint({
        element: document.getElementById('thing2'),
        handler: function (direction) {
            console.log('You have scrolled to a thing2 ' + direction)
            anim2.play();
            if(direction === 'down') {
                $('body').addClass('stop-scrolling');                                    //body scroll reenabled in anim2 complete eventlistener below
                $('body').bind('touchmove', function(e){e.preventDefault()})
            }
        },
        offset: 100
    })

    var waypoint3 = new Waypoint({
        element: document.getElementById('thing3'),
        handler: function (direction) {
            console.log('You have scrolled to a thing3 ' + direction)
            if(direction === 'down') {
                anim2.goToAndStop(0);
                $('#scrollOn').removeClass('show');
            }
        },
        offset: '50%'
    })
});




/***************************************************************************/

//bodymovin stuff
var anim2Data = {
    wrapper: document.getElementById('bodymovin2'),
    animType: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    frameRate: 120,
    path: 'bodymovin/data.json'
};


var anim3Data = {
    wrapper: document.getElementById('bodymovin3'),
    animType: 'html',
    loop: false,
    prerender: true,
    autoplay: false,
    path: 'bodymovin/data.json'
};


var anim2 = bodymovin.loadAnimation(anim2Data);

anim2.addEventListener("complete", function completeHandler() {
    console.log('complete');
    $('#scrollOn').addClass('show');
    $('body').removeClass('stop-scrolling');
    $('body').unbind('touchmove');
});


var anim3 = bodymovin.loadAnimation(anim3Data);

container = document.getElementById('bodymovin3');
contentid = document.getElementById('thing3');
//window.onresize = anim.resize.bind(anim);

animLoaded();

function animLoaded() {
    if (!anim3.isLoaded) {
        setTimeout("animLoaded();", 1000);
        return;
    } else {
        attachScroll(anim3, contentid, 50);
    }
}

function attachScroll(anim, contentid, speed) {
    var val = 0,
        totalDuration = anim.totalFrames/anim.frameRate*1000;
    console.log('total duration:' + totalDuration)

    if (contentid.addEventListener) {
        contentid.addEventListener("mousewheel", MouseWheelHandler, false);
        contentid.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
    else {
        contentid.attachEvent("onmousewheel", MouseWheelHandler);
    }

    function MouseWheelHandler(e) {
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta < 0) {
            if (val < totalDuration) {
                val += (Math.abs(delta))*speed;
            }
        }else {
            if (val > 0) {
                val -= (Math.abs(delta))*speed;
            }
        }
        anim.goToAndStop(val*2);  //sensitivity factor
    }
}
/*
 $(window).scroll(function() {
 // calculate the percentage the user has scrolled down the page
 var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

 console.log(scrollPercent)
 });
 */