import React from 'react';
import { useState } from 'react';
import PayPalButton from '../PayPalButton/PayPalButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emptyProductCart } from '../../../actions/actions';
import Spinner from '../../Spinner/Spinner';

function PayPal(props) {

    const [checkout, setCheckOut] = useState(false);

    const amount = props.total.current.innerText.split("₪")[1];

    let callRef = React.createRef();

    return (
        <div id="paypal-button-container">
            <Link to={{pathname: "/confirmation", params: "OK"}} onClick={() => props.emptyProductCart()}><button style={{display: "none"}} ref={callRef}></button></Link>

            {checkout ? 
                <div>
                    <div id="beforePayPal" style={{display: "block"}}><PayPalButton amount={amount} params={props.params} review={props.review} user={props.user}/></div>
                    <div id="afterPayPal" style={{display: "none"}}><h1 style={{color: "black", textAlign: "center"}}>Please wait...</h1><Spinner/></div>
                </div>
                : <button className='btn btn-primary' onClick={()=> { setCheckOut(true) }}> Checkout with PayPal / Credit Card </button>
            }

            {props.loading ? document.querySelector("#beforePayPal").style.display = "none" : null}
            {props.loading ? document.querySelector("#afterPayPal").style.display = "block" : null}

            {setInterval(() => {
                if ((localStorage.getItem("Order")) && (callRef.current))
                    callRef.current.click();
            },0)}

        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.global.loading
})

export default connect(mapStateToProps, { emptyProductCart })(PayPal)