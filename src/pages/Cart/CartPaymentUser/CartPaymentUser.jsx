import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default class CartPaymentUser extends Component {

    constructor(props){

        super(props);

        this.state = {review: null};
        
        this.reviewOrder = this.reviewOrder.bind(this);

        this.callRef = React.createRef();
    };

    reviewOrder(arr) {

        const errors = document.querySelectorAll("p.text-danger");

        let flag = true;

        for (let i = 0 ; i < errors.length ; i++) {

            if (errors[i].style.display === "block") {
                
                flag = false;
                break;
            }
        } 

        if (flag) {

            this.setState({review: arr});

            setTimeout(() => {
                this.callRef.current.click();
            },0)
        }
    }

    render() {

        if (this.props.location.params) {
            return (
                <div className="lead" style={{margin: "0 auto", width: "95%"}}>

                    <br/><br/><br/><br/>

                    <div>
                        <ol className="breadcrumb">
                            <li><NavLink to="/cart" style={{textDecoration: "none"}}>Go back to shopping cart</NavLink></li>
                        </ol>
                    </div>

                    <form className="row" method="POST" onSubmit={e => { e.preventDefault(); this.reviewOrder(e.target);}}>

                        <div className="col-sm">
                            
                            <h3>1) Shipping Method</h3>

                            <br/>

                            <input type="radio" name="shipping" value="Pick Up,0" required/>
                            &ensp;<label>Pick Up - ₪0.00</label>

                            <br/><br/>

                            <input type="radio" name="shipping" value="Standard Mail,0" required/>
                            &ensp;<label>Standard Mail - ₪0.00</label>

                            <br/><br/>

                            <input type="radio" name="shipping" value="UPS Delivery,50" required/>
                            &ensp;<label>UPS Delivery - ₪50.00</label>
                            
                        </div>

                        <div className="col-sm">
                            
                            <h3>2) Payment Method</h3>

                            <br/>

                            {/* <input type="radio" name="payment" value="Credit Card" required onClick={() => window.open("/cc",'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1090px, height=550px, top=25px left=120px')}/> */}
                            <input type="radio" name="payment" value="PayPal / Credit Card" required/>
                            &ensp;<label>PayPal / Credit Card</label>

                            <br/><br/>

                            {/* <input type="radio" name="payment" value="PayPal" required onClick={() => window.open("/pp",'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1090px, height=550px, top=25px left=120px')}/> */}
                            <input type="radio" name="payment" value="Cash" required disabled/>
                            &ensp;<label>Cash</label>
                            
                        </div>

                        <div className="col-sm">
                            
                            <h3>3) Review Order</h3>

                            <br/>

                            <button className="btn btn-primary">Click Here To Review Your Order</button>
                            
                        </div>

                        <Link to={{pathname: "/cart/user/payment", params: this.props.location.params, review: this.state.review}}><button style={{display: "none"}} ref={this.callRef}></button></Link>

                    </form>

                    <br/><br/><br/>

                </div>
            )
        }

        else {
            {this.props.history.goBack()}
        }
    }
}
