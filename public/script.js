console.log('🎬');

// Récupérer les données du json local
const response = await fetch("output/data.json");
let films = await response.json();
const allFilms = [...films]
// console.log(films);
const url = 'https://getpantry.cloud/apiv1/pantry/66ada696-2f50-473e-a1ca-9318f565d41b/basket/Films';

// Stocker les données locales sur Pantry   

allFilms.forEach(element => {
        // Stocker les données dans Pantry
        let data = {
            id: element.id,
            title: element.title,
            creator: element.creator,
            year: element.year,
            cover: element.cover
        };

        // console.log(JSON.stringify(data));
    
        // Post data to API
        const postData = async (url, data) => {

            let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify(data);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
              };
              
              fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                // .catch(error => console.log('error', error));
        }; 
        // Appel de la fonction postData avec l'URL et les données
        postData(url, data);

});

// Récupérer les données de Pantry
const pantry = await fetch(url);
films = await pantry.json();
// console.log(films);

// Appel de la fonction postData avec l'URL et les données
// getData(url);
// console.log(films);
// Create table
const table = document.querySelector('table');
let row = document.querySelector('.row');
let tbody = document.querySelector('tbody');
if(films === ""){
    films = allFilms;
} else {
    films;
}
films.forEach((element,idx) => {
    idx = idx + 1;
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    row.setAttribute('id',`'film-${idx}'`);
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

    const cover = document.createElement('td');
    cover.classList.add('cover');
    row.appendChild(cover);
    

    const imgCover = document.createElement('img');
    imgCover.src = element.cover;
    cover.appendChild(imgCover);
    tbody.appendChild(row);

    // table.appendChild(row);

    
});

