// https://react-bootstrap.netlify.app/components/modal/#modals

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import veryPrettyFloat from '../../../functions/veryPrettyFloat';
import './CartQuickView.css';
import { connect } from 'react-redux';
import { addProductCart, delProductCart, setLoading } from '../../../actions/actions';
import Spinner from '../../Spinner/Spinner';

let total;
let products = {};

function CartQuickView(props) {

    total = 0;
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [internalLoading, setInternalLoading] = useState(false);

    if (props.productsInCart && Object.keys(props.productsInCart).length > 0) {

      for (const [key, value] of Object.entries(props.productsInCart)) {
        
        for (let prod of props.products) {

            if (key === prod.id) {

                products[prod.id] = prod;
                total += prod.discount ? (prod.price * (1-prod.discountPercentage) * value) : (prod.price * value);
            }
        }
      }
    }

    total = veryPrettyFloat(total);

    return (
      <>
        <button className="cartButton" onClick={handleShow}><i className="fas fa-shopping-cart"></i></button>

        <Modal show={show} onHide={handleClose} animation={false} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {internalLoading ? <Spinner/> :
                <table className="table table-hover">
                    <tbody>
                    {props.productsInCart && Object.keys(props.productsInCart).length > 0 ? Object.keys(props.productsInCart).map((id, count) => 
                            <tr style={{fontSize: "20px"}} key={count}>
                                <th scope="row" style={{verticalAlign: "middle"}}>{++count}</th>
                                <td style={{verticalAlign: "middle"}}><Link to={"/shop/"+products[id].name}><img src={products[id].img[0]} alt={JSON.stringify(products[id].name)} width="60px"/></Link></td>
                                <td style={{verticalAlign: "middle"}}><Link to={"/shop/"+products[id].name}>{products[id].title}</Link></td>
                                <td style={{verticalAlign: "middle"}}>₪{products[id].discount ? (products[id].price * (1-products[id].discountPercentage)).toFixed(2) : (products[id].price).toFixed(2)}</td>
                                <td style={{verticalAlign: "middle"}}>x&emsp;<input type="number" min="1" max="4" defaultValue={props.productsInCart[id]} style={{width: "60px", textAlign: "center"}} id={"quantity"+id}/></td>
                                <td style={{verticalAlign: "middle"}}>₪{products[id].discount ? (products[id].price * (1-products[id].discountPercentage) * props.productsInCart[id]).toFixed(2) : (products[id].price * props.productsInCart[id]).toFixed(2)}</td>
                                <td style={{verticalAlign: "middle"}}> <Button variant="outline-warning" onClick={async () => { await props.setLoading(); await props.addProductCart(id, document.querySelector("#quantity"+id).value); setInternalLoading(true); setInternalLoading(false); }}>Update</Button></td>
                                <td style={{verticalAlign: "middle"}}> <Button variant="outline-danger" onClick={async () => { await props.setLoading(); await props.delProductCart(id); setInternalLoading(true); setInternalLoading(false); }}>Remove</Button></td>
                            </tr>
                            )

                    : 
                            <tr>
                                <td>No products in the shopping cart</td>
                            </tr>
                    }
                    </tbody>
                </table>
              } 
              </Modal.Body>
          <Modal.Footer>
            <Modal.Title>
                {
                    props.productsInCart && Object.keys(props.productsInCart).length > 0 ? "Total: ₪" + total : null
                }
            </Modal.Title>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            {props.productsInCart && Object.keys(props.productsInCart).length > 0 ? <Link to="/cart"><Button variant="outline-success" onClick={handleClose}>Proceed To Checkout</Button></Link> : null}
            
            <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

const mapStateToProps = state => ({
  products: state.global.data.products,
  productsInCart: state.global.productsInCart
})

export default connect(mapStateToProps, { addProductCart, delProductCart, setLoading })(CartQuickView)