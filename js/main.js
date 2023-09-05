let eventBus = new Vue();

Vue.component('task', {
    props: {
        datas: {
            type: Object,
            default() {
                return {}
            }
        },
        task_id: {
            type: Object,
            default() {
                return {}
            }
        },
        arr: {
            type: Array,
            default() {
                return {}
            }
        },
        about:{
            type: Object,
            default() {
                return {}
            }
        },
        id_column:{
            type: Number
        }
    },
    template: `
    <div class="list">
            <div class="note_title_block">
                <h2 class="note_title">{{datas.request}}</h2>
                <button 
                v-on:click="delNote()">
                Delete
                </button>
            </div>
            <div class="tasks">
                <div class="task" 
                v-for="(element, elementId) in datas.tasks":key="elementId">
                    <div class="set_task">
                        <h3 class="title_task">
                        {{element.taskTitle}}
                        <img id="deleteContent" v-if="id_column == 1 && datas.tasks.length > 3" 
                        v-on:click="deleteContent(elementId)" src="static/remove.png">
                        </h3>
                        <input 
                        v-on:click="checkbox(elementId),
                        column1Move(),
                        column2Move(),
                        column2MoveLeft()" 
                        type="checkbox" 
                        v-model="element.completed"
                        :class="{none: datas.completedNum === 100, disabled: datas.completedNum > 50 && element.completed && about.lengthColumn1 === 3}" >
                    </div>
                    <div class="date" v-if="datas.date">
                        <p>{{datas.time}}</p>
                        <p>{{datas.date}}</p>
                    </div>
                </div>
                <div class="add_task":class="{none: datas.tasks.length >= 5 || datas.completedNum === 100}">                  
                    <div class="add_task_input">
                        <input required type="text" 
                        v-on:keyup.enter="addTask(),
                        column2MoveLeft()" 
                        v-model="taskTitle" placeholder="Задача">
                    </div>
                    <button 
                    v-on:click="addTask(),
                    column2MoveLeft()">
                    Input
                    </button>
            </div>
        </div>
    </div>
    `,
    methods: {
        deleteContent(id) {
            if(this.datas.tasks.length > 3 && this.id_column == 1)
            this.datas.tasks.splice(id,1)
            this.save_task()
        },
        delNote() {
            this.$emit('del_note')
        },
        column1Move() {
            this.$emit('column1_move')
        },
        column2Move() {
            this.$emit('column2_move')
        },
        column2MoveLeft() {
            this.$emit('column2_move_left')
        },
        updateCompletedNum() {
            let counterCompleted = 0;
            let counterNotCompleted = 0;
            for (let el of this.datas.tasks) {
                if (el.completed) {
                    counterCompleted++;
                } else {
                    counterNotCompleted++;
                }
            }
            this.datas.completedNum = (counterCompleted / (counterCompleted + counterNotCompleted)) * 100;
        },
        save_task() {
            // if (this.task_id === 1 && this.datas.completedNum <= 50) localStorage.todo = JSON.stringify(this.arr);
            // else if (this.task_id === 3 && this.datas.completedNum === 100) localStorage.todo3 = JSON.stringify(this.arr);
            // else localStorage.todo2 = JSON.stringify(this.arr);
            if (this.id_column == 1)  localStorage.todo = JSON.stringify(this.arr);
            if (this.id_column == 2)  localStorage.todo2 = JSON.stringify(this.arr);
            if (this.id_column == 2)  localStorage.todo3 = JSON.stringify(this.arr);
        },
        addTask() {
            if (this.taskTitle) {
                this.datas.tasks.push({
                    taskTitle: this.taskTitle,
                    completed: false,
                });
                this.taskTitle = null;
                this.updateCompletedNum();
                this.save_task();
            }
        },
        checkbox(id) {
            this.datas.tasks[id].completed = !this.datas.tasks[id].completed;
            this.updateCompletedNum();
            this.save_task();
        },
        
        
        data() {
            return {
                taskTitle: null,
                task: [],
            }
        },
    },
    
})




let app = new Vue({
    el: '#app',
    data: {
        column1: {
            arr: [],
            task_id: 1
        },
        column2: {
            arr: [],
            task_id: 2
        },
        column3: {
            arr: [],
            task_id: 3
        },
        request: null,
        Task1: null,
        Task2: null,
        Task3: null,
        completed: false,
        about:{
            signal: false,
            bufColumn: [],
            id: null,
            lengthColumn1: null,
          
        },
    },
    computed: {},
    mounted() {
        if (localStorage.todo) {
            this.column1.arr = JSON.parse(localStorage.todo)
        }
        if (localStorage.todo2) {
            this.column2.arr = JSON.parse(localStorage.todo2)
        }
        if (localStorage.todo3) {
            this.column3.arr = JSON.parse(localStorage.todo3)
        }
        if (localStorage.about){
            this.about = JSON.parse(localStorage.about)
        }
    },
methods: {
        
    forms() {
        if (this.request && this.column1.arr.length < 3 && this.Task1 && this.Task2 && this.Task3) {
            this.column1.arr.push({
                request: this.request,
                tasks: [
                    {
                        taskTitle: this.Task1,
                        completed: this.completed
                    },
                    {
                        taskTitle: this.Task2,
                        completed: this.completed
                    },
                    {
                        taskTitle: this.Task3,
                        completed: this.completed
                    }
                ],
                completedNum: 0,
            });
            this.request = null;
            this.Task1 = null;
            this.Task2 = null;
            this.Task3 = null
            localStorage.todo = JSON.stringify(this.column1.arr);
        }
        this.length()
    },
    left_colm(id) {
        if (this.column1.arr[id].completedNum > 50 && this.column2.arr.length <= 5) {
            if (this.column2.arr.length === 5) {
                this.about.signal = true;
                this.about.bufColumn.push(this.column1.arr[id])
                this.about.id = id
            }
            else if(this.about.bufColumn[0] && this.column2.arr.length === 4){
                this.column2.arr.push(this.about.bufColumn[0])
                this.about.bufColumn.splice(0, 1)
                this.column1.arr.splice(this.about.id, 1)
            }
            else {
                this.column2.arr.push(this.column1.arr[id])
                this.column1.arr.splice(id, 1)
            }
        }
        this.length()
        localStorage.todo = JSON.stringify(this.column1.arr);
        localStorage.todo2 = JSON.stringify(this.column2.arr);
        localStorage.about = JSON.stringify(this.about)
    },
