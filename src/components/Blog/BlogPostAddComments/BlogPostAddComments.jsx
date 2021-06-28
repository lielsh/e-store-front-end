import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function BlogPostAddComments() {

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function postComment(e) {

        e.preventDefault();

        const comment = e.target[1].value;

        const confirm = window.confirm("Inappropriate posts will be deleted!\nAre you sure you want to continue?");

        if (confirm) {

            window.alert("Your comment was sent successfully!");
            window.location.reload();
        }
    }

    return (
        <>
            <div style={{position: "relative", float: "right"}}>
                <button className="btn btn-outline-danger" onClick={handleShow}><i>Post a comment</i></button>
            </div>
            
            <Modal show={show} onHide={handleClose} animation={false} dialogClassName="custom-modal">
                <Form method="POST" onSubmit={(e) => postComment(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post a comment</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Control type="textarea" placeholder="Leave your comment here" name="comment" required/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type="submit" variant="outline-primary">Submit</Button>
                        <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            
        </>
    )
}
