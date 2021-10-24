import React, {useState, useEffect} from "react";
import ls from "local-storage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Post = ({ id }) => {
  let posts = ls.get("posts");
  let userEmail = ls.get("user");
  const [upvoted, setUpvoted] = useState(userEmail && userEmail in posts[id]["voted"]);

  // useEffect(() => {
  //   postsAll = ls.get("posts")
  //   userEmail = ls.get("user")
  // });

  const upvote = function(event) {
      event.preventDefault();
      let postsAll = ls.get("posts")
      let user = ls.get("user")
      if (user) {
        if (user in postsAll[id]["voted"]) {
          postsAll[id].upvotes--;
          delete postsAll[id].voted[user]
          ls.set("posts", postsAll);
          setUpvoted(false)
        } else {
          postsAll[id].upvotes++;
          postsAll[id].voted[user] = 1
          ls.set("posts", postsAll);
          setUpvoted(true)
          document.getElementById("upvotebutton-"+id).textContent = postsAll[id].upvotes;
        }
      }
  }
  return (
    <div className="p-0 m-0 label">
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <Col sm = {4} className="p-0 m-0">
            
              <Row className="p-0 m-0">
                <Col><div className="text-center title" id={"posttitle-"+id}>{ls.get("posts")[id].title}</div></Col>
              </Row>
            <Container className="p-0 m-0">
              <Row className="p-0 m-0">
                <Col><div className="author">{"By: "+ls.get("posts")[id].author}</div></Col>
              </Row>
              <Row className="p-0 m-0">
                <Col><div className="upvotes" id={"upvotes-"+id}>
                  {
                    upvoted && <FontAwesomeIcon icon={faArrowAltCircleUp} className="clicked"/>
                  }
                  {
                    !upvoted && <FontAwesomeIcon icon={faArrowAltCircleUp} className="unclicked"/>
                  }
                  {
                    upvoted &&  <button id={"upvotebutton-"+id} onClick={upvote} class="medium fancy upvote green">{ls.get("posts")[id].upvotes}</button>
                  }
                  {
                    !upvoted &&  <button id={"upvotebutton-"+id} onClick={upvote} class="medium fancy upvote">{ls.get("posts")[id].upvotes}</button>
                  }
                  {
                    upvoted && <FontAwesomeIcon icon={faArrowAltCircleUp} className="clicked"/>
                  }
                  {
                    !upvoted && <FontAwesomeIcon icon={faArrowAltCircleUp} className="unclicked"/>
                  }
                </div></Col>
              </Row>
            </Container>
          </Col>
          <Col sm = {8} className="p-0 m-0"><div className="description"><p>{ls.get("posts")[id].description}</p></div></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
