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
})