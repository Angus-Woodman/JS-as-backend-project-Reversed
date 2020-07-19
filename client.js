const url = "http://localhost:8000";
const myForm = document.querySelector("#my-form");
let input;

myForm.addEventListener("submit", returnReverse);

function returnReverse (e) {
  e.preventDefault();

  const form = e.target;
  input = form.message.value;

  const options = {
    method: 'POST',
    body: JSON.stringify(input)
  };

  fetch('http://localhost:8000/reverse', options)
    .then(response => response.json())
    .then(addInput)
    .then(console.log)
    .catch(console.warn);
};

function addInput(reversed) {
  myForm.insertAdjacentHTML('afterend', `<p>${reversed}</p>`)
}

fetch(url).then(r => r.json()).then(console.log);
