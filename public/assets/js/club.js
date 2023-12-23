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
    loadChampionnat(championnat);
})

function loadChampionnat() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(`https://api-football-beta.p.rapidapi.com/teams?league=${championnat}&season=2023`, options)
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
            for (i = 0; json.response.length; i++) {
                // let arr = json.response[0].league.standings[0][i].team.name
                let opt = document.createElement('option');
                opt.value = json.response[i].team.id;
                opt.innerText = json.response[i].team.name
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

    function loadclub(club) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
                'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
            }
        };


        fetch(`https://api-football-beta.p.rapidapi.com/teams?id=${club}`, options)
            .then(response => response.json())
            .then(json => {
                console.log(json.response[0])

                while (name.firstChild) {
                    name.removeChild(name.firstChild);
                }

                let logo = document.createElement('img');
                logo.setAttribute("id", "logoclub")
                logo.src = json.response[0].team.logo;
                name.appendChild(logo);

                let nom = document.createElement('p')
                nom.innerText = json.response[0].team.name;
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
                photo.setAttribute("id", "photostade")
                photo.src = json.response[0].venue.image;
                name.appendChild(photo);

            })

            .catch(err => console.error(err));


        fetch(`https://api-football-beta.p.rapidapi.com/teams/statistics?league=${championnat}&season=2023&team=${club}`, options)
            .then(response => response.json())
            .then(json => {

                while (stats.firstChild) {
                    stats.removeChild(stats.firstChild);
                }

                let logoligue = document.createElement('img');
                logoligue.setAttribute("id", "logoligue")
                logoligue.src = json.response.league.logo;
                stats.appendChild(logoligue);

                let liguename = document.createElement('p');
                liguename.innerText = `Championnat : ${json.response.league.name}`;
                stats.appendChild(liguename);

                let ligueseason = document.createElement('p');
                ligueseason.innerText = `Saison : ${json.response.league.season}`;
                stats.appendChild(ligueseason);

                let ligueform = document.createElement('p');
                ligueform.innerText = `Derniers résultats : ${json.response.form.match(/.{1,1}/g).slice((json.response.form.match(/.{1,1}/g).length) - 5, json.response.form.match(/.{1,1}/g).length)}`;
                stats.appendChild(ligueform);

                let liguematchs = document.createElement('p');
                liguematchs.innerText = `Matchs joués : ${json.response.fixtures.played.total}`;
                stats.appendChild(liguematchs);

                let liguewin = document.createElement('p');
                liguewin.innerText = `Victoires : ${json.response.fixtures.wins.total}`;
                stats.appendChild(liguewin);

                let liguedraw = document.createElement('p');
                liguedraw.innerText = `Nuls : ${json.response.fixtures.draws.total}`;
                stats.appendChild(liguedraw);

                let ligueloses = document.createElement('p');
                ligueloses.innerText = `Défaites : ${json.response.fixtures.loses.total}`;
                stats.appendChild(ligueloses);

                let ButsTotal = document.createElement('p');
                ButsTotal.innerText = `Buts : ${json.response.goals.for.total.total}`;
                stats.appendChild(ButsTotal);


                let ButAverage = document.createElement('p');
                ButAverage.innerText = `Buts / match : ${(json.response.goals.for.average.total) || 0}`;
                stats.appendChild(ButAverage);

                let ButsEncTotal = document.createElement('p');
                ButsEncTotal.innerText = `Buts encaissés : ${(json.response.goals.against.total.total) || 0}`;
                stats.appendChild(ButsEncTotal);

                let ButEncAverage = document.createElement('p');
                ButEncAverage.innerText = `Buts encaissés / match : ${(json.response.against.for.average.total) || 0}`;
                stats.appendChild(ButEncAverage);


            });

        fetch(`https://api-football-beta.p.rapidapi.com/players?team=${club}&season=2023`, options)
            .then(response => response.json())
            .then(json => {

                const tbody = document.querySelector('#club tbody');
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }

                for (l = 0; l < json.response.length; l++) {
                    // if (json.response[l].statistics[0].games.appearences !== 0) {

                    let tr = document.createElement('tr');

                    let image = document.createElement('img');
                    image.src = json.response[l].player.photo;
                    td = document.createElement('td');
                    td.appendChild(image);
                    tbody.appendChild(tr);
                    tr.appendChild(td);

                    let textNode = [
                        document.createTextNode(json.response[l].statistics[0].league.name || 0),
                        document.createTextNode(json.response[l].player.firstname || 0),
                        document.createTextNode(json.response[l].player.lastname || 0),
                        document.createTextNode(json.response[l].player.nationality || 0),
                        document.createTextNode(json.response[l].player.age || 0),
                        document.createTextNode(json.response[l].player.height || 0),
                        document.createTextNode(json.response[l].player.weight || 0),
                        document.createTextNode(json.response[l].statistics[0].games.position || 0),
                        document.createTextNode(json.response[l].statistics[0].games.appearences || 0),
                        document.createTextNode(Math.round((json.response[l].statistics[0].games.rating) * 100) / 100),
                        document.createTextNode(json.response[l].statistics[0].goals.total || 0),
                        document.createTextNode(json.response[l].statistics[0].cards.yellow || 0),
                        document.createTextNode(json.response[l].statistics[0].cards.yellowred || 0),
                        document.createTextNode(json.response[l].statistics[0].cards.red || 0),

                    ]
                    for (let text of textNode) {
                        td = document.createElement('td');
                        td.appendChild(text);
                        tbody.appendChild(tr);
                        tr.appendChild(td);
                    }
                }
                // }

            })

        fetch(`https://api-football-beta.p.rapidapi.com/fixtures?last=1&team=${club}`, options)
            .then(response => response.json())
            .then(json => {

                const tbody3 = document.querySelector('#dateLastMatch tbody');
                let tr3 = document.createElement('tr');

                let textNode3 = [
                    // document.createTextNode(json.response[0].fixtures.timestamp),
                    document.createTextNode(json.response[0].league.name || 0),
                    document.createTextNode(json.response[0].league.round || 0),
                    document.createTextNode(json.response[0].fixture.venue.name || 0),
                    document.createTextNode(json.response[0].fixture.referee || 0),
                    document.createTextNode(json.response[0].teams.home.name || 0),
                    document.createTextNode(json.response[0].score.fulltime.home || 0),
                    document.createTextNode(json.response[0].score.fulltime.away || 0),
                    document.createTextNode(json.response[0].teams.away.name || 0),
                ]
                for (let text of textNode3) {

                    td3 = document.createElement('td');
                    td3.appendChild(text);
                    tbody3.appendChild(tr3);
                    tr3.appendChild(td3);
                }

                let lastmatch = json.response[0].fixture.id;
                loadlast(lastmatch);

            })

