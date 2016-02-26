// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        getAlbums();
        document.getElementById("facebookLogin").style.display = "none";
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        document.getElementById("facebookLogin").style.display = "inline";
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        document.getElementById("facebookLogin").style.display = "inline";
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '674310232706677',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use version 2.5
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// GET all photo albums
function getAlbums() {
    //FB will only load up to 100 at a time
    FB.api('/me?fields=albums.limit(100){name}', function(response) {
        for (var i = 0; i < response.albums.data.length; i++) {
            //WEIRDEST THING EVER:
            /*
            In the longer IDs that end with 115, it was ++ when passed through as a parameter to a function
            Had to stringify to keep from incrementing
            */

            $(".Albums").append("<div class='grid-item' onclick='getPhotos(\"" + response.albums.data[i].id + "\")'><img id='Album" + i + "'><p>" + response.albums.data[i].name + "</p></div>");
            // $(".Albums").append("<div class='grid-item inline' onclick='getPhotos(\"" + response.albums.data[i].id + "\")'><img id='Album" + i + "'>");


            getCoverPhoto(response.albums.data[i].id, i);

        };
    });
};


function getPhotos(album_ID) {
    //removes previous album images
    clearAlbums();
    clearPhotos();
    $("#controlsbox").show();
    $("h5").show();
    FB.api("/" + album_ID + '?fields=photos.limit(100){name, picture, created_time}', function(response) {
        for (var i = 0; i < response.photos.data.length; i++) {
            $("#photos").append("<img data-name=\"" + response.photos.data[i].name + "\" data-date='" + response.photos.data[i].created_time + "' src=" + response.photos.data[i].picture + ">");
        }
        //recursive pagination will continue to run so long as there are more photos in the album
        if (response.photos.paging.next) {
            pagination(response.photos.paging.next);
        }

    })
}

function getCoverPhoto(album_ID, index) {
    FB.api("/" + album_ID + "/picture", function(response) {
        $("#Album" + index).attr("src", response.data.url);
    });

};

function pagination(next) {
    $.getJSON(next, function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $("#photos").append("<img data-name=\"" + response.data[i].name + "\" data-date='" + response.data[i].created_time + "' src=" + response.data[i].picture + ">");
        }
        if (response.paging.next) {
            pagination(response.paging.next);
        }
    })
}

function sortImagesAscend(a, b) {
    //Standard JQuery sort function
    //compares two dates 
    if (new Date($(b).data('date')) < new Date($(a).data('date'))) {
        return 1;
    } else {
        return -1;
    }
}

function sortImagesDescend(a, b) {
    if (new Date($(b).data('date')) > new Date($(a).data('date'))) {
        return 1;
    } else {
        return -1;
    }
}

function ascendingOrder() {
    $("#photos img").sort(sortImagesAscend).appendTo("#photos")
}

function descendingOrder() {
    $("#photos img").sort(sortImagesDescend).appendTo("#photos")
}

function filter() {
    var filter = $(this).val()
        //loops through the images
    $("#photos img").each(function() {
        // If the image name does not contain the text in the input field, then fade out
        //RegExp is the JS regex handler, "i" makes the text case insensitive
        if ($(this).data("name").search(new RegExp(filter, "i")) < 0) {
            $(this).fadeOut();
            // Show the image if the text in the input field matches the image name
        } else {
            $(this).show();
        }
    });
}
//sets the event listenter on the input field
$("#search").keyup(filter)

function clearPhotos() {
    document.getElementById("photos").innerHTML = "";
}

function clearAlbums() {
    $("#masonry-grid").hide();
}

function displayAlbums() {
    $("#masonry-grid").show();
    $("h5").hide();
} 

function hideControls() {
    $("#controlsbox").hide();
}

setTimeout(function() {
var $container = jQuery("#masonry-grid");
$container.masonry({
   // columnWidth: 200,
   gutter: 20,
   itemSelector: ".grid-item"
})}, 3000);


