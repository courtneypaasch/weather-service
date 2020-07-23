var cities = []
var city = localStorage.getItem('last search');

init();


$("document").ready(function () {



    $("#search").on("click", function (event) {
        event.preventDefault();

        var city = $("#cityInput").val();
        localStorage.setItem('last search', city);
        console.log(city);

        saveSearch();
        addCard(city);
        addFiveDay(city);

            $(".list-group-item").on("click", function (event) {
                var city = $(this).attr('id');
                console.log('clicked!');
                addCard(city);
                addFiveDay(city);
            })

    })

    $(".list-group-item").on("click", function (event) {
        var city = $(this).attr('id');
        console.log('clicked!');
        addCard(city);
        addFiveDay(city);

    })

})

function init() {
    var savedSearches = localStorage.getItem("searchHistory");
    if (!savedSearches || savedSearches === null) {
        return;
    } else {
        cities = JSON.parse(savedSearches);
        addCard(city);
        addFiveDay(city);
    }

    renderCities();
}

function saveSearch() {
    var localCities = cities;
    var newCity = (localStorage.getItem('last search'));

    localCities.push(localStorage.getItem('last search'));
    localStorage.setItem("searchHistory", JSON.stringify(localCities));
    $(".city-list").prepend($("<li class='list-group-item' id='" + localStorage.getItem('last search') + "'>" + localStorage.getItem('last search') + "</li>"));




}

function renderCities() {
    $(".city-list").empty();
    var localCities = cities;

    for (i = 0; i < localCities.length; i++) {
        var set = localCities[i]
        $(".city-list").prepend($("<li id='" + set + "' class='list-group-item'>" + set + "</li>"));
    }

}

function setIconCard(city) {
    $.ajax({
        url: "HTTPS://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a66005cdeed278c7401c80000cda18a8",
        method: "GET",
    }).then(function (response) {
        console.log(response);

        var weather = response.weather[0].main;
        var icon = response.weather[0].icon;

        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        var url = $("<img src='" + iconurl + "'></img>");
        console.log(weather);
        console.log(icon);

        $(".intro").append(url);
    })
}

function setIconFiveDay(city, arrayNav) {
    var arrayNav = arrayNav
    $.ajax({
        url: "HTTPS://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a66005cdeed278c7401c80000cda18a8",
        method: "GET",
    }).then(function (response) {
        console.log(response);
        console.log(city);
        console.log(arrayNav);
        var weather = (response.list[arrayNav].weather[0].icon)
        var icon = response.list[arrayNav].weather[0].icon;

        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        var url = $("<img src='" + iconurl + "'></img>");
        console.log(weather);
        console.log(icon);

        $(".icon"+arrayNav).append(url);
    })
}

function addCard(city) {

    $.ajax({
        url: "HTTPS://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a66005cdeed278c7401c80000cda18a8",
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $("#citySearched").empty();

        var weatherCard = $("<div>");
        weatherCard.addClass("card");

        var cardBody = $("<div>");
        cardBody.addClass("card-body");

 

        weatherCard.append(cardBody);
        $("#citySearched").append(weatherCard);

        $(".card-body").append("<h2 class='intro'>" + city + " (" + setDate() + ")</h2><hr>");
        setIconCard(city);
        $(".card-body").append("<div>Temperature: " + Math.floor((9 / 5) * (response.main.temp) - 459.67) + "°F</div><br>");
        $(".card-body").append("<div>Humidity: " + response.main.humidity + "%</div><br>");
        $(".card-body").append("<div>Wind Speed: " + response.wind.speed + "</div><br>");

        $.ajax({
            url: "HTTPS://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=a66005cdeed278c7401c80000cda18a8",
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


    })

}

function addFiveDay(city) {

    $.ajax({
        url: "HTTPS://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a66005cdeed278c7401c80000cda18a8",
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $("#citySearched").append($("<h3>5-Day Forecast</h3>"));
        var newRow = $("<div class='new row'></div>");
        $("#citySearched").append(newRow);

        var arrayNav = 3;

        for (i = 0; i < 5; i++) {


            var dayCast = $("<div>");
            dayCast.addClass("card  fiveDay col-2 index" + i);

            var today = moment();
            var tomorrow = today.add((i + 1), 'days')
            var fiveCardBody = $("<div>" + moment(tomorrow).format("MM/DD/YYYY") + "</div><hr>");
            fiveCardBody.addClass("five-card-body");




            dayCast.append(fiveCardBody);
            $(dayCast).append("<div class='icon" +arrayNav+ "'></div><br>");
            (setIconFiveDay(city, arrayNav));
            $(dayCast).append("<div>Temp: " + Math.floor((9 / 5) * (response.list[arrayNav].main.temp) - 459.67) + "°F</div><br>");
            $(dayCast).append("<div>Humidity: " + response.list[arrayNav].main.humidity + "%</div><br>");
            $(".new").append(dayCast);

            arrayNav += 8;
        }
    })

}

function setDate() {
    var date = moment().format('l');
    return date;

}

