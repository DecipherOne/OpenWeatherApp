"use strict";

(function ClientFormHandler($)
{

    var currentWeatherDiv = null,
        submitWeatherButton = null,
        cityNameInput = null,
        first = true;


    function SetLocalReferences(callback)
    {
        currentWeatherDiv = $("#currentWeather"),
            submitWeatherButton = $("#submitWeatherQuery"),
            cityNameInput = $("#cityName");
        return callback();
    }

    $(document).ready(function()
    {
        SetLocalReferences(function ()
        {

            submitWeatherButton.on("click",function(e)
            {
                e.preventDefault();
                e.stopImmediatePropagation();

                if(cityNameInput.val()==="")
                {
                    currentWeatherDiv.html("Please enter in a city name to find todays weather.");
                    return;
                }

                currentWeatherDiv.html("Searching, Please Wait");
                SubmitWeatherQuery();

            });

        });
    });

    function SubmitWeatherQuery()
    {

        if(first)
            setTimeout(function(){
                SubmitWeatherQuery();
                first = false;
            },360);

        var cb = new Date().getMilliseconds();
        $.ajax({
            cache:false,
            url: "/weather?cityName=" + cityNameInput.val() +'&cb='+cb,
            success: function (response) {

                setTimeout(function(){
                    FormatResponseData(response,function(data){
                        currentWeatherDiv.html(data);
                        first = true;
                    });
                },1000);

            },
            error: function () {
                currentWeatherDiv.html("The City that you entered could not be found. Please try again.");
            }
        });
    }

    function FormatResponseData(response, callback)
    {
        var formattedData = '<table id="weatherDataTable">' +
            '<tr><td><b>Country :</b> ' + response.sys.country + '</td></tr>' +
            '<tr><td> City : '+ response.name +'</td></tr>'+
            '<tr><td><b>Description : <i>' + response.weather[0].description + '</i></b></td></tr>' +
            '<tr><td>Todays High : ' + response.main.temp_max +'f</td></tr>'+
            '<tr><td> Todays Low : ' + response.main.temp_min +'f</td></tr>'+
            '<tr><td> Wind :' + response.wind.speed + 'mph</td></tr></table>';

        return callback(formattedData);
    }


})(jQuery = window.jQuery || {});