import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';



export function UploadVideo() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  function handleSubmit() {
    // axios('https://obs-tool-api-prajwal080501.onrender.com/videos/addvideo',{
    //   method:"POST",
    //   withCredentials: true,
    //  headers: {
    //     'token':`Bearer ${currentUser?.data?.token}`
    //   },
    //   data:{
    //     "userId": currentUser?.data?._id,
    //     "uploadedBy": currentUser.data.name,
    //     "title":title,
    //     "description": description,
    //     "role": currentUser?.data?.role,
    //     "videoUrl": url
    //        }
    // }).then((e)=>alert(e.data.message)).catch((err)=>console.log(err))
  }

 
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <UploadOutlined/> Click to Upload
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload A Video</Modal.Title>
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
                required
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
                value={description}
                required
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                value={url}
                autoFocus
                required
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Upload
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
