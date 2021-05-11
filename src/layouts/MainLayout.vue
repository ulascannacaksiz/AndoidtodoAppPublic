<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Todo App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Yeni Bir Todo Ekle</div>
        </q-card-section>

        <q-separator/>

        <q-card-actions vertical>
          <q-input outlined v-model="newTodo" label="Todo"/>
          <q-btn flat color="black" class="bg-secondary q-mt-md" @click="addToLocalStorage">Todo Ekle</q-btn>
        </q-card-actions>
      </q-card>
    </q-page-container>
    <div class="row q-mt-md">
      <div class="col-12">
        <q-slide-item @left="onLeft(index)" @right="onRight(index)" class="shadow-1" v-for="(todo,index) in todoList"
                      :key="`${todo}`">
          <template v-slot:left>
            <q-icon name="done"/>
            Tamamladı
          </template>
          <template v-slot:right>
            <q-icon name="build"/>
            Todoyu Düzenle
          </template>

          <q-item>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="schedule"/>
            </q-item-section>
            <q-item-section>{{ todo }}</q-item-section>
          </q-item>
        </q-slide-item>
      </div>
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Todo İçeriğini Giriniz</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="updatedTodo" autofocus @keyup.enter="todoUpdate"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="İptal" v-close-popup/>
          <q-btn flat label="Todoyu Kaydet" @click="todoUpdate"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>

export default {

  data () {
    return {
      newTodo: '',
      todoList: [],
      prompt: false,
      updatedTodo: '',
      index: null
    }
  },
  methods: {
    getTodolistFromLocalStorage () {
      let items = ''
      if (localStorage.getItem('todolist') === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem('todolist'))
      }
      return items
    },
    addToLocalStorage () {
      // console.log(this.newTodo)
      const todos = this.getTodolistFromLocalStorage()
      todos.push(this.newTodo)
      localStorage.setItem('todolist', JSON.stringify(todos))
      this.showTodosUi()
      //  console.log(this.todoList)
    },
    completeTodo (index) {
      const todo = this.getTodolistFromLocalStorage()
      todo.splice(index, 1)
      localStorage.setItem('todolist', JSON.stringify(todo))
    },
    showTodosUi () {
      this.todoList = this.getTodolistFromLocalStorage()
    },
    onLeft (index) {
      this.completeTodo(index)
      setTimeout(() => {
        this.todoList = this.getTodolistFromLocalStorage()
      }, 1000)
    },
    onRight (index) {
      this.prompt = true
      this.index = index
    },
    todoUpdate () {
      const todoindex = this.index
      const todos = this.getTodolistFromLocalStorage()
      todos[todoindex] = this.updatedTodo
      localStorage.setItem('todolist', JSON.stringify(todos))
      this.prompt = false
      this.index = null
      this.updatedTodo = ''
      this.todoList = this.getTodolistFromLocalStorage()
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  },
  created () {
    this.todoList = this.getTodolistFromLocalStorage()
  }
}
</script>
