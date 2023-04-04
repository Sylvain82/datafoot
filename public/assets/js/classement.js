
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
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${championnat}`, options)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const tbody = document.querySelector('#classements tbody');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            for (i = 0;  json.response.length; i++) {
            let tr = document.createElement('tr');

                let textNode = [
                    document.createTextNode(json.response[0].league.standings[0][i].team.name),
                    document.createTextNode(json.response[0].league.standings[0][i].points),

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
        })
}
