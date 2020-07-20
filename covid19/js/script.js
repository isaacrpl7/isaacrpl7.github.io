const info = document.querySelector('.info');
const states = document.querySelectorAll('a');
const stateH1 = document.querySelector('.state');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const suspects = document.querySelector('.suspects');

states.forEach(item => {
    item.addEventListener('click',event => {
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
    });
});