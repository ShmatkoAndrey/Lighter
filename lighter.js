var colors = ['red', 'green'];
//var times = [10, 2, 15];
var times = [5, 6];

function getNext(type) {
    var iNext = 0;
    colors.forEach(function(e, i){
        if(e == type) {
           iNext = i + 1;
        }
    });
    if(iNext > 1) iNext = 0;
    return colors[iNext];
}

function getTime(type) {
    var iNext = 0;
    colors.forEach(function(e, i) {
        if(e == type) {
            iNext = i;
        }
    });
    return times[iNext];
}

function whatHappening(type, clear) {
    if(clear) $('#lighter div').removeClass('green yellow red').addClass('grey');
    $('#' + type).removeClass('grey').addClass(type);
}

function myTimer(type, s){
    var not_yellow = true;
    var timer = setInterval(function() {
        if (type == 'red' && s <= 2) {
            not_yellow = false;
            whatHappening('yellow', not_yellow)
        }
        if(s <= 0) {
            clearInterval(timer);
            var next = getNext(type);
            myTimer(next, getTime(next));
        }
        if (s >= 0) {
            whatHappening(type, not_yellow);
            $('#my_timer').html(s);
            s--;
        }
    }, 1000);
}

$(document).ready(function(){
    $('#my_timer').html(getTime('red'));
    whatHappening('red', true);
    myTimer('red', getTime('red'));
});
