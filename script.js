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

                $(".card-body").append("<h2>" + city + " (" + setDate() + ")</h2><br>");
                $(".card-body").append("<div>Temperature: " + response.main.temp + "</div><br>");
                $(".card-body").append("<div>Humidity: " + response.main.humidity + "%</div><br>");
                $(".card-body").append("<div>Wind Speed: " + response.wind.speed + "</div><br>");

                var lat = response.coord.lat;
                var lon = response.coord.lon;

                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=a66005cdeed278c7401c80000cda18a8",
                    method: "GET",
                }).then(function (res) {
                    console.log(res);
                    $(".card-body").append("<div>UV Index: " + res.value + "</div><br>");
                })


            }

            function setDate() {
                var date = moment().format('l');
                return date;

            }




        })

    })
})

