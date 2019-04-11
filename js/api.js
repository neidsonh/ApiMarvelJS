$(document).ready(function () {

    var publicKey = "84176a028be87e10753e04eb3af73f45"
    var privateKey = "a343cf1548a66d334d41afe694402711d2513dad"

    var ts = Date.now();
    var hash = CryptoJS.MD5(ts + privateKey + publicKey);

    var url = 'http://gateway.marvel.com:80/v1/public/comics?limit=20&orderBy=title&format=comic&formatType=comic&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
    $.getJSON(url)
    .done(function (response) {
        
        var $status = $("#status");
        
        $status.html("");
        var results = response.data.results;
        var resultsLen = results.length;
        
        
        for (var i = 0; i < resultsLen; i++) {
            var comic = results[i];
            console.log("res", comic.images.length)

                var content1 = [comic.title, comic.prices[0].price, comic.thumbnail.path + "." + comic.thumbnail.extension];

                $(".title").append("<div class='grid-item'><img src=" + content1[2] +
                    " class='thumb'><br/>" + content1[0] +
                    "<br/>" + content1[1] + "</div>")

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


