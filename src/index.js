import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { Header, Footer } from "./components";
import App from "./App";
import CreatePost from "./CreatePost";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => (
  <div className="main">
    <BrowserRouter>
      <script src="/__/firebase/8.10.0/firebase-app.js"></script>
      <script src="/__/firebase/8.10.0/firebase-database.js"></script>

      <Header />
      <div>
        <Route exact path="/" component={App} />
        <Route path="/create" component={CreatePost} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
      <Footer />
    </BrowserRouter>
  </div>
);

ReactDOM.render(<Index />, document.getElementById("root"));
