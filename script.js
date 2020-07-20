$("document").ready(function () {

    $("#search").on("click", function (event) {
        event.preventDefault();

        var city = $("#cityInput").val();
        console.log(city);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a66005cdeed278c7401c80000cda18a8",
            method: "GET",
        }).then(function (response) {
            console.log(response);
            addCard();


            function addCard() {
                $("#citySearched").empty();

                var weatherCard = $("<div>");
                weatherCard.addClass("card");

                var cardBody = $("<div>");
                cardBody.addClass("card-body");

                weatherCard.append(cardBody);
                $("#citySearched").append(weatherCard);

                $(".card-body").append("<h2>" + city + " (" + setDate() + ")</h2><hr>");
                $(".card-body").append("<div>Temperature: " + Math.floor((9 / 5) * (response.main.temp) - 459.67) + "°F</div><br>");
                $(".card-body").append("<div>Humidity: " + response.main.humidity + "%</div><br>");
                $(".card-body").append("<div>Wind Speed: " + response.wind.speed + "</div><br>");

                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=a66005cdeed278c7401c80000cda18a8",
                    method: "GET",
                }).then(function (res) {
                    console.log(res);
                    if (res.value <= 3) {
                        var color = "uvlow";
                    } else if (res.value > 3 && res.value <= 6) {
                        var color = "uvmod";
                    } else if (res.value > 6) {
                        var color = "uvhigh";
                    }
                    $(".card-body").append("<div>UV Index: <span class='" + color + "'>" + res.value + "</span></div><br>");
                })


            }

        })


        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a66005cdeed278c7401c80000cda18a8",
            method: "GET",
        }).then(function (response) {
            console.log(response);
            addFiveDay();


            function addFiveDay() {
                $("#citySearched").append($("<h3>5-Day Forecast</h3>"));
                var newRow = $("<div class='new row'></div>");
                $("#citySearched").append(newRow);

                var arrayNav = 3;

                for (i = 0; i < 5; i++) {
                    

                    var dayCast = $("<div>");
                    dayCast.addClass("card  fiveDay col-2 index" +i);

                    var today = moment();
                    var tomorrow = today.add((i + 1), 'days')
                    var fiveCardBody = $("<div>" + moment(tomorrow).format("MM/DD/YYYY") + "</div><hr>");
                    fiveCardBody.addClass("five-card-body");

                   

                    
                    dayCast.append(fiveCardBody );
                    $(dayCast).append("<div>Temp: " + Math.floor((9 / 5) * (response.list[arrayNav].main.temp) - 459.67) + "°F</div><br>");
                    $(dayCast).append("<div>Humidity: " + response.list[arrayNav].main.humidity + "%</div><br>");
                    $(".new").append(dayCast);

                    console.log(Math.floor((9 / 5) * (response.list[arrayNav].main.temp) - 459.67));
                    console.log(response.list[arrayNav].main.humidity);




                    arrayNav+=8;
                }
            }

        })


        function setDate() {
            var date = moment().format('l');
            return date;

        }


    })
})

