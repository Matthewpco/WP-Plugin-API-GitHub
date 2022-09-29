// Targeting document sections and setting Github user name
var overview = document.querySelector(".overview");
var repoList = document.querySelector(".repo-list");
var reposSection = document.querySelector(".repos");
var repoDataSection = document.querySelector(".repo-data");
var backButton = document.querySelector("button");
var filterInput = document.querySelector("input");
var gitUserName = "Matthewpco";


// Fetch Github user data
const getUserData = async function() {
    const res = await fetch(
        `https://api.github.com/users/${gitUserName}`
        );
        const uData = await res.json();
        popData(uData);
}
getUserData();


// Populate fetched user data 
let popData = (uData) => {
   let dataBody =  document.createElement("div");
   dataBody.classList.add("user-info");
   dataBody.innerHTML = `<figure>
   <img alt="user avatar" src=${uData.avatar_url} />
 </figure>
 <div>
   <p><strong>Name:</strong> ${uData.name}</p>
   <p><strong>Bio:</strong> ${uData.bio}</p>
   <p><strong>Location:</strong> ${uData.location}</p>
   <p><strong>Number of public repos:</strong> ${uData.public_repos}</p>
 </div> `;
overview.append(dataBody)
getRepoData();
};


// Fetch Github repo data
const getRepoData = async function () {
  const res = await fetch(
    `https://api.github.com/users/${gitUserName}/repos?per_page=100&sort=updated`
  );

  const repoData = await res.json();
  popRepo(repoData);
};

// Populate repo data
const popRepo = (repoData) => {
  filterInput.classList.remove("hide");
  for (const repo of repoData) {
    const repoLi = document.createElement("li");
    repoLi.classList.add("repo");
    repoLi.innerHTML = `<h3> ${repo.name} </h3>`;
    repoList.append(repoLi);
  }
};


// When a repo list element is clicked that matches h3 it will fetch repo sub data
repoList.addEventListener("click", (e) => {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoSubData(repoName);
  }
});


// Fetch repo sub data for event listener
const getRepoSubData = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${gitUserName}/${repoName}`
  )
  const repoSubData = await res.json();
  const fetchLanguages = await fetch(repoSubData.languages_url)
  const langaugeData = await fetchLanguages.json();
  const languages = [];
  for(language in langaugeData) {
    languages.push(language)
  }
  popRepoSubData(repoSubData, languages);
};


//Display repo sub data
const popRepoSubData = (repoSubData, languages) => {
  repoDataSection.innerHTML = "";
  const repoSubDiv = document.createElement("div");
  repoSubDiv.innerHTML = `
  <h3>Name: ${repoSubData.name}</h3>
    <p>Description: ${repoSubData.description}</p>
    <p>Default Branch: ${repoSubData.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoSubData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDataSection.append(repoSubDiv)
    repoDataSection.classList.remove("hide")
    reposSection.classList.add("hide")
    backButton.classList.remove("hide");
};

// Event listeners

backButton.addEventListener("click", () => {
  reposSection.classList.remove("hide");
  repoDataSection.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", (e) => {
  let searchInput = e.target.value;
  const repoSection = document.querySelectorAll(".repo");
  searchInputLc = searchInput.toLowerCase();
  console.log(searchInputLc)
  for (const repoSearch of repoSection) {
    const repoValueLc = repoSearch.innerText.toLowerCase();
    if (repoValueLc.includes(searchInputLc)) {
      repoSearch.classList.remove("hide")

    }
    else {
      repoSearch.classList.add("hide")
    }
  }
});