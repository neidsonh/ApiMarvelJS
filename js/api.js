$(document).ready(function () {

    var publicKey = "84176a028be87e10753e04eb3af73f45"
    var privateKey = "a343cf1548a66d334d41afe694402711d2513dad"
    var $status = $("#status");

    var ts = Date.now();
    var hash = CryptoJS.MD5(ts + privateKey + publicKey);

    var url = 'http://gateway.marvel.com:80/v1/public/characters?limit=20&orderBy=name&name=iron&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;

    $status.html("<p>Carregando...</p>");

    $.getJSON(url)
        .done(function (response) {

            var results = response.data.results;
            var resultsLen = results.length;
            console.log("result", results.length)
            var img = '/img/spide_man.jpg'
            if (resultsLen <= 0) {
                $status.html("<h1>Not Fount</h1>");
            } else {
                $status.html("");

                for (var i = 0; i < resultsLen; i++) {
                    var comic = results[i];
                    var image = comic.thumbnail.path + "." + comic.thumbnail.extension;
                    if (image != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
                        
                        var content1 = [comic.name, image];
                        
                        $(".result").append("<div class='grid-item'>" +
                        "<img src=" + content1[1] + " class='thumb'>" +
                        "<p>" + content1[0] + "</p>" +
                        "</div>")
                    }

                }
            }
        });
});


// $(function () {
//     var publicKey = "84176a028be87e10753e04eb3af73f45"
//     var privateKey = "a343cf1548a66d334d41afe694402711d2513dad"

//     var ts = Date.now();
//     var hash = CryptoJS.MD5(ts + privateKey + publicKey);

//     var url = 'http://gateway.marvel.com:80/v1/public/comics?limit=20&format=comic&formatType=comic&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
//     // return $.get(url);
//     $.getJSON(url)
//         .done(function (response) {
//             var results = response.data.results;
//             var resultsLen = results.length;
//             var output = '<ul>';

//             for (var i = 0; i < resultsLen; i++) {
//                 if (results[i].images.length > 0) {
//                     var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
//                     output += '<li><img src="' + imgPath + '"><br>' + results[i].title + '</li>';
//                 }
//             }
//             output += '</ul>'
//             $('#results').append(output);
//         });

// });


