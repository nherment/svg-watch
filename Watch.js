function Watch(options) {

    function updateClock(){
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var milliseconds = now.getMilliseconds();
        hourHand.transform('r' + 30 * ( hours % 12  + minutes / 60 ) + ',100,100');
        minuteHand.transform('r' + 6 * ( minutes + seconds / 60 ) + ',100,100');

        var secondsAngle =  6 * (seconds + (milliseconds/1000))

        secondHand.transform('r' + secondsAngle + ',100,100');
    }

    var canvas = Raphael(options.target, 200, 200);
    var clock = canvas.circle(100, 100, 95);
    clock.attr({'fill':'transparent', 'stroke':'#3AB3EC', 'stroke-width': 2})
    var marker;

    var markers = 60
    for(var i = 0 ; i < markers ; i++) {

        var height = 8;
        var width = 1;
        if(i % 5 === 0) {
            height = 30;
            width = 1.2;
        }

        var startX = 100 + Math.round((95-height) * Math.cos(360 / markers * i * Math.PI / 180));
        var startY = 100 + Math.round((95-height) * Math.sin(360 / markers * i * Math.PI / 180));
        var endX = 100 + Math.round(95 * Math.cos(360 / markers * i * Math.PI / 180));
        var endY = 100 + Math.round(95 * Math.sin(360 / markers * i * Math.PI / 180));
        marker = canvas.path('M' + startX + ' ' + startY + 'L' + endX + ' ' + endY);
        marker.attr({stroke:'#3AB3EC', 'stroke-width': width});
    }

    var hourHandColor = '#12184D'
    var minuteHandColor = '#12184D'
    var secondHandColor = 'yellow'

    var hourHand = canvas.path('M100,100L98,100L98,45L100,40L102,45L102,100L100,100');
    hourHand.attr({stroke: hourHandColor, fill: hourHandColor, 'stroke-width': 1});

    var minuteHand = canvas.path('M100,100L99,100L99,25L100,17L101,25L101,100L100,100');
    minuteHand.attr({stroke: minuteHandColor, fill: minuteHandColor, 'stroke-width': 1});

    var secondHand = canvas.path('M100 115L100 10');
    secondHand.attr({stroke: secondHandColor, fill: secondHandColor, 'stroke-width': 2});

    var pin = canvas.circle(100, 100, 4);
    pin.attr('fill', secondHandColor);

    updateClock();
    setInterval(updateClock, 150); // 1000ms / 6 = 150ms --> ~6 movements per seconds

}