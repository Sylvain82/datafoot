const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
    }
}
fetch(`https://api-football-beta.p.rapidapi.com/fixtures?date=2024-01-21`, options)
    .then(response => response.json())
    .then(json => {
        console.log(json.response)
        const tbody = document.querySelector('#betTable tbody');

        for (i = 0; i < json.response.length; i++) {

            if (
                json.response[i].league.id === 39
                || json.response[i].league.id === 40
                || json.response[i].league.id === 61
                || json.response[i].league.id === 62
                || json.response[i].league.id === 63
                || json.response[i].league.id === 78
                || json.response[i].league.id === 79
                || json.response[i].league.id === 88
                || json.response[i].league.id === 94
                || json.response[i].league.id === 129
                || json.response[i].league.id === 135
                || json.response[i].league.id === 140
                || json.response[i].league.id === 141
                || json.response[i].league.id === 144
                || json.response[i].league.id === 253
            ) {

                let tr = document.createElement('tr');

                let textNode = [
                    // document.createTextNode(json.response[i].fixture.id),
                    document.createTextNode(json.response[i].league.country ),
                    document.createTextNode(json.response[i].league.name),
                    document.createTextNode(json.response[i].league.round),
                    document.createTextNode(json.response[i].teams.home.name),
                    document.createTextNode(json.response[i].score.fulltime.home||0),
                    document.createTextNode(json.response[i].score.fulltime.away|| 0),
                    document.createTextNode(json.response[i].teams.away.name),

                ]

                for (let text of textNode) {
                    td = document.createElement('td');
                    td.appendChild(text);
                    tbody.appendChild(tr);
                    tr.appendChild(td);

                }
            }
        }
    })
