function lighterStart(timer_show, mod, colors, times, blinks) {

    function findIColor(type) {
        var iNext = 0;
        colors.forEach(function (e, i) {
            if (e == type) {
                iNext = i;
            }
        });
        return iNext;
    }

    function getNext(type) {
        var iNext = findIColor(type) + 1;
        if (iNext > colors.length - 1) iNext = 0;
        return colors[iNext];
    }

    function getTime(type) {
        return times[findIColor(type)];
    }


    function whatHappening(type) {
        $('#lighter' + mod + ' div').removeClass(colors.join(' ')).addClass('grey');
        type.split(' ').forEach(function (e) {
            $('#' + e + mod).removeClass('grey').addClass(e);
        });
    }

    function blink_me(type) {
        var dont_blink;
        var blink = true;
        dont_blink = setInterval(function () {
            $('#' + type + mod).removeClass(type).addClass('grey');
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
                whatHappening(type);
                timer_show.html(s);
                s--;
            }
        }, 1000);
    }

    timer_show.html(times[0]);
    whatHappening(colors[0]);
    setTimer(colors[0], times[0]);
}

$(document).ready(function(){
    //lighterStart($('#my_timer'), '', ['red green'], [1], [{type: 'green', s: 3}]);
    lighterStart($('#my_timer'), '', ['red', 'yellow red', 'green'], [10, 2, 15], [{type: 'green', s: 3}]);
});