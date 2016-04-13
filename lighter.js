var colors = ['red', 'yellow red', 'green'];
var times = [2, 2, 4];

function getNext(type) {
    type = type.split(' ')[0];
    var iNext = 0;
    colors.forEach(function(e, i){
        if(e.split(' ')[0] == type) {
           iNext = i + 1;
        }
    });
    if(iNext > colors.length - 1) iNext = 0;
    return colors[iNext];
}

function getTime(type) {
    type = type.split(' ')[0];
    var iNext = 0;
    type = type.split(' ')[0];
    colors.forEach(function(e, i) {
        if(e.split(' ')[0] == type) {
            iNext = i;
        }
    });
    return times[iNext];
}

function whatHappening(type, clear, blink ) {
    if(clear) $('#lighter div').removeClass('green yellow red').addClass('grey');
    type.split(' ').forEach(function(e, i) {
        if(blink) $('#' + e).removeClass('grey').addClass(e);
    });
}

function myTimer(type, s){
    var not_yellow = true;
    var dont_blink;

    var timer = setInterval(function() {
        if (type == 'green' && s <= 3) {
            var blink = false;
            dont_blink = setInterval(function() {
                whatHappening(type, not_yellow, blink);
                blink = !blink;
                clearInterval(dont_blink);
            }, 500)
        }
        if(s <= 1) {
            clearInterval(timer);
            var next = getNext(type);
            myTimer(next, getTime(next));
        }
        if (s >= 1) {
            whatHappening(type, not_yellow, true);
            $('#my_timer').html(s);
            s--;
        }
    }, 1000);
}

$(document).ready(function(){
    $('#my_timer').html(getTime('red'));
    whatHappening('red', true, true);
    myTimer('red', getTime('red'));
});
