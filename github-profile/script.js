const form = document.getElementById("form");
const input  = document.getElementById("input");
const main = document.getElementById("main");

const API_URL = "https://api.github.com/users/";


fetchUserDetail("kashaudhan");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = input.value;
    if(username){
        fetchUserDetail(username);
        input.value = "";
    }
});

async function fetchUserDetail(username){
    const response = await fetch(API_URL + username);
    const data = await response.json();
    console.log(data);
    renderUserCard(data);
    getRepos(username);
}

function renderUserCard(data){
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" 
                src="${data.avatar_url}" 
                alt="${data.name}"/>
            </div>

            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul>
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                   
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `
    main.innerHTML = cardHTML;
}

async function getRepos(username){
    //const repoEl = document.getElementById("repos");
    const response = await fetch(API_URL + username + "/repos");
    const respData = await response.json();
    addRepoToCard(respData);
}

function addRepoToCard(repos){
    const reposEl = document.getElementById("repos");
    console.log("Length: ", repos.length);
    repos.slice(0,10).forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        console.log("url ", repo.html_url);
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}

//sort((a, b) => a.stargazers_count - b.stargazers_count).