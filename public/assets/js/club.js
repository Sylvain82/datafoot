const name = document.getElementById('name')
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

            let naissance = document.createElement("p")
            naissance.innerText = json.response[0].team.founded;
            name.appendChild(naissance)

            let photo = document.createElement('img');
            photo.setAttribute("id","photostade")
            photo.src = json.response[0].venue.image;
            name.appendChild(photo);

           })

        .catch(err => console.error(err));


}

}