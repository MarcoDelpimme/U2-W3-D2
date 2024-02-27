// ●Crea un semplice form di registrazione con un input field in cui l’utente possa inserire il proprio nome. A fianco di questo input field crea due pulsanti: uno salverà il valore in localStorage, uno rimuoverà il valore precedentemente salvato (se presente). Mostra sopra l’input field il valore precedentemente salvato, se presente. ●Crea un contatore che tenga conto del tempo che passa, utilizzando sessionStorage. Aggiornando la pagina il valore prosegue, chiudendo la pagina - ovviamente - ricomincia. Il valore del contatore deve aggiornarsi ad ogni secondo.

const storageKey = "names-memory";

const usernameInput = document.getElementById("username");
const saveBtn = document.getElementById("savebtn");
const resetBtn = document.getElementById("resetbtn");
const containerName = document.getElementById("containerNames");
const form = document.querySelector("form");
const savedContent = localStorage.getItem(storageKey);

const counterKey = "time-counter";
let counterValue = sessionStorage.getItem(counterKey);
let counterInterval;

const counterContainer = document.getElementById("counterContainer");
const counterElement = document.createElement("p");
document.getElementById("counterContainer").appendChild(counterElement);

const updateCounter = () => {
  counterElement.innerText = `Time passed: ${counterValue} seconds`;
};

const startCounter = () => {
  counterInterval = setInterval(() => {
    counterValue++;
    sessionStorage.setItem(counterKey, counterValue);
    updateCounter();
  }, 1000);
};

const stopCounter = () => {
  clearInterval(counterInterval);
};

const resetCounter = () => {
  counterValue = 0;
  sessionStorage.setItem(counterKey, counterValue);
  updateCounter();
};

const save = (e) => {
  e.preventDefault();
  const content = usernameInput.value;

  localStorage.setItem(storageKey, content);
  alert("content saved");

  displaySavedNames(content);
  //   startCounter();
};

const displaySavedNames = (content) => {
  const savedNamesElement = document.createElement("p");
  clearSavedNames();
  savedNamesElement.innerText = content;
  console.log(savedNamesElement);
  containerName.appendChild(savedNamesElement);
};
window.onload = () => {
  saveBtn.addEventListener("click", save);
  resetBtn.addEventListener("click", reset);
  displaySavedNames(savedContent);
};

const reset = () => {
  const ifConfirmed = confirm("are u sure to remove your name?");
  if (ifConfirmed) {
    usernameInput.value = "";
    localStorage.removeItem(storageKey);
    clearSavedNames();
    // stopCounter();
    resetCounter();
  }
};

saveBtn.addEventListener("click", save);
resetBtn.addEventListener("click", reset);

const clearSavedNames = () => {
  containerName.innerHTML = "";
};

window.onload = () => {
  saveBtn.addEventListener("click", save);
  resetBtn.addEventListener("click", reset);
  displaySavedNames(savedContent);
  startCounter();
  updateCounter();
};
