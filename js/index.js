// creating elements in DOM.
const monsterContainer = document.querySelector('#monster-container');
const createMonsterForm = document.querySelector('#create-monster-form');
const createMonsterBtn = document.querySelector('#create-monster-btn');
const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');
let page = 1;

// fetch monsters from API
function fetchMonsters(page) {
  fetch(`http://localhost:7000/monsters?page=${page}&limit=50`)
    .then(response => response.json())
    .then(monsters => {
      monsters.forEach(monster => {
        const monsterCard = document.createElement('div');
        monsterCard.className = 'monster-card';
        monsterCard.innerHTML = `<h3>${monster.name}</h3><p>Age: ${monster.age}</p><p>Description: ${monster.description}</p>`;
        monsterContainer.appendChild(monsterCard);
      });
    });
}

// handle form submissions
createMonsterForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const description = document.getElementById('description').value;

    //clear form after submit
  createMonsterForm.reset();
});

// Event listeners for navigation buttons
backButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    monsterContainer.innerHTML = '';
    fetchMonsters(page);
  }
});

forwardButton.addEventListener('click', () => {
  page++;
  monsterContainer.innerHTML = '';
  fetchMonsters(page);
});

//fetch monster when page loads
fetchMonsters(page);

