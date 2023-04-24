const name = document.getElementById('name')
const stats = document.getElementById('stats')
const selectElement = document.querySelector('.selector');
let championnat = document.getElementById('mySelect').value;
loadChampionnat(championnat);
selectElement.addEventListener('change', () => {
    championnat = document.getElementById('mySelect').value;
    while (name.firstChild) {
        name.removeChild(name.firstChild);
    }
    //console.log(championnat);
    loadChampionnat(championnat);
})
function loadChampionnat() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${championnat}`, options)
        .then(response => response.json())
        .then(json => {
                const select = document.getElementById('selectClub')
            while (name.firstChild) {
                name.removeChild(name.firstChild);
            }
            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }
            while (name.firstChild) {
                name.removeChild(name.firstChild);
            }
            for (i = 0;  json.response.length; i++) {
                // let arr = json.response[0].league.standings[0][i].team.name
                    let opt = document.createElement('option');
                    opt.value = json.response[0].league.standings[0][i].team.id;
                    opt.innerText =  json.response[0].league.standings[0][i].team.name
                    select.appendChild(opt)

            }

})

        .catch(err => {
            console.error(err);
        })


const selectClub = document.querySelector('.selectionClub');
let club = document.getElementById('selectClub').value;
loadclub(club);
selectClub.addEventListener('change', () => {
    while (name.firstChild) {
        name.removeChild(name.firstChild);
    }

    club = document.getElementById('selectClub').value;
    loadclub(club);
})
function loadclub(club){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };


    fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${club}`, options)
        .then(response => response.json())
        .then(json => {
                // let nom = json.response[0].team.name

                // name.removeChild();
            while (name.firstChild) {
                name.removeChild(name.firstChild);
            }

            let logo = document.createElement('img');
            logo.setAttribute("id","logoclub")
            logo.src = json.response[0].team.logo;
            name.appendChild(logo);

            let nom = document.createElement('p')
                nom.innerText =  json.response[0].team.name;
                name.appendChild(nom);

            let pays = document.createElement("p")
            pays.innerText = json.response[0].team.country;
            name.appendChild(pays)

            let stade = document.createElement("p")
            stade.innerText = json.response[0].venue.name;
            name.appendChild(stade)

            let places = document.createElement("p")
            places.innerText = `${json.response[0].venue.capacity} Places `;
            name.appendChild(places)

            let naissance = document.createElement("p")
            naissance.innerText = `Date de fondation : ${json.response[0].team.founded}`
            name.appendChild(naissance)

            let photo = document.createElement('img');
            photo.setAttribute("id","photostade")
            photo.src = json.response[0].venue.image;
            name.appendChild(photo);

           })


        .catch(err => console.error(err));


        fetch(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${championnat}&season=2022&team=${club}`, options)
        .then(response => response.json())
        .then(json => {
            console.log(json.response.league.name)
            while (stats.firstChild) {
                stats.removeChild(stats.firstChild);
            }

            let logoligue = document.createElement('img');
            logoligue.setAttribute("id","logoligue")
            logoligue.src = json.response.league.logo;
            stats.appendChild(logoligue);

            let liguename = document.createElement('p');
            liguename.innerText = `Championnat : ${json.response.league.name}`;
            stats.appendChild(liguename);

            let ligueseason = document.createElement('p');
            ligueseason.innerText =  `Saison : ${json.response.league.season}` ;
            stats.appendChild(ligueseason);

            let ligueform = document.createElement('p');
            ligueform.innerText = `Derniers résultats : ${json.response.form.match(/.{1,1}/g).slice( (json.response.form.match(/.{1,1}/g).length) -5 , json.response.form.match(/.{1,1}/g).length )}`;
            stats.appendChild(ligueform);
            console.log(json.response.form)

            let liguematchs = document.createElement('p');
            liguematchs.innerText = `Matchs joués : ${json.response.fixtures.played.total}` ;
            stats.appendChild(liguematchs);

            let liguewin = document.createElement('p');
            liguewin.innerText = `Victoires : ${json.response.fixtures.wins.total}` ;
            stats.appendChild(liguewin);

            let liguedraw = document.createElement('p');
            liguedraw.innerText = `Nuls : ${json.response.fixtures.draws.total}`;
            stats.appendChild(liguedraw);

            let ligueloses = document.createElement('p');
            ligueloses.innerText = `Défaites : ${json.response.fixtures.loses.total}`;
            stats.appendChild(ligueloses);
        });


    }

}
