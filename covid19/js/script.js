const info = document.querySelector('.info');
const states = document.querySelectorAll('a');
const stateH1 = document.querySelector('.state');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const suspects = document.querySelector('.suspects');
const ctx = document.getElementById('myChart');

//ADDING DATES TO THE ARRAY
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

let actualState;

states.forEach(item => {
    item.addEventListener('click',event => {
        actualState = item.id;
        fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${item.id}`)
            .then(response => response.json())
                .then(data => {
                    stateH1.innerHTML = data.state;
                    confirmed.innerHTML = data.cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    deaths.innerHTML = data.deaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    suspects.innerHTML = data.suspects.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    info.classList.remove('hide');
                    info.classList.add('visible');
                });
        
        //RETORNAR CASOS CONFIRMADOS
        async function getData(){
            let dataArr = new Array();
            let arrDays = new Array();
            let response = await fetch(`https://brasil.io/api/dataset/covid19/caso/data/?state=${actualState}&place_type=state`);
            let data = await response.json();
            dataArr = data.results.map(item => item.confirmed).reverse();
            arrDays = data.results.map(item => item.date).reverse();
            myChart.data.datasets[0].data = dataArr;
            myChart.data.labels = arrDays;
            myChart.update();
            console.log(dataArr,arrDays);
        }
        getData().catch(e => {console.log(e)});
        
    });
});

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: '',
        datasets: [{
            label: 'Confirmed cases',
            data: '',
            backgroundColor: 'rgba(55, 0, 179, 0.1)',
            borderColor: 'rgba(55, 0, 179, 1)',
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});