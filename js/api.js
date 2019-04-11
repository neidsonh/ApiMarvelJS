$(document).ready(function () {

    var publicKey = "84176a028be87e10753e04eb3af73f45"
    var privateKey = "a343cf1548a66d334d41afe694402711d2513dad"

    function getComicData(year) {
        var ts = Date.now();
        var hash = CryptoJS.MD5(ts + privateKey + publicKey);

        var url = 'http://gateway.marvel.com:80/v1/public/comics?limit=20&format=comic&formatType=comic&dateRange=' + year + '-01-01%2C' + year + '-12-31&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash;
        console.log('getComicData(' + year + ')');
        return $.get(url);
    }

    $(document).ready(function () {

        var $status = $("#status");

        var start = 2019;
        var end = 2010;

        var promises = [];

        $status.html("<i>Carregando...</i>");

        for (var x = start; x >= end; x--) {
            promises.push(getComicData(x));
        }

        $.when.apply($, promises).done(function () {

            var args = Array.prototype.slice.call(arguments, 0);

            $status.html(""); 

            for (var x = 0; x < args.length; x++) {
                var year = start - x;
                console.log("Ano", year);
                var content = [year];

                var container = $(".year");

                container.append("<h1>" + year + "</h1><br/>");

                var res = args[x][0];

                if (res.code === 200) {
                    for (var i = 0; i < res.data.results.length; i++) {
                        var comic = res.data.results[i];

                        var content1 = [comic.title, comic.prices[0].price, comic.thumbnail.path + "." + comic.thumbnail.extension];

                        $(".title").append("<div class='grid-item'><img src=" + content1[2] +
                            " class='thumb'><br/>" + content1[0] +
                            "<br/>" + content1[1] + "</div>")

                    }
                }
            }
        });

    });
})