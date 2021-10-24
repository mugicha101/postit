import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import ls from "local-storage"

const SignUp = () => {
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
        let accountList = ls.get("accounts")
        if (!(accountList && document.getElementById("formBasicEmail").value in accountList)) {
            ls.set("user", document.getElementById("formBasicEmail").value)
            if (!accountList) {
                accountList = {}
            }
            accountList[document.getElementById("formBasicEmail").value] = 
            {"name": document.getElementById("formBasicUsername").value, "password": document.getElementById("formBasicPassword").value}
            ls.set("accounts", accountList)
            window.location="/"
        } else {
            setError("That email is taken already.")
        }
    };

    return (
      <div>
        <div id="content">
          <ReactMarkdown source={app_background} />
          <h1 class="text-black"> Sign Up </h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email"/>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="username" placeholder="Enter a display name"/>
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

  export default SignUp;