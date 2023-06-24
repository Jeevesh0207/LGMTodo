import { useState } from 'react';
import './App.css';

function App() {
  const [TaskTitle, setTaskTitle] = useState('')
  const [Task, setTask] = useState('')
  const [array, setarray] = useState([])
  const [newTaskTitle, setnewTaskTitle] = useState('')
  const [newTask, setnewTask] = useState('')
  const Additems = (e) => {
    e.preventDefault();
    let obj = {
      TaskTitle: `${TaskTitle}`,
      Task: `${Task}`,
    }
    if (!array.some(item => item.TaskTitle === TaskTitle) && TaskTitle !== '' && Task !== '')
      setarray([...array, obj])

    document.getElementById('myForm').reset()
    setTask('')
    setTaskTitle('')

  }
  const closeEdit = (id) => {
    console.log('closeEdit')
    let editpopup = document.getElementsByClassName(`editpup${id}`)[0]
    editpopup.style.display = 'none'

  }
  const Edit = (id) => {
    console.log(id)
    console.log('Edit')
    let editpopup = document.getElementsByClassName(`editpup${id}`)[0]
    editpopup.style.display = 'flex'
  }
  const setChangedata = (id) => {
    console.log(id)
    if (newTask !== '' && newTaskTitle !== '') {
      array[id].TaskTitle = newTaskTitle
      array[id].Task = newTask
    }
    setarray([...array])
    let editpopup = document.getElementsByClassName(`editpup${id}`)[0]
    editpopup.style.display = 'none'

  }

  const Delete = (id) => {
    array.splice(id, 1)
    setarray([...array])

  }

  const Star = (id) => {
    let starmark = document.getElementById(`starmark${id}`)
    if (starmark.className === `fa-solid fa-star`) {
      starmark.className = `fa-sharp fa-regular fa-star`
      starmark.style.color = '#fff'
    }
    else {
      starmark.className = `fa-solid fa-star`
      starmark.style.color = '#ffd700'
    }
  }

  const Comp = (id) => {
    let compcheck = document.getElementsByClassName(`compcheck${id}`)[0]
    if (compcheck.innerHTML === 'Completed') {
      compcheck.innerHTML = 'Pending'
      compcheck.style.backgroundColor = 'red'
    }
    else {
      compcheck.innerHTML = 'Completed'
      compcheck.style.backgroundColor = '#4ca64c'
    }
  }
  return (
    <div className="App">
      <div className="Header">
        <img src={require('./img/logo.png')} alt='png' />
        <h1>Todo List</h1>
      </div>
      <div className="additem">
        <img src={require('./img/banner.jpeg')} alt="png" />
        <form id='myForm'>
          <div className='tasktitle'>
            <input type="text" onChange={(e) => {
              setTaskTitle(e.target.value)
            }}></input>
            <p>Task Title</p>
          </div>
          <div className='task'>
            <input type="text" onChange={(e) => {
              setTask(e.target.value)
            }}></input>
            <p>Task</p>
          </div>
          <div className='btn'>
            <button onClick={Additems}>Add</button>
            <button type='reset'>Clear</button>
          </div>
        </form>
      </div>
      <div className="Task">
        <div className="Left">
          <h1>Task</h1>
          <div className="alltask">
            {
              array.map((item, id) => {
                return (
                  <div className="taskbox" key={id} >
                    <div className={`editpopup editpup${id}`}>
                      <div className="close" onClick={() => closeEdit(id)}>
                        <i className="fa-solid fa-xmark"></i>
                      </div>
                      <div className='edtasktitle'>
                        <input type='text' placeholder={item.TaskTitle} onChange={(e) => {
                          setnewTaskTitle(e.target.value)

                        }
                        }></input>
                        <p>Task Title</p>
                      </div>
                      <div className='edtask'>
                        <p>Task</p>
                        <input type='text' placeholder={item.Task} onChange={(e) => {
                          setnewTask(e.target.value)

                        }
                        }></input>
                      </div>
                      <div className="btn">
                        <button onClick={() => setChangedata(id)}>Save</button>
                      </div>
                    </div>
                    <div className='Serialno'>
                      <p>{id + 1}</p>
                    </div>
                    <p>{item.TaskTitle}</p>
                    <p>{item.Task}</p>
                    <p className={`compcheck compcheck${id}`} onClick={() => Comp(id)}>Pending</p>
                    <div className="editbtn">
                      <i className="fa-sharp fa-regular fa-star" onClick={() => Star(id)} id={`starmark${id}`}></i>
                      <i className="fa-solid fa-trash" onClick={() => Delete(id)}></i>
                      <i className="fa-solid fa-ellipsis-vertical" onClick={() => Edit(id)}></i>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
