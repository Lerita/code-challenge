const grid = document.getElementById('grid');
const thumbnails = document.getElementById('thumbnails');
const loadMore = document.getElementById('load-more');
let currentPage = 1;

const username = document.getElementById('username');
const name = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const largeImage = document.getElementById('large-image');

const visible = document.getElementById('details');
const closeContainer = document.getElementById('close-container');
const stopScrolling = document.getElementById('body');
const closeFromOutside = document.getElementById('close-outside');

const getAllProfiles = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
                const gridModel = grid.children[0];
                const profiles = data.results;
                grid.innerHTML = '';

                for (const profile of profiles) {
                    let newProfile = gridModel.cloneNode(true);
                    newProfile.children[0].src = profile.picture.thumbnail;
                    newProfile.children[1].innerHTML = `${profile.name.first} ${profile.name.last}`;
                    newProfile.children[2].innerHTML = profile.location.city;
                    newProfile.children[3].innerHTML = profile.location.state;
                    grid.appendChild(newProfile);


                    newProfile.onclick = () => {
                        visible.style.visibility = 'visible';
                        stopScrolling.classList.add('stop-scrolling');
                        // largeImage.style.backgroundImage = `url(${profile.picture.large})`;
                        largeImage.src = profile.picture.large;
                        username.innerText = `Username: ${profile.login.username}`;
                        name.innerText = `Name: ${profile.name.first} ${profile.name.last}`;
                        email.innerText = `E-mail: ${profile.email}`;
                        age.innerText = `Age: ${profile.dob.age}`;
                    }
                }
                

        })
        .catch();
}

getAllProfiles(`https://randomuser.me/api/?page=${currentPage}&results=25&seed=abc`);


loadMore.onclick = () => {
    currentPage++;
    getAllProfiles(`https://randomuser.me/api/?page=${currentPage}&results=25&seed=abc`);

}

closeContainer.onclick = () => {
    visible.style.visibility = 'hidden';
    stopScrolling.classList.remove('stop-scrolling');
}

closeFromOutside.onclick = () => {
    visible.style.visibility = 'hidden';
    stopScrolling.classList.remove('stop-scrolling');
};