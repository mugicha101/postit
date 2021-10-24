import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";

import { useAuthState } from "react-firebase-hooks/auth";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Post } from "./components";
import ls from "local-storage";
//import firebase from "./firebase.js"

/**
 * TODO:
 * 1. Complete all the instructions here in App.js
 * 2. Complete all the instructions in the task.js file (also change the footer to your name)
 * 3. Delete these comments & feel free to play around with bootstrap!
 * 4. Optional Challenge: Add buttons to delete tasks!
 */

const App = () => {
  // I've already added currTask for you as an example of useState!
  const [currTask, setCurrTask] = useState("");
  // follow this example above & with the useState hook, create a variable called tasks. its default value is an empty array []
  const [tasks, setTasks] = useState(["pog"]);
  let posts = ls.get("posts");
  if (posts === null)
    posts = []
  // firebase.ref("stuff").once("value").then(function(snapshot) {
  //   console.log(snapshot.val())
  // })
  //sort the posts by upvotes
  /**
   * TODO: create a regular function called handleInput that takes in a parameter called event & updates currTask
   * using setCurrTask
   * Hint: event is an object in JavaScript that contains a bunch of information about the element that the user interacted with. In this case
   * event belongs to the FormControl element, which is where the task is being inputed. We want to find where in the event object, the string
   * value entered by the user is being stored. In this case, it's stored here: event.target.value
   */
  const handleInput = (event) => {
    event.preventDefault(); // this prevents the page from refreshing when the button is clicked
    // TODO: call setCurrTask and pass it the string the user inputed
    setCurrTask(event.target.value);
  };

  /**
   * TODO: create an arrow function called addTask that adds currTask to the tasks array
   * Hint: in javascript, you can easily add to an array using the spread (...) operator. This takes
   * everything in the array and adds the newest element to it
   * Example: const old_array = ["hi", "bye"]
   *          const new_array = [...old_array, "wow"] (we're adding the string "wow")
   *          console.log(new_array) -> ["hi", "bye", "wow"]
   */
  
  const addTask = function(event) {
    event.preventDefault();
    if (currTask === "")
      return;
    
    setTasks([...tasks, tasks.length.toString()+currTask]);
  };

  const createPost = function(event) {
    event.preventDefault();
    window.location="/create"
  };

  const signOut = function(event) {
    event.preventDefault();
    ls.remove("user")
    window.location="/"
  };

  const signIn = function(event) {
    event.preventDefault();
    window.location="/signin"
  };

  const signUp = function(event) {
    event.preventDefault();
    window.location="/signup"
  };

  const tester = function(event) {
    ls.clear()
  };

  return (
    <div>
      <div id="content">
        <ReactMarkdown source={app_background} />
        <h1> Feed </h1>
        <Form>
          <Form.Group controlId="form-input" placeholder="Enter a task" onChange={handleInput}>
            {/**
             * TODO: pass 2 props to the FormControl element
             * 1. placeholder (string) -> pass a string explaining what the input is for (ex: "Enter a task!")
             * 2. onChange (function) -> pass one of the functions above that handles the user's input
             */}
            {/*<FormControl />*/}
            <InputGroup.Append>
              {/** TODO: Add a prop & add some text to the button
               * 1. onClick (function) -> pass one of the functions above that handles a task being added
               * 2. Add text between the open and closing button tags, describing what the button should say
               */}
              {
                ls.get("user") != null && 
                <div>
                  <button class="add_task" id="add task" onClick={createPost}>Create Post</button>
                  <button class="add_task" id="add task" onClick={signOut}>Sign Out</button>
                </div>
              }
              {
                ls.get("user") == null && 
                <div class="authentication">
                  <button class="add_task" id="add task" onClick={signIn}>Log In</button> 
                  <button class="add_task" id="add task" onClick={signUp}>Sign Up</button> 
                </div>
              }
              
              {/* <button class="add_task" id="add task" onClick={tester}>clear</button> */}
            </InputGroup.Append>
          </Form.Group>
        </Form>
        {/*using your tasks array, map through it and pass each task string to the Task component via the name prop*/}
        {posts.map((post) => (
          <div>
            <Post id={post.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;