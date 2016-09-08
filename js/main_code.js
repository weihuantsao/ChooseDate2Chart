//init
var js_createChart;


var st = "20130426161929024";
var st_time = "";
var en_time = "";


//time format function
function long2date(string_date) {
    var time_format_pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})/;
    var dt = new Date(string_date.replace(time_format_pattern, '$1-$2-$3 $4:$5:$6.$7'));
    return dt;
}
//console.log(long2date(st));

function date2long(input_date) {
    //inner function
    function addZero(x, n) {
        while (x.toString().length < n) {
            x = "0" + x;
        }
        return x;
    }
    var long_data = "" + addZero(input_date.getFullYear(), 4);
    var long_data = long_data + addZero((input_date.getMonth() + 1), 2);
    var long_data = long_data + addZero((input_date.getDate()), 2);
    var long_data = long_data + addZero((input_date.getHours()), 2);
    var long_data = long_data + addZero((input_date.getMinutes()), 2);
    var long_data = long_data + addZero((input_date.getSeconds()), 2);
    var long_data = long_data + addZero((input_date.getMilliseconds()), 3);
    return long_data;
}
//console.log(date2long(long2date(st)));

function long2chartformat(input_date) {
    var dt = long2date(input_date).getTime();
    return dt
}
//console.log(long2chartformat("20130426161929024"));

function inputDate2date(indate,intime) {
    dt = new Date(indate+"T"+intime);
    return dt
}

//calendar choose function
$(function() {
    var dateFormat = "yy-mm-dd",
        from = $("#from_date")
        .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            numberOfMonths: 2
        })
        .on("change", function() {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $("#to_date").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            numberOfMonths: 2
        })
        .on("change", function() {
            from.datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
});

var chart_data = [
    [1472797800000, 24],
    [1472798100000, 41],
    [1472798400000, 61],
    [1472798700000, 86],
    [1472799000000, 110],
    [1472799300000, 131],
    [1472799600000, 141],
    [1472799900000, 148],
    [1472800200000, 154],
    [1472800500000, 165],
    [1472800800000, 185],
    [1472801100000, 139],
    [1472801400000, 164],
    [1472801700000, 167],
    [1472802000000, 218],
    [1472802300000, 187],
    [1472802600000, 202],
    [1472802900000, 238],
    [1472803200000, 241],
    [1472803500000, 250],
    [1472803800000, 253],
    [1472804100000, 254],
    [1472804400000, 262]
];


$(function() {
    js_createChart = function createChart() {
        $('#daily-chart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Power generation'
            },
            colors: ['#B4C7DA', '#153E7E', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Watt'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} Watt</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.0,
                    groupPadding: 0.5,
                    borderWidth: 0,
                    pointWidth: 5
                }
            },
            series: [{
                name: 'Power Consumption',
                data: chart_data
            }]
        });
    }
});
