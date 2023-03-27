import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const UpdateVideo = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [userId, setUserId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function EditVideo(id) {
    // alert(id);
    // console.log(title, description, url);
    // let data = { title, description, url, userId };
    // axios
    //   .put(
    //     `https://obs-tool-api-prajwal080501.onrender.com/videos/updatevideo/${userId}`,
    //     {
    //       body: data,
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((success) => {
    //     alert("data updated", success);
    //   })
    //   .catch((error) => {
    //     alert("failed", error);
    //   });
  }
  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>URl</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" onClick={EditVideo}>
                Update
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateVideo;
