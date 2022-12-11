let subUrl = window.location.href.split('/');
subUrl = subUrl[subUrl.length - 1];

subUrl = subUrl.split('?')[0]


console.log(subUrl);
w = localStorage.getItem(subUrl);
if (w) {
    w = JSON.parse(w);

    console.log("Loading from cache: " + w);

    load(w);
} else {

    // make get request using fetch to 209.145.57.231:8085/token?token=
    fetch('/imdb?id=' + subUrl)
        .then(function (response) {
            return response.json();
        }
        ).then(function (json) {
            console.log(json);

            localStorage.setItem(subUrl, JSON.stringify(json));


            load(json);

        }
        ).catch(function (error) {
            console.log(error);
        }
        );
}

function load(data) {

    console.log(data);
    // hide element with id "loading"
    document.getElementById("loading").style.display = "none";
    document.getElementsByClassName("dot")[0].style.display = "block";
    document.getElementsByClassName("dot")[1].style.display = "block";
    document.getElementsByClassName("arrow")[0].style.display = "block";
    document.getElementById("title").innerHTML = data.Title;
    document.getElementById("plot").innerHTML = data.Plot;

    if (data.Director.split(",")[1]) {

        s = "s"

    } else {

        s = ""

    }

    document.getElementById("directors").innerHTML = "Director" + s + ": " + data.Director;
    document.getElementById("actors").innerHTML = "Actors: " + data.Actors;
    document.getElementById("date").innerHTML = data.Year;
    document.getElementById("rating").innerHTML = data.Rated;
    document.getElementById("poster").src = data.Poster;


    let hours = Math.floor(data.Runtime.split('m')[0] / 60);

    let mins = data.Runtime.split('m')[0] % 60


    let length = hours + 'h ' + mins + 'm'

    if (hours == 0) {
        length = length.split(' ',)[1]
    }
    console.log(length)
    document.getElementById("length").innerHTML = length.toString();




    // IMD ratings


    for (let i = 0; i < data.Ratings.length; i++) {

        switch (data.Ratings[i].Source) {

            // Same as IMDB rating

            // case "Internet Movie Database":

            // document.getElementById("IMD").style.display = "block";

            // document.getElementById("IMD_rating").innerHTML = data.Ratings[0].Value;
            // loading = "["
            // let x = data.Ratings[0].Value.split('/')[0] * 3


            // x = x.toFixed(1)
            // x = Number(Math.round(x))

            // console.log(x)


            // for (let i = 0; i < x; i++) {
            //     loading = loading + "█"
            //     console.log("added ")

            // }
            // for (let i = 0; i < 30 - x; i++) {
            //     loading = loading + "-"

            // }

            // loading += "]"

            // document.getElementById("IMD_bar").innerHTML = loading

            // console.log(loading)

            // break;

            case "Rotten Tomatoes":

                document.getElementById("RT").style.display = "block";

                document.getElementById("RT_rating").innerHTML = data.Ratings[i].Value.split('%')[0] / 10 + '/10';
                loading = "["

                y = data.Ratings[i].Value.split('%')[0]

                // y = y * 0.3

                y = y / 10

                y = y * 3

                // y = y.toFixed(1)
                y = Number(Math.round(y))


                console.log('y ' + y)

                for (let i = 0; i < y; i++) {
                    loading = loading + "█"

                }
                for (let i = 0; i < 30 - y; i++) {
                    loading = loading + "-"

                }


                loading += "]"

                document.getElementById("RT_bar").innerHTML = loading

                console.log(loading)

                break;

            case "Metacritic":

                if (data.Ratings.length <= 1) {

                    document.getElementById("MT").style.display = "block";
                }
                document.getElementById("MT_rating").innerHTML = data.Ratings[i].Value.split('/')[0] / 10 + '/10';
                loading = "["

                y = data.Ratings[i].Value.split('/')[0]

                // y = y * 0.3

                y = y / 10

                y = y * 3

                // y = y.toFixed(1)
                y = Number(Math.round(y))


                console.log('y ' + y)

                for (let i = 0; i < y; i++) {
                    loading = loading + "█"

                }
                for (let i = 0; i < 30 - y; i++) {
                    loading = loading + "-"

                }


                loading += "]"

                document.getElementById("MT_bar").innerHTML = loading

                console.log(loading)


                break;

        }




    }

    if (data.imdbRating) {

        if (data.Ratings.length <= 1) {

            document.getElementById("IMDB").style.display = "block";
        }
        document.getElementById("IMDB_rating").innerHTML = data.Ratings[0].Value;
        loading = "["
        let x = data.Ratings[0].Value.split('/')[0] * 3


        x = x.toFixed(1)
        x = Number(Math.round(x))

        console.log(x)


        for (let i = 0; i < x; i++) {
            loading = loading + "█"

        }
        for (let i = 0; i < 30 - x; i++) {
            loading = loading + "-"

        }

        loading += "]"

        document.getElementById("IMDB_bar").innerHTML = loading

        console.log(loading)


    }

    if (data.Ratings.length <= 1) {

        document.getElementById("arrow").style.display = "none"

    }

    
}


let flip = false
function showReviews() {

    data = JSON.parse(localStorage.getItem(subUrl))
    let w = document.getElementById("arrow")

    if (!flip) {
        w.style.transform = "rotate(180deg)"
        w.style.width = "15px"
        w.style.height = "40px"
        flip = true

        for (let i = 0; i < data.Ratings.length; i++) {

            switch (data.Ratings[i].Source) {
                case "Internet Movie Database":
                    document.getElementById("IMDB").style.display = "block";
                    break;

                case "Metacritic":
                    document.getElementById("MT").style.display = "block";
                    break;

            }
        }
    } else {

        w.style.transform = null
        w.style.width = null
        w.style.height = null
        flip = false

        document.getElementById("IMDB").style.display = "none";
        document.getElementById("MT").style.display = "none";

    }

}






