import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import ls from "local-storage"

const SignIn = () => {
    const [error, setError] = useState("");

    useEffect(() => {
        if (ls.get("user")) {
            window.location="/"
        }
    });

    const cancel = function(event) {
        event.preventDefault();
        window.location='/';
    };

    const submit = function(event) {
        event.preventDefault();
        let postlist = ls.get("accounts")
        if (postlist 
            && postlist[document.getElementById("formBasicEmail").value] 
            && postlist[document.getElementById("formBasicEmail").value]["password"] == document.getElementById("formBasicPassword").value) {
            ls.set("user", document.getElementById("formBasicEmail").value)
            window.location="/"
        } else {
            setError("We could not find that combination of username and password.")
        }
    };

    return (
      <div>
        <div id="content">
          <ReactMarkdown source={app_background} />
          <h1 class="text-black"> Sign In </h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password"/>
            </Form.Group>
            {
                error != "" && <Form.Text>{error}</Form.Text> 
            }
            <br/>
            <button class="fancy medium remove" id="submit" onClick={submit}>Submit</button>
            <button class="fancy medium rename" id="cancel" onClick={cancel}>Cancel</button>
          </Form>
        </div>
      </div>
    );
  };

  export default SignIn;