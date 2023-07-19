const addtask = document.querySelector('#addtask');
const newtask = document.querySelector('#newtask');
const taskList = document.querySelector('.taskList');

function addToDom(todos) {
  taskList.innerText = '';
  todos.forEach(element => {
    //create the element
    let li = document.createElement('li');
    //update the element
    li.innerHTML = `
        <span class="taskName">${element.name}</span>
        <button atrid=${element.id} class="upbtn">⬆️</button>
        <button atrid=${element.id} class="dwnbtn">⬇️</button>
        <button atrid=${element.id} class="deletebtn">❌</button>
        `;
    //append the list
    taskList.appendChild(li);
  });
}
axios.get('/gettodo')
  .then((res) => {
    let todos = res.data;
    addToDom(todos);
  })
  .catch((err) => {
    console.log(err);
  });

addtask.addEventListener('click', (ev) => {
  ev.preventDefault();
  // console.log("You tried to submit the form")
  axios.post('/addtodo', {
    name: newtask.value
  })
    .then((res) => {
      let todos = res.data;
      newtask.value = '';
      console.log(todos);
      addToDom(todos);
    })
    .catch((err) => {
      console.log(err);
    });
});

taskList.addEventListener('click', (ev) => {
  // console.log(ev);
  // console.log(ev.target);
  let atrid = ev.target.getAttribute('atrid');
  let btnName = ev.target.className;

  // console.log(atrid);
  // console.log(btnName);
  if (btnName === 'deletebtn') {
    axios.post('/deletetodo', { id: atrid })
      .then((res) => {
        let todos = res.data;
        console.log(todos);
        addToDom(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (btnName === 'upbtn') {
    axios.get(`/increasepriority?id=${atrid}`)
      .then((res) => {
        let todos = res.data;
        addToDom(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (btnName === 'dwnbtn') {
    axios.get(`/decreasepriority?id=${atrid}`)
      .then((res) => {
        let todos = res.data;
        addToDom(todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

