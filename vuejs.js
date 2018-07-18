(function(){
    "use strict";

    var vm = new Vue({
        el: '#app',
        data: {
            todos: [],
            newItem: ""
        },
        watch: {
            todos: {
                handler: function(){
                    localStorage.setItem("todos", JSON.stringify(this.todos))
                },
                deep: true
            }

        },
        methods: {
            addItem: function() {
                let item ={
                    title: this.newItem,
                    isDone: false
                }
                this.todos.push(item);
                this.newItem = "";
            },
            deleteItem: function(index){
                if(confirm("are you sure?")){
                    this.todos.splice(index, 1);
                }
            },
            purge: function(){
                if(!confirm("delete all finished?")){
                    return;
                }
                this.todos = this.remaining;
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        },
        computed:{
            remaining: function(){
                return this.todos.filter(function(todo){
                    return !todo.isDone;
                });
            }
        }
    });



})();