// LAST MATCH

        function loadlast(lastmatch) {

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
                    'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
                }
            };


            fetch(`https://api-football-beta.p.rapidapi.com/fixtures/players?fixture=${lastmatch}&team=${club}`, options)
                .then(response => response.json())
                .then(json => {
                        const tbody2 = document.querySelector('#statlastmatch tbody');
                        for (r = 0; r < json.response[0].players.length; r++) {
                            if (json.response[0].players[r].statistics[0].games.rating) {
                                let tr2 = document.createElement('tr');
                                let textNode2 = [
                                    document.createTextNode(json.response[0].players[r].player.name || 0),

                                ]

                                for (let text of textNode2) {
                                    td2 = document.createElement('td');
                                    td2.appendChild(text);
                                    tbody2.appendChild(tr2);
                                    tr2.appendChild(td2);
                                }
                                let textNode3 = [
                                    document.createTextNode(json.response[0].players[r].statistics[0].games.rating || 0),
                                ]

                                for (let text of textNode3) {
                                    td2 = document.createElement('td');
                                    td2.appendChild(text);
                                    td2.style.color = '#00FF00'
                                    tbody2.appendChild(tr2);
                                    tr2.appendChild(td2);
                                }
                                let textNode4 = [
                                    document.createTextNode(json.response[0].players[r].statistics[0].goals.total || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].goals.assists || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].dribbles.attempts || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].dribbles.past || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].dribbles.success || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].duels.total || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].duels.won || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].fouls.committed || 0),
                                    document.createTextNode(json.response[0].players[r].statistics[0].fouls.drawn || 0),
                                ]

                                for (let text of textNode4) {
                                    td2 = document.createElement('td');
                                    td2.appendChild(text);
                                    tbody2.appendChild(tr2);
                                    tr2.appendChild(td2);
                                }

                            }


                        }
                    }
                )
        }
    }
}
