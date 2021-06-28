import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function CartPayment(props) {

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <button className="btn btn-primary" onClick={handleShow}>Proceed To Payment</button>

        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Proceed To Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: "center"}}>
            <div style={{position: "relative", float: "left", left: "10%", width: "35%"}}><Link to={{pathname: "/sign-in-up", cart: true}}><button className="btn btn-info" style={{fontSize: "xx-large"}}>Continue as User</button></Link></div>
            <div style={{position: "relative", float: "right", right: "10%", width: "35%"}}><Link to={{pathname: "/cart/guest", params: props}}><button className="btn btn-info" style={{fontSize: "xx-large"}}>Continue as Guest</button></Link></div>
              </Modal.Body>
          <Modal.Footer>    
            <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}