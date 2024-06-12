// import { users } from './variables.js';

console.log('🎬');

// Récupérer les données du json local
const response = await fetch("../data/senscritique.json");
const films = await response.json();
console.log(films);

let users = await fetch('../data/membres.json');
users = await users.json();

// console.log(films);
const allFilms = [...films]
const objectFilms = [];
allFilms.forEach(element => {
    objectFilms.push(JSON.stringify({
        id: element.id, 
        title: element.title,
        creator: element.creator,
        year: element.year,
        membre: element.membre,
        thmb : element.thmb,
        cover: element.cover
        }));
});

// console.log(objectFilms);

// const MANAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiJNVlkxSTFzVFlOUW9sOGxGekVsNjFmQXZudmgyIiwiaXNzIjoiaHR0cHM6Ly9qc29uc2lsby5jb20iLCJleHAiOjE3MjA2MDI5NzN9.U_Q8gQwv-M98x8P04NzViSOkG3b0Lr1d7YJiVFMQKlk"
// const API_KEY = "Mhon3NRA1XLaUvVsgm5LObyaSQWHrkJosnyBdzYURp"
// // Stocker les données locales sur Silo
// const url = "https://api.jsonsilo.com/public/e5815bd7-32e6-434a-96b5-2aef63af4670"

// const postData = async (url, objectFilms) => {
//     url = "https://api.jsonsilo.com/client/api/v1/manage/e5815bd7-32e6-434a-96b5-2aef63af4670"

//     const headers = {
//         "accept": "application/json",
//         "Content-Type": "application/json",
//         "X-MAN-API": MANAGE_KEY, 
//         "file_data": [
//                 {objectFilms}
//             ]        
//     };

//     fetch(url, {
//         method: 'PATCH', 
//         headers: headers
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch((error) => {
//         console.error('Erreur:', error);
//     });
// }

// // Récupérer les données de Silo

// const getData = async (url) => {

//     const headers = {
//         'accept': 'application/json',
//         'X-MAN-API': MANAGE_KEY,
//         'Content-Type': 'application/json',
//     };

//     fetch(url, {
//         method: 'GET', 
//         headers: headers
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch((error) => {
//         console.error('Erreur:', error);
//     });
// };
// console.log(getData(url));
// Create table
const table = document.querySelector('table');
let row = document.querySelector('.row');
let tbody = document.querySelector('tbody');

// Fonction pour créer une promesse pour chaque élément du tableau
function createElements(element, idx) {
    return new Promise((resolve, reject) => {
        idx = idx + 1;
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        row.setAttribute('id',`'film-${idx}'`);
        row.setAttribute('data-contribu',element.membre);
        titleCell.textContent = element.title;
        titleCell.classList.add('title');
        row.appendChild(titleCell);
        
        const year = document.createElement('td');
        year.textContent = element.year;
        year.classList.add('year');
        row.appendChild(year);
        
        const creator = document.createElement('td');
        creator.textContent = element.creator;
        creator.classList.add('creator');
        row.appendChild(creator);

        const membre = document.createElement('td');
        membre.textContent = element.membre;
        membre.classList.add('membre');

        const thmb = document.createElement('td');
        thmb.classList.add('thmb-wrapper');
        membre.appendChild(thmb);
        const thmbImg = document.createElement('img');
        thmb.src = element.thmb;
        thmb.appendChild(thmbImg);

        row.appendChild(membre);

        const cover = document.createElement('td');
        cover.classList.add('cover');
        row.appendChild(cover);
        

        const imgCover = document.createElement('img');
        imgCover.src = element.cover;
        cover.appendChild(imgCover);
        tbody.appendChild(row);
        resolve();
    });
}
let select = document.querySelector('select');
let checkbox = document.querySelector('input[type="checkbox"]');

Promise.all(allFilms.map(createElements)).then(() => {
        let rows = document.querySelectorAll('tbody tr');
        
        select.addEventListener('change', (event) => {
            Array.from(rows).forEach((row) => {
    
                    if(row.getAttribute('data-contribu') !== event.target.value && event.target.value !== "all"){
                        row.style.display = "none";
                    } else if(row.getAttribute('data-contribu') === event.target.value || event.target.value === "all"){
                        row.style.display = "flex";
                    } else {
                        row.style.display = "flex";
                    }
            
                });
        });

        checkbox.addEventListener('change', (event) => {
            Array.from(rows).sort(function(a, b) {
                const aText = a.querySelector('td.year').textContent;
                const bText = b.querySelector('td.year').textContent;
                // console.log(aText, bText);
                if (event.target.checked) {
                    // console.log(aText, bText);
                    return  bText - aText;
                } if(!event.target.checked){
                    return  aText - bText;
                } else {
                    return 0;
                } 
            });
            
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            Array.from(rows).forEach((row) => {
                tbody.appendChild(row);
            });

        });
});



// Add users in select
users.forEach((user) => {
    let option = document.createElement('option');
    option.textContent = user.username;
    option.value = user.username;
    select.appendChild(option);
});

// Filter membres
    
    
    // element.getAttribute('data-contribu');
let url = new URL(window.location.href);
let searchParams = new URLSearchParams(url.search);
// console.log(url);
