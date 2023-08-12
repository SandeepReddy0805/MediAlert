import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { NotFound } from "./Components/NotFound";
import { Signup } from "./Components/Signup";
import { ForgotPassword } from "./Components/ForgotPassword";
import { auth, db } from "./Config/Config";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export class App extends Component {
  state = {
    currentUser: null,
    todos: [],
    editTodoValue: null,
  };

  componentDidMount() {
    // getting current user
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.setState({
              currentUser: snapshot.data().Name,
            });
          });
      } else {
        console.log("user is not signed in to retrive username");
      }
    });

    // getting todos for current user
    auth.onAuthStateChanged((user) => {
      if (user) {
        const todoList = this.state.todos;
        db.collection("todos of " + user.uid).onSnapshot((snapshot) => {
          let changes = snapshot.docChanges();
          changes.forEach((change) => {
            if (change.type === "added") {
              todoList.push({
                id: change.doc.id,
                Todo: change.doc.data().Todo,
                description: change.doc.data().description,
                hours: change.doc.data().hours,
                times: change.doc.data().times,
              });
            }
            if (change.type === "removed") {
              // console.log(change.type);
              for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === change.doc.id) {
                  todoList.splice(i, 1);
                }
              }
            }
            this.setState({
              todos: todoList,
            });
          });
        });
      } else {
        console.log("user is not signed in to retrive todos");
      }
    });
  }

  deleteTodo = (todo) => {
    // console.log(id);
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("todos of " + user.uid)
          .doc(todo.id)
          .delete();
        db.collection("notifications").where('Todo','==',todo.Todo).get().then((snaps)=>{
          snaps.forEach(doc=>doc.ref.delete());
        });
      } else {
        console.log("user is not signed in to delete todos");
      }
    });
  };

  editModal = (obj) => {
    this.setState({
      editTodoValue: obj,
    });
  };

  updateTodoHandler = (editTodo, id) => {
    // console.log(editTodo, id);
    const todoList = this.state.todos;
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        todoList.splice(i, 1, { id, Todo: editTodo });
      }
      this.setState({
        todos: todoList,
      });
    }
  };

  render() {
    // console.log(this.state.todos);
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Home
                  currentUser={this.state.currentUser}
                  todos={this.state.todos}
                  deleteTodo={this.deleteTodo}
                  editTodoValue={this.state.editTodoValue}
                  editModal={this.editModal}
                  updateTodoHandler={this.updateTodoHandler}
                />
              </LocalizationProvider>
            )}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
