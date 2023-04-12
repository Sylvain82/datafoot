
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
            const tbody = document.querySelector('#classements tbody');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            for (i = 0;  json.response.length; i++) {

                let tr = document.createElement('tr');

                let textNode = [

                    document.createTextNode(i+1),
                    document.createTextNode(json.response[0].league.standings[0][i].team.name),
                    document.createTextNode(json.response[0].league.standings[0][i].points),
                    document.createTextNode(json.response[0].league.standings[0][i].all.played),
                    document.createTextNode(json.response[0].league.standings[0][i].all.win),
                    document.createTextNode(json.response[0].league.standings[0][i].all.draw),
                    document.createTextNode(json.response[0].league.standings[0][i].all.lose),
                    document.createTextNode(json.response[0].league.standings[0][i].all.goals.for),
                    document.createTextNode(json.response[0].league.standings[0][i].all.goals.against),
                    document.createTextNode(json.response[0].league.standings[0][i].form),

                ]
                for (let text of textNode) {
                    td = document.createElement('td');

                    if (json.response[0].league.standings[0][i].description === "Promotion - Champions League (Group Stage: )"
                    )
                    {
                        td.style.color = "#0CF5E4"
                    }else{
                        td.style.color = "#F97168"

                    }

                    if (json.response[0].league.standings[0][i].description === "Promotion - Champions League (Qualification: )")
                    {
                        td.style.color = "#50A0F0"
                    }

                    if (json.response[0].league.standings[0][i].description === "Promotion - Europa League (Group Stage: )")
                    {
                        td.style.color = "#8F3DF3"
                    }

                    if (json.response[0].league.standings[0][i].description === "Promotion - Europa Conference League (Qualification: )")
                    {
                        td.style.color = "#B0789B"
                    }

                    if (json.response[0].league.standings[0][i].description == null)
                    {
                        td.style.color = "#FFFFFF"
                    }

                    // let str = json.response[0].league.standings[0][i].description;
                    // // if (str.indexOf("Relegation") !== -1)
                    // {
                    //     td.style.color = "#FFFFFF"
                    // }


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