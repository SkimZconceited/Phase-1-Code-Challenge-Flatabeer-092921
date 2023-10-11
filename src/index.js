const init = () => {

    const url = 'http://localhost:3000/beers';
    let img = document.querySelector('img#beer-image');
    let beerName = document.querySelector('#beer-name');
    let des = document.querySelector('#beer-description');
    let uptDes = document.querySelector('textarea#description');
    let btnSub1 = document.querySelectorAll('button[type = "submit"]')[0];
    let liReview = document.querySelectorAll('ul#review-list li')[0];
    let btnSub2 = document.querySelectorAll('button[type = "submit"]')[1];
    let uptRev = document.querySelector('textarea#review');
    let showRev = document.querySelectorAll('ul#review-list li')[1];
    let n = 1;
    
    let navBeer = document.querySelectorAll('ul#beer-list li');
    // let navBeer1 = document.querySelector('ul#beer-list li');
    // let navBeer2 = document.querySelector('ul#beer-list li')[1];
    
    // console.log(navBeer1.textContent);
    
    // console.log(showRev.textContent)
    // console.log(liReview.textContent)
    
    fetch(url)
    .then(res => res.json())
    .then(db => db.forEach(d => {
        
    //     // Creates a copy of the array from the server and to an array that will be used to print out random results on the review section of the site
        if (d.id === n) {
            // Adding an img link to the src of the img element
            img.src = d.image_url;
            
            // Adding beer name in the h2 id = 'beer-name' update with the beer
            beerName.textContent = d.name;
            
            // Adding description in hte proper element of beer description
            des.textContent = d.description;
            
            // This event listener listens for a click event in the update button then it gets the data from the server and updates the description of the beer 
            btnSub1.addEventListener('click', () => {
                let txtHolder = uptDes.value;
                
                const jsonString = JSON.stringify({
                    "id": n,
                    "name": d.name,
                    "description": txtHolder, //Changed this part
                    "image_url": d.image_url,
                    "reviews": d.reviews
                });
                
                const options = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: jsonString
                }
                
                fetch(`http://localhost:3000/beers/${n}`, options)
                .then(res => res.json())
                .then(data => data);
            });

            // This accesses the review array in the db
            fetch(url).then(res => res.json()).then(dat => {
                dat.forEach(dd => {
                    if (dd.id === n) {
                        const allRev = dd.reviews;

                        liReview.innerHTML = ''; //Gets rid of the initial text inside
                        allRev.forEach(aR => {
                            const com = `<li>${aR}</li>`;
                            liReview.insertAdjacentHTML('beforeend', com);
                        });
                    }
                })
            });

            btnSub2.addEventListener('click', () => {

                let putToServer = uptRev.value;
                let dc = [];

                d.reviews.forEach(cc => {dc.push(cc)});

                if (putToServer === true) {
                    dc.push(putToServer);
                }
                
                const jsonString = JSON.stringify({
                    "id": n,
                    "name": d.name,
                    "description": d.description,
                    "image_url": d.image_url,
                    "reviews": dc
                });
                
                const options = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: jsonString
                }
                
                fetch(`http://localhost:3000/beers/${n}`, options)
                .then(res => res.json())
                .then(data => data);
            });

            // This fetch req goes and gets all the data/ reviews in the database
            fetch(url).then(res => res.json()).then(dat => {
                dat.forEach(dd => {
                    if (dd.id === n) {
                        const allRev = dd.reviews;
                        const lenRev = dd.reviews.length - 1;
                        showRev.textContent = dd.reviews[lenRev];
                    }
                })
            });    
        }
    }));
    
    // This goes through all the li's and assign a random beer name
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let rndHolder = [];

        navBeer.forEach(b => {
            const ranBeer = data[Math.floor(Math.random() * data.length)]    
            let randName = ranBeer.name;
            rndHolder.push(randName);
            b.textContent = randName;
        });
        
        // These line use the function updateData() to update data upon a click event in the nav beer list 
        navBeer[0].addEventListener('click', () => { data.forEach(d => { updateData(d, 0); }); });
        navBeer[1].addEventListener('click', () => { data.forEach(d => { updateData(d, 1); }); });
        navBeer[2].addEventListener('click', () => { data.forEach(d => { updateData(d, 2); }); });
        
        // Function updates the web page according to the li clicked in the web page
        function updateData (x, y) {

            if (x.name === rndHolder[y]) {
                const allRev = x.reviews;
                const lenRev = x.reviews.length - 1;
                
                console.log(allRev)
                // console.log(d.image_url);
                beerName.textContent = x.name;
                img.src = x.image_url; //needs fixing it takes a while to load the image
                
                liReview.innerHTML = '';
                allRev.forEach(a => {
                    const com = `<li>${a}</li>`;
                    liReview.insertAdjacentHTML('beforeend', com);
                });
                
                showRev.textContent = x.reviews[lenRev];
                }
        }
    });    
};


const form1 = document.querySelector('#description-form');
form1.addEventListener('submit', (e) => e.preventDefault());

const form2 = document.querySelector('#review-form');
form2.addEventListener('submit', (e) => e.preventDefault());

document.addEventListener('DOMContentLoaded', init());
