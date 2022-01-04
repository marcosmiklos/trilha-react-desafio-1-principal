import { useState, useEffect, useRef } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const taskInput = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // toda vez que o valor de tasks for alterado, envia o foco para o input do cadastro de nova tarefa
  useEffect( () => {
    taskInput.current?.focus();
  },[tasks]);
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // verifica se é diferente de null, undefined e verifica se a string não contém apenas espaços em branco
    if(newTaskTitle && !/^\s*$/.test(newTaskTitle)) {
      
      // dados da task para ser armazenada
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        isComplete: false
      };
      // define o novo estado das tasks
      setTasks( prevState => [...prevState, newTask]);      
    }

    //limpa o input de nova task a cada clique
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    setTasks( prevState => prevState.map( item => ( item.id !== id 
      ? item 
      : {
        id: item.id,
        title: item.title,
        isComplete: !item.isComplete
      })
    ));
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const removeTask = [...tasks].filter(task => task.id !== id);
    setTasks(removeTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            ref={taskInput}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}