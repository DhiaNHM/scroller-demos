/**
 * Created by dhis on 15/03/2018.
 */

$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '', '', 'bodymovin'],
        sectionsColor: ['#0b233f', '#0b233f', '#0b233f'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: [],
        afterLoad: function (anchorLink, index) {
            // $('#introPanel').toggleClass('hide');
            console.log("after Load  " + index);
            //$('#callbacksDiv').append('<p>afterLoad - anchorLink:' + anchorLink + " index:" + index + '</p>');
            //deleteLog = true;
            console.log('===============');
            console.log("afterLoad--" + "anchorLink: " + anchorLink + " index: " + index);

        },
        onLeave: function (index, nextIndex, direction) {
            $('#introPanel').addClass('hide');

            var title = $('.section').eq(nextIndex-1).data('section-title');
            var caption = $('.section').eq(nextIndex-1).data('section-caption');


            setTimeout(function() {
                $('#introPanel h1').html(title);
                $('#introPanel p').html(caption);
                $('#introPanel').removeClass('hide');
            }, 350);

            //if(deleteLog){
            //$('#callbacksDiv').html('');
            //}
            //$('#callbacksDiv').append('<p>onLeave - index:' + index + ' nextIndex:' + nextIndex + ' direction:' + direction + '</p>')
            console.log("onLeave--" + "index: " + index + " nextIndex: " + nextIndex + " direction: " + direction);

        }
    });
});

