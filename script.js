window.onload = function () {
    let todos = []
    
    let list = this.document.getElementById('list')
    let newtask = this.document.getElementById('newtask')
    let addtask = this.document.getElementById('addtask')
    let cleardone = this.document.getElementById('cleardone')
    let sortlist = this.document.getElementById('sortlist')

    function retrieveTodos () {
        if (localStorage['todos']) {
            todos = JSON.parse(localStorage['todos'])
        }
    }
    function saveTodos () {
        localStorage['todos'] = JSON.stringify(todos)
    }
    function clearList () {
        while(list.firstChild) {
            list.removeChild(list.firstChild)
        }
    }
    function createListItemFromTodo(todo, pos) {
        let item = document.createElement('li')
        let taskSpan = document.createElement('span')
        let xBtn = document.createElement('button')
        let upBtn = document.createElement('button')
        let downBtn = document.createElement('button')

        item.classList.add('list-group-item')
        xBtn.classList.add('btn')
        xBtn.classList.add('btn-outline-danger')
        upBtn.classList.add('btn')
        upBtn.classList.add('btn-ouline-info')
        downBtn.classList.add('btn')
        downBtn.classList.add('btn-ouline-info')

        taskSpan.innerText = todo.task
        xBtn.innerText = "X"
        upBtn.innerText = "˄"
        downBtn.innerText = "˅"
        if (todo.done) {
            taskSpan.style.textDecoration = 'line-through'
        }
        xBtn.onclick = function () {
            todos[pos].done = !todos[pos].done
            saveTodos()
            refreshList()
        }
        downBtn.onclick = function () {
            if (pos >= todos.length - 1) return

            todos.splice(pos, 0, todos.splice(pos+1, 1)[0])
            saveTodos()
            refreshList()
        }
        upBtn.onclick = function () {
            if (pos <= 0) return
            
            todos.splice(pos-1, 0, todos.splice(pos, 1)[0])
            saveTodos()
            refreshList()
        }
        item.setAttribute('data-id', pos)
        item.appendChild(taskSpan)
        item.appendChild(upBtn)
        item.appendChild(downBtn)
        item.appendChild(xBtn)
        return item
    }
    function refreshList () {
        retrieveTodos()
        clearList()
        for (let i = 0; i < todos.length; i++) {
            list.appendChild(createListItemFromTodo(todos[i], i))
        }
    }
    function addTodo () {
        todos.push({
            task: newtask.value,
            done: false
        })
        saveTodos()
        newtask.value = ""
        refreshList()
    }

    addtask.onclick = addTodo
    cleardone.onclick = function () {
        todos = todos.filter((t) => !t.done)
        saveTodos()
        refreshList()
    }
    sortlist.onclick = function () {
        todos.sort((a,b) => a.done - b.done)
        saveTodos()
        refreshList()
    }

    refreshList()


}