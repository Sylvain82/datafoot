const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
        'X-RapidAPI-Host': 'free-football-soccer-videos1.p.rapidapi.com'
    }
};

fetch('https://free-football-soccer-videos1.p.rapidapi.com/v1/', options)
    .then(response => response.json())
    .then(response => {

        console.log(response)



const tbody = document.querySelector('#ResumeTable tbody');

for (i=0 ; i<response.length; i++){

const lien = (response[i].url)

    let textNode = [
        document.createTextNode(response[i].title),
        document.createTextNode(response[i].competition.name),
        document.createTextNode(lien),

    ]

    let tr = document.createElement('tr');
    for (let text of textNode) {
        td = document.createElement('td');
        td.appendChild(text);
        tbody.appendChild(tr);
        tr.appendChild(td);

    }}

    })