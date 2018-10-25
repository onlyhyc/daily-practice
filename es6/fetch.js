document.getElementById('btn1').addEventListener('click', getText);

document.getElementById('btn2').addEventListener('click', getJson);
document.getElementById('btn3').addEventListener('click',getExternal);

function getText() {
  fetch('fetchText.txt').then(res => res.text()).then((data) => {
    document.getElementById('output').innerHTML = data;
//  console.log(data);
  }).catch(err => console.log(err))
}

function getJson() {
  fetch('fetchJson.json').then(res => res.json()).then(data => {
    let output='';
    data.forEach((res) => {
      output += `<li>${res.name}</li>`;
    });
    document.getElementById('output').innerHTML = output;
//  console.log(data);
  }).catch(err => console.log(err))
}

function getExternal() {
  fetch('https://api.github.com/users').then(res => res.json()).then(data => {
    let output='';
    data.forEach((res) => {
      output += `<li>${res.login}</li>`;
    });
    document.getElementById('output').innerHTML = output;
//  console.log(data);
  }).catch(err => console.log(err))
}
