$(document).ready(function () {
    // var teste
    // function teste(){
    //     alert($('#inputValor2').val());
    //     teste = $('#inputValor2').val();
    //     return $.get(teste);
    // }
    // console.log("teste", teste())


    var publicKey = "84176a028be87e10753e04eb3af73f45"
    var privateKey = "a343cf1548a66d334d41afe694402711d2513dad"
    var $status = $("#status");
    var thumb = 0

    var ts = Date.now();
    var hash = CryptoJS.MD5(ts + privateKey + publicKey);

    var url = 'http://gateway.marvel.com:80/v1/public/characters?limit=7&orderBy=name&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;

    $status.html("<h1>Carregando...</h1>");

    $.getJSON(url)
        .done(function (response) {

            var results = response.data.results;
            var resultsLen = results.length;
            var img = '/img/spide_man.jpg'
            if (resultsLen <= 0) {
                $status.html("<h1>Not Fount</h1>");
            } else {
                $status.html("");
                $("footer").removeClass("footer-min");                
                
                for (var i = 0; i < resultsLen; i++) {
                    var comic = results[i];
                    var image = comic.thumbnail.path + "." + comic.thumbnail.extension;
                    if (image != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                        thumb += 1;
                        
                        var content1 = [comic.name, image];
                        
                        $(".result").append("<article>" +
                            "<img src=" + content1[1] + " class='article-img' alt=''>" +
                            "<h1 class='article-title'>" + content1[0] + "</p>" +
                            "</article>")
                    }

                }
                if (thumb <= 3) {
                    $("footer").addClass("footer-min");
                }
            }
        });
});


