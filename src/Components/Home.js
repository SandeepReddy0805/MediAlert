import React, { useState } from "react";
import { Header } from "./Header";
import { auth, db } from "../Config/Config";
import { Todos } from "./Todos";
import { Modal } from "./Modal";
import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { TimePicker } from "@mui/x-date-pickers";
export const Home = ({
  currentUser,
  todos,
  deleteTodo,
  editTodoValue,
  editModal,
  updateTodoHandler,
}) => {
  const [todo, setTodo] = useState("");
  const [description, setDecription] = useState("");
  const [todoError, setTodoError] = useState("");
  const [times, setTimes] = useState([]);
  const [time, setTime] = useState(null);
  const handleTodoSubmit = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("todos of " + user.uid)
          .add({
            Todo: todo,
            description: description,
          })
          .then(console.log)
          .catch((err) => setTodoError(err.message));
        times.forEach((time) => {
          var token;
          db.collection('users').doc(user.uid).get().then(
            (snap)=>{
              token =  snap.data().token;
              db.collection("notifications")
            .add({
              Todo: todo,
              description: description,
              whenToNotify:
                time.$d > Date.now() ? time.$d : time.add(1, "day").$d,
              notificationSent: false,
              token : token
            })
            .then(setTodo(""))
            .catch((err) => setTodoError(err.message));
            }
          )
        });
      } else {
        console.log("user is not signed in to add medication to database");
      }
    });
  };
  const addTime = () => {
    setTimes([...times, time]);
    console.log(time);
  };
  const deleteTime = (time) => {
    setTimes(times.filter((t) => t !== time));
  };
  return (
    <div className="wrapper">
      <Header currentUser={currentUser} />
      <br></br>
      <br></br>
      <div className="container">
        <form
          autoComplete="off"
          className="form-group"
          onSubmit={handleTodoSubmit}
        >
          {currentUser && (
            <>
              <input
                type="text"
                placeholder="Enter the medicine name"
                className="form-control my-4"
                required
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
              />
              <input
                type="text"
                placeholder="Enter the description"
                className="form-control my-4"
                required
                onChange={(e) => setDecription(e.target.value)}
                value={description}
              />
              <div className="d-flex align-items-center">
                <TimePicker ampm={false} onChange={setTime} value={time} />
                <div onClick={addTime} className="btn btn-primary mx-3">
                  Add time
                </div>
              </div>
              <div className="d-flex">
                {times.map((time) => (
                  <div className="timestamp" key={time}>
                    <p>
                      {`${time.hour()}`.length < 2
                        ? "0" + time.hour()
                        : time.hour()}
                      :
                      {`${time.minute()}`.length < 2
                        ? "0" + time.minute()
                        : time.minute()}
                    </p>
                    <Icon
                      className="icon"
                      onClick={() => deleteTime(time)}
                      size={18}
                      icon={trash}
                    />
                  </div>
                ))}
              </div>
              <br></br>
              <div
                style={{
                  width: 100 + "%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ width: 100 + "%" }}
                >
                  ADD
                </button>
              </div>
            </>
          )}

          {!currentUser && (
            <>
              <input
                type="text"
                placeholder="Enter medications"
                className="form-control"
                required
                disabled
              />
              <br></br>
              <div
                style={{
                  width: 100 + "%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled
                  style={{ width: 100 + "%" }}
                >
                  ADD
                </button>
              </div>
              <div className="error-msg">
                Please register your account or login to use application
              </div>
            </>
          )}
        </form>
        {todoError && <div className="error-msg">{todoError}</div>}
        <Todos todos={todos} deleteTodo={deleteTodo} editModal={editModal} />
      </div>

      {editTodoValue && (
        <Modal
          editTodoValue={editTodoValue}
          editModal={editModal}
          updateTodoHandler={updateTodoHandler}
        />
      )}
    </div>
  );
};
