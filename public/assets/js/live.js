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
MyDateString = MyDate.toISOString().slice(0, 10)
// MyDateString = (MyDate.getFullYear()) + "-"
//     + ("0" + (MyDate.getMonth()) + 1) + "-"
//     + ("0" + MyDate.getDate()).slice(-2);


// *************************************************************

fetch(`https://api-football-beta.p.rapidapi.com/fixtures?date=${MyDateString}`, options)
    .then(response => response.json())
    .then(json => {
        console.log(json.response)

        const tbody = document.querySelector('#liveTable tbody');


        for (i = 0; i < json.response.length; i++) {
            if ((json.response[i].fixture.status.elapsed)) {

                // if (json.response[i].league.country === ("France")
                //     || (json.response[i].league.country === "Spain")
                //     || (json.response[i].league.country === "England")
                //     || (json.response[i].league.country === "Germany")
                //     || (json.response[i].league.country === "Italy")
                //     || (json.response[i].league.country === "Brazil")
                //     || (json.response[i].league.country === "Argentina")
                //     || (json.response[i].league.country === "Belgium")
                //     || (json.response[i].league.country === "Netherlands")
                //     || (json.response[i].league.country === "Portugal")
                // ) {
                // "135">Italia Serie A</option>
                // "88">Netherland Eredivisie</option>
                // "218">Austria Tipp3 Bundesliga</option>
                // "144">Belgium Jupiler Pro League</option>
                // "172">Bulgaria</option>
                // "210">Croatia Prva HNL</option>
                // "119">Danemark Superligaen</option>
                // "244">Finland Veikkausliiga</option>
                // "197">Greece Super League</option>
                // "271">Hungary NB I</option>
                // "104">Norway OBOS-ligaen</option>
                // "106">Poland Ekstraklasa</option>
                // "94">Portugal Primeira Liga</option>
                // "283">Romania Liga I</option>
                // "235">Russia Premier league</option>
                // "179">Scotland Premiership</option>
                // "113">Sweden Allsvenskan</option>

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

                    let temps = (json.response[i].fixture.status.elapsed)

                    let tr = document.createElement('tr');

                    let image1 = document.createElement('img');
                    image1.src = json.response[i].league.flag;
                    td = document.createElement('td');
                    td.appendChild(image1);
                    tbody.appendChild(tr);
                    tr.appendChild(td);


                    let image5 = document.createElement('img');
                    if (json.response[i].fixture.status.long !== ("Match Finished")) {
                        image5.src = "https://aniportalimages.s3.amazonaws.com/static/img/red-dot.gif";
                    } else {
                        image5.src = "../assets/images/ok.png";
                    }
                    td = document.createElement('td');
                    td.appendChild(image5);
                    tbody.appendChild(tr);
                    tr.appendChild(td);


                    let textNodeTemps = [
                        document.createTextNode(temps),
                    ]

                    let textNode1 = [
                        document.createTextNode(json.response[i].teams.home.name),
                    ]
                    let butH = (json.response[i].goals.home);
                    let butA = (json.response[i].goals.away);
                    let textNode2 = [

                        document.createTextNode(butH),
                        document.createTextNode(butA),

                    ]
                    let textNode3 = [
                        document.createTextNode(json.response[i].teams.away.name),
                    ]
                    if (json.response[i].fixture.status.long !== ("Match Finished")) {
                        for (let text of textNodeTemps) {
                            td = document.createElement('td');

                            td.appendChild(text);
                            tbody.appendChild(tr);
                            tr.appendChild(td);

                        }
                    } else {
                        for (let text of textNodeTemps) {
                            td = document.createElement('td');
                            text.nodeValue = 'FT'
                            td.style.color = "#00FF00";
                            td.appendChild(text);
                            tbody.appendChild(tr);
                            tr.appendChild(td);

                        }
                    }

                    let image3 = document.createElement('img');
                    image3.src = json.response[i].teams.home.logo;
                    td = document.createElement('td');
                    td.appendChild(image3);
                    tbody.appendChild(tr);
                    tr.appendChild(td);


                    for (let text of textNode1) {
                        td = document.createElement('td');
                        td.appendChild(text);
                        tbody.appendChild(tr);
                        tr.appendChild(td);
                    }
                    if (json.response[i].fixture.status.long !== ("Match Finished")) {
                        for (let text of textNode2) {
                            td = document.createElement('td');
                            td.appendChild(text);
                            td.style.color = '#00ffff'
                            tbody.appendChild(tr);
                            tr.appendChild(td);
                        }
                    } else {
                        for (let text of textNode2) {
                            td = document.createElement('td');
                            td.appendChild(text);
                            td.style.color = '#FFF'
                            tbody.appendChild(tr);
                            tr.appendChild(td);
                        }
                    }

                    for (let text of textNode3) {
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

                    let image2 = document.createElement('img');
                    image2.src = json.response[i].league.logo;
                    td = document.createElement('td');
                    td.appendChild(image2);
                    tbody.appendChild(tr);
                    tr.appendChild(td);

                }

            }
        }
    })

    .catch(err => {
        console.error(err);
    });

