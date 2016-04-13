function lighterStart(timer_show, mod, colors, times, blinks) {

    function getNext(type) {
        type = type.split(' ')[0];
        var iNext = 0;
        colors.forEach(function (e, i) {
            if (e.split(' ')[0] == type) {
                iNext = i + 1;
            }
        });
        if (iNext > colors.length - 1) iNext = 0;
        return colors[iNext];
    }

    function getTime(type) {
        type = type.split(' ')[0];
        var iNext = 0;
        type = type.split(' ')[0];
        colors.forEach(function (e, i) {
            if (e.split(' ')[0] == type) {
                iNext = i;
            }
        });
        return times[iNext];
    }

    function whatHappening(type, blink) {
        $('#lighter' + mod + ' div').removeClass(colors.join(' ')).addClass('grey');
        type.split(' ').forEach(function (e) {
            if (blink) $('#' + e + mod).removeClass('grey').addClass(e);
        });
    }

    function blink_me(type) {
        var dont_blink;
        var blink = false;
        dont_blink = setInterval(function () {
            whatHappening(type, blink);
            blink = !blink;
            clearInterval(dont_blink);
        }, 500)
    }

    function setTimer(type, s) {
        var timer = setInterval(function () {
            blinks.forEach(function (e) {
                type.split(' ').forEach(function(t){
                    if (t == e.type && s <= e.s) {
                        blink_me(t);
                    }
                })
            });
            if (s <= 1) {
                clearInterval(timer);
                var next = getNext(type);
                setTimer(next, getTime(next));
            }
            if (s >= 1) {
                whatHappening(type, true);
                timer_show.html(s);
                s--;
            }
        }, 1000);
    }

    timer_show.html(times[0]);
    whatHappening(colors[0], true);
    setTimer(colors[0], times[0]);
}

$(document).ready(function(){
    lighterStart($('#my_timer'), '', ['red', 'yellow red', 'green'], [10, 2, 15], [{type: 'green', s: 3}]);
});