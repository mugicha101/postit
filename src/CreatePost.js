import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import ls from "local-storage"

const CreatePost = () => {
  useEffect(() => {
    if (!ls.get("user")) {
        window.location="/"
    }
  });

  const cancel = function(event) {
    event.preventDefault();
    window.location='/';
  };

  const publish = function(event) {
    event.preventDefault();
    let postlist = ls.get("posts")
    if (!postlist) {
      postlist = []
    }
    postlist.push({"id": postlist.length, 
    "title": document.getElementById("formTitle").value, 
    "description": document.getElementById("formBody").value, 
    "upvotes": 0, "author": ls.get("accounts")[ls.get("user")]["name"],
    "voted": {}})
    ls.set("posts", postlist);
    window.location='/';
  };

    return (
      <div>
        <div id="content">
          <ReactMarkdown source={app_background} />
          <h1 class="text-black"> Create Post </h1>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Control type="title" placeholder="Enter a title"/>
            </Form.Group>
            <Form.Group controlId="formBody">
              <Form.Control type="body" as="textarea" placeholder="Enter a description"/>
            </Form.Group>
            <button class="fancy medium rename" id="publish" onClick={publish}>Publish</button>
            <button class="fancy medium remove" id="cancel" onClick={cancel}>Cancel</button>
          </Form>
          {/*using your tasks array, map through it and pass each task string to the Task component via the name prop*/}
        </div>
      </div>
    );
  };

  export default CreatePost;