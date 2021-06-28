// https://react-bootstrap.netlify.app/components/modal/#modals

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { addProductCart, setLoading } from '../../../actions/actions';

function ProductsQuickView(props) {

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let callRef = React.createRef();
    callRef = {current: {value: 1}};

    return (
      <>
        <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShow}>
            <i className="fas fa-search"></i>
        </button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <img src={props.img} alt={props.name} height="150px"/>
              <p>{props.subtitle}</p>
              {props.price}
              {props.newPrice}
              {props.rating}
              {props.status}
              &emsp;{props.status.props.children === "In Stock" ? <select ref={callRef}><option>1</option><option>2</option><option>3</option><option>4</option></select> : null}
              </Modal.Body>
          <Modal.Footer>
            {props.status.props.children === "In Stock" ? <button className="btn btn-outline-primary" onClick={async () => { await props.setLoading(); props.addProductCart(props.id, callRef.current.value); handleClose() }}>Add To <i className="fas fa-shopping-cart"></i></button> : <a href="#" className="btn btn-outline-danger" role="button">Notify Me</a>}
            {props.moreDetails}
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
            <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default connect("", { addProductCart, setLoading })(ProductsQuickView)