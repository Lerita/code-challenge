/* Home page */
const grid = document.getElementById('grid');
const thumbnails = document.getElementById('thumbnails');
const nextPage = document.getElementById('next_page');
/* User data in popup card*/
const username = document.getElementById('username');
const name = document.getElementById('name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const largeImage = document.getElementById('large_image');
/* Popup card */
const visible = document.getElementById('details');
const closeContainer = document.getElementById('close_container');
const stopScrolling = document.getElementById('body');
const closeFromOutside = document.getElementById('close_outside');


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
                newProfile.children[2].innerHTML = `${profile.location.city},`;
                newProfile.children[3].innerHTML = profile.location.state;
                grid.appendChild(newProfile);


                newProfile.onclick = () => {
                    visible.style.visibility = 'visible';
                    stopScrolling.classList.add('stop-scrolling');
                    largeImage.src = profile.picture.large;
                    username.innerHTML = `<b>Username:</b> ${profile.login.username}`;
                    name.innerHTML = `<b>Name:</b> ${profile.name.first} ${profile.name.last}`;
                    email.innerHTML = `<b>E-mail:</b> ${profile.email}`;
                    age.innerHTML = `<b>Age:</b> ${profile.dob.age}`;
                }
            }
        })
        .catch();
}

getAllProfiles(`https://randomuser.me/api/?page=1&results=24&seed=abc`);


let unselectPage = 1;

const getPage = () => {
    for (let i = 1; i < 6; i++) {
        let currentPage = document.getElementById(`page_${i}`);

        currentPage.onclick = () => {
            const selectedPage = document.getElementById(`page_${unselectPage}`)
            selectedPage.classList.remove("selected");
            currentPage.classList.add("selected");

            getAllProfiles(`https://randomuser.me/api/?page=${i}&results=24&seed=abc`);

            unselectPage = i;
        }

    }
}
getPage();


closeContainer.onclick = () => {
    visible.style.visibility = 'hidden';
    stopScrolling.classList.remove('stop-scrolling');
}

closeFromOutside.onclick = () => {
    visible.style.visibility = 'hidden';
    stopScrolling.classList.remove('stop-scrolling');
};