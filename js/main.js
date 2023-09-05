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
})