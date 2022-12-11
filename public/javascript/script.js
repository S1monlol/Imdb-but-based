// get current page url query string
console.log("test")
let query = window.location.search.substring(1);
if (query.length != 0) {


  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/search?s="' + query + '"');
  xhr.onload = function () {
    if (xhr.responseText.startsWith("Error")) {
      let h1 = document.createElement('h1');
      h1.innerHTML = 'An Error Accoured (╯°□°）╯︵ ┻━┻ <br>' + xhr.responseText.replace("Error", '');
      h1.id = "error";
      document.body.appendChild(h1);

    } else {
      data = JSON.parse(xhr.responseText);
      console.log(data);

      ;

      for (let i = 0; i < data.d.length; i++) {

        if (data.d[i].i) {

          

          let mainDiv = document.createElement('div');
          mainDiv.className = 'result ' + data.d[i].q;
          mainDiv.onclick = function () {
            window.location.href = '/result/' + data.d[i].id;
          }


          let textDiv = document.createElement('div')
          textDiv.className = 'textDiv';

          let h1 = document.createElement('h1');
          h1.innerHTML = data.d[i].l;
          h1.id = data.d[i].id;


          let img = document.createElement('div');
          img.style.backgroundImage = "url(" + data.d[i].i.imageUrl + ")";
          img.className = "image";
          mainDiv.appendChild(img);






          
          mainDiv.appendChild(textDiv);
          textDiv.appendChild(h1);


          switch (data.d[i].id.substring(0, 2)) {
            case 'nm':
              if (document.getElementById("actor") == null) {
                let actor = document.createElement("div");
                actor.id = "actor";

                var grid = document.createElement("div");
                grid.className = "grid-container";


                let h2 = document.createElement('h2');
                h2.className = 'devider'


                h2.innerHTML = "People";

                actor.appendChild(h2);
                actor.appendChild(grid);
                grid.appendChild(mainDiv);
                document.body.appendChild(actor);
              }

              grid.appendChild(mainDiv);

              break;



            case 'tt':

              let h2 = document.createElement('h2');
              h2.className = "devider";

              switch (data.d[i].q) {
                case "feature":
                  if (document.getElementById("feature") == null) {

                    let feature = document.createElement("div");
                    feature.id = "feature";

                    var grid = document.createElement("div");
                    grid.className = "grid-container";


                    h2.innerHTML = "Movies";

                    feature.appendChild(h2);
                    feature.appendChild(grid);
                    grid.appendChild(mainDiv);
                    document.body.appendChild(feature);
                  }

                  grid.appendChild(mainDiv);
                  break;

                
                case "TV short":
                case "TV mini-series":
                case "TV series":
                  if (document.getElementById("tv") == null) {
                    let tv = document.createElement("div");
                    tv.id = "tv";

                    var grid = document.createElement("div");
                    grid.className = "grid-container";



                    h2.innerHTML = "TV Series / Short";

                    tv.appendChild(h2);
                    tv.appendChild(grid);
                    grid.appendChild(mainDiv);
                    document.body.appendChild(tv);

                  }

                  grid.appendChild(mainDiv);
                  break;

                case "video game":
                  if (document.getElementById("game") == null) {
                    let game = document.createElement("div");
                    game.id = "game";

                    var grid = document.createElement("div");
                    grid.className = "grid-container";

                    h2.innerHTML = "Video Games";




                    game.appendChild(h2);
                    game.appendChild(grid);
                    grid.appendChild(mainDiv);
                    document.body.appendChild(game);
                  }
                  grid.appendChild(mainDiv);
                  break;

                default:
                  if (document.getElementById("other") == null) {
                    let other = document.createElement("div");
                    other.id = "other";

                    var grid = document.createElement("div");
                    grid.className = "grid-container";

                    h2.innerHTML = "Other";


                    other.appendChild(h2);
                    other.appendChild(grid);
                    grid.appendChild(mainDiv);
                    document.body.appendChild(other);
                  }
                  grid.appendChild(mainDiv);
                  break;

              }

              break;

          }
        }
        console.log("Done")
      }
    }


  };
  xhr.send();

}




