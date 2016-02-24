var map;
var infowindow;
var service;
var defaultLocation;
var gResults = [];
var savedLocations = [];
var markersArr = [];


//Initialize map
//Prompts user for current location, otherwise defaults to SF
function initMap() {
    defaultLocation = {
        lat: 37.7577,
        lng: -122.4376
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 12
    });

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infowindow.setPosition(pos);
            infowindow.setContent('Location found.');
            map.setCenter(pos);
        })
    }

    //Checks if saved locations exist via localStorage
    if (localStorage["saved"]) {
        savedLocations = JSON.parse(localStorage["saved"]);
        for (var i = 0; i < savedLocations.length; i++) {
            $("#savedList").append("<li><div id='listItemSaved'>" + savedLocations[i].name + "<br>" + savedLocations[i].formatted_address + "</div></li>");
        }
    }
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        gResults = results;
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            $("#locationList").append("<li><div id='listItem'>" + results[i].name + "<br>" + results[i].formatted_address + "</div><button onclick='save(" + i + ")' class='save' id=" + i + ">Save</button></li>");
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    markersArr.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function clearMarkers() {
    for (var i = 0; i < markersArr.length; i++) {
        markersArr[i].setMap(null);
    }
    markersArr.length = 0;
}

//### SEARCH ###
function search(value) {
    service.textSearch({
        query: value,
        location: defaultLocation,
        radius: 500
    }, callback);
}

$("#search").keypress(function(e) {
    if (e.which == 13) {
        $("#locationList").html("");
        $("#instruct").html("");
        search($("#search").val());
        $("#search").removeAttr("value");
    }
});

function hideSaved() {
    $("#savedList").hide();
    $("#locationList").show();
    $("#locationBtn").addClass("selected");
    $("#savedBtn").removeClass("selected");
    clearMarkers();
    for (var i = 0; i < gResults.length; i++) {
        createMarker(gResults[i]);
    }
}

function hideLocations() {
    $("#locationList").hide();
    $("#savedBtn").addClass("selected");
    $("#locationBtn").removeClass("selected");
    clearMarkers();
    $("#savedList").css("display", "inline-block");
    for (var i = 0; i < savedLocations.length; i++) {
        createMarker(savedLocations[i]);
    }
}

//### SAVE ###
function save(index) {
    savedLocations.push(gResults[index]);
    $("#" + index).html("<i class='icon-checkmark'></i>")
    $("#" + index).css("background-color", "#00B116");
    $("#" + index).css("color", "white");
    $("#" + index).removeAttr("onclick");
    $("#savedList").append("<li><div id='listItemSaved'>" + gResults[index].name + "<br>" + gResults[index].formatted_address + "</div></li>");
    localStorage["saved"] = JSON.stringify(savedLocations);
}