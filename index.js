// selecting things
//main monsters div
let monstersMainDiv = document.getElementById('monster-container')
let nextButton = document.getElementById('forward')
let backButton = document.getElementById('back')
let createForm = document.getElementById('monster-form')
let page = 1

document.addEventListener("DOMContentLoaded", init)
// stuff that runs when DOMContentLoaded
function init() {
  addEventListeners()
  fetchMonsters(page)
}

// event Listeners!
function addEventListeners() {
  nextButton.addEventListener('click', nextPage)
  backButton.addEventListener('click', previousPage)
  createForm.addEventListener('submit', handleCreate)
}

function handleCreate(event) {
  event.preventDefault()
  postFetch()
  event.currentTarget.reset()
}

function postFetch() {
  let newMonsterName = document.querySelector('#name').value
  let newMonsterAge = document.querySelector('#age').value
  let newMonsterBio = document.querySelector('#description').value

  let data = {name: newMonsterName, age: newMonsterAge, description: newMonsterBio}

  fetch(`http://localhost:3000/monsters`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    renderMonster(jsonData)
  })
}

// On page load I want get the first 50 monsters
function fetchMonsters(page) {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(monstersData => {
   monstersData.forEach(monster => renderMonster(monster))
 })
}

// And render them
function renderMonster(monsterData) {
    let monsterDiv = document.createElement('div')
    monstersMainDiv.appendChild(monsterDiv)

    let monsterName = document.createElement('h2')
    let monsterAge = document.createElement('h4')
    let monsterBio = document.createElement('p')

    monsterName.innerText = monsterData.name
    monsterAge.innerText = `Age: ${monsterData.age}`
    monsterBio.innerText = `Bio: ${monsterData.description}`

    monsterDiv.appendChild(monsterName)
    monsterDiv.appendChild(monsterAge)
    monsterDiv.appendChild(monsterBio)

}

function nextPage() {
  page++
  fetchMonsters(page)
  monstersMainDiv.innerHTML = ''
}

function previousPage() {
  page--
  fetchMonsters(page)
  monstersMainDiv.innerHTML = ''
}
