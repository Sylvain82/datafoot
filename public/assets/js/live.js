const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f8602f40b0mshda89fc84d2b8fd7p1d230ejsn0863e51df899',
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
    }
};
// *************************************************************
// DATE DU JOUR
const MyDate = new Date();
MyDateString = MyDate.toISOString().slice(0,10)
// MyDateString = (MyDate.getFullYear()) + "-"
//     + ("0" + (MyDate.getMonth()) + 1) + "-"
//     + ("0" + MyDate.getDate()).slice(-2);

console.log(MyDate.toISOString().slice(0,10))
console.log(MyDateString)

// *************************************************************

fetch(`https://api-football-beta.p.rapidapi.com/fixtures?date=${MyDateString}`, options)
    .then(response => response.json())
    .then(json => {
        console.log(json.response[0])

    const tbody = document.querySelector('#liveTable tbody');


        for (i=0 ; i<json.response.length; i++){
            if ((json.response[i].fixture.status.elapsed) && (json.response[i].fixture.status.long !== ("Match Finished"))) {

                 if (json.response[i].league.country === ("France") || (json.response[i].league.country === "Spain")  || (json.response[i].league.country === "England") || (json.response[i].league.country === "Germany") || (json.response[i].league.country === "Italy")) {

                      let temps = (json.response[i].fixture.status.elapsed)

    let textNode = [

    document.createTextNode(json.response[i].league.country),
    document.createTextNode(json.response[i].league.name),

    ]

    let textNodeTemps =[
    document.createTextNode(temps),

    ]

    let textNode1 = [
        document.createTextNode(json.response[i].teams.home.name),
        document.createTextNode(json.response[i].goals.home),
        document.createTextNode(json.response[i].goals.away),
        document.createTextNode(json.response[i].teams.away.name),
    ]

    let tr = document.createElement('tr');
    for (let text of textNode) {
    td = document.createElement('td');
    td.appendChild(text);
    tbody.appendChild(tr);
    tr.appendChild(td);
    }

    for (let text of textNodeTemps) {
    td = document.createElement('td');
    td.appendChild(text);
    tbody.appendChild(tr);

    if (temps > 89) {
    td.style.color = "#white";
    }else {
        td.style.color = "#00FF00";
    }

    tr.appendChild(td);

    }

        let image3 = document.createElement('img');
        image3.src = json.response[i].teams.home.logo;
        td = document.createElement('td');
        td.appendChild(image3);
        tbody.appendChild(tr);
        tr.appendChild(td);

    let tr1 = document.createElement('tr');
    for (let text of textNode1) {
    td = document.createElement('td');
    td.appendChild(text);
    tbody.appendChild(tr);
    tr.appendChild(td);
}
        let image4 = document.createElement('img');
        image4.src = json.response[i].teams.away.logo;
        td = document.createElement('td');
        td.appendChild(image4);
        tbody.appendChild(tr);
        tr.appendChild(td);

    let image1 = document.createElement('img');
    image1.src = json.response[i].league.flag;
    td = document.createElement('td');
    td.appendChild(image1);
    tbody.appendChild(tr);
    tr.appendChild(td);

    let image2 = document.createElement('img');
    image2.src = json.response[i].league.logo;
    td = document.createElement('td');
    td.appendChild(image2);
    tbody.appendChild(tr);
    tr.appendChild(td);

        }

    }}})

.catch(err => {
    console.error(err);
});

