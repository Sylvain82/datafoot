    const selectElement = document.querySelector('.selector');
    let championnat = document.getElementById('mySelect').value;
    loadChampionnat(championnat);
    selectElement.addEventListener('change', () => {
    championnat = document.getElementById('mySelect').value;
    //console.log(championnat);
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

        fetch(`https://api-football-beta.p.rapidapi.com/players/topscorers?season=2022&league=${championnat}`, options)

        .then(response => response.json())
        .then(json => {
            console.log(json);

            const tbody = document.querySelector('#topscorers tbody');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            for (i = 0; i < json.response.length; i++) {
                let tr = document.createElement('tr');

                let image = document.createElement('img');
                image.src = json.response[i].player.photo;
                td = document.createElement('td');
                td.appendChild(image);
                tbody.appendChild(tr);
                tr.appendChild(td);

                let buts = json.response[i].statistics[0].goals.total;

                let textNode = [
                    document.createTextNode(json.response[i].player.name),
                    document.createTextNode(json.response[i].statistics[0].team.name),
                    document.createTextNode(json.response[i].statistics[0].goals.total),
                    document.createTextNode(Math.round((buts) / (json.response[i].statistics[0].games.lineups) * 100) / 100),
                    document.createTextNode(json.response[i].statistics[0].games.lineups),
                    document.createTextNode(json.response[i].player.age),
                    document.createTextNode(json.response[i].player.height),
                    document.createTextNode(json.response[i].player.weight),
                    document.createTextNode(json.response[i].player.nationality),
                ]
                for (let text of textNode) {
                    td = document.createElement('td');
                    td.appendChild(text);
                    tbody.appendChild(tr);
                    tr.appendChild(td);
                }
            }
        })
        .catch(err => {
            console.error(err);
        })}
// }

