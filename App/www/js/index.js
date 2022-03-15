
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    var APIKEY_CP = "9ed284617343af884ee6eaacd72866f4";

    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' );
        ajaxGet();
    };
    
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    function ajaxGet(){
        let req = new XMLHttpRequest();
        req.open("GET", "https://opendata.reseaux-energies.fr/api/records/1.0/search/?dataset=bornes-irve&q=Valenciennes", false);
        req.send();

        if(req.status == 200){
            //console.log(req.response);
            console.log("requete ok");
        }else{
            console.log("Erreur");
        }

        let reponse = JSON.parse(req.response);
        //console.log(reponse);

        let contenu = reponse.records;
        //console.log(contenu);

        contenu.forEach(element => {
            //console.log(element);
            document.getElementById("prix").textContent = "Prix: " + element.fields.acces_recharge;
            document.getElementById("horraire").textContent = "Horraires: " + element.fields.accessibilite;
            document.getElementById("address").textContent = "Adresse: " + element.fields.ad_station;
            document.getElementById("pMax").textContent = "Puissance Maximale: " + element.fields.puiss_max;
            document.getElementById("prise").textContent = "Type de Prises: " + element.fields.type_prise;
        });
    }

    var btn = document.getElementById('search');
    var city = "";

    btn.onclick = function(){
        console.log('clicker');

        city = document.getElementById('city').value;

        console.log(city);

        borne_ville();
    }

    /*function borne_ville(){
        var urlLink = window.location.href;
        var url = new URL(urlLink);
        var city = url.searchParams.get("city");

        console.log(city);

        var queryString = "https://opendata.reseaux-energies.fr/api/records/1.0/search/?dataset=bornes-irve&q="+city;

        console.log(queryString);

        ajaxGet(queryString, function(reponse){
            var info = JSON.parse(reponse);
            console.log(info);
        });
    }*/
}
