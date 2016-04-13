var colors = ['red', 'yellow red', 'green'];
var times = [4, 2, 4];
var blinks = [{type: 'green', s: 3}];

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

function whatHappening(type, blink ) {
    $('#lighter div').removeClass('green yellow red').addClass('grey');
    type.split(' ').forEach(function(e) {
        if(blink) $('#' + e).removeClass('grey').addClass(e);
    });
}

function blink_me(type) {
    var dont_blink;
    var blink = false;
    dont_blink = setInterval(function() {
        whatHappening(type, blink);
        blink = !blink;
        clearInterval(dont_blink);
    }, 500)
}

function setTimer(type, s){

    var timer = setInterval(function() {
        blinks.forEach(function(e){
            if (type == e.type && s <= e.s) {
                blink_me(type);
            }
        });

        if(s <= 1) {
            clearInterval(timer);
            var next = getNext(type);
            setTimer(next, getTime(next));
        }
        if (s >= 1) {
            whatHappening(type, true);
            $('#my_timer').html(s);
            s--;
        }
    }, 1000);
}

$(document).ready(function(){
    $('#my_timer').html(getTime('red'));
    whatHappening('red', true);
    setTimer('red', getTime('red'));
});
