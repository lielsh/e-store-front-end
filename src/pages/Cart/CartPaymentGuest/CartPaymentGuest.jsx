import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default class CartPaymentGuest extends Component {

    constructor(props){

        super(props);

        this.state = {review: null};
        
        this.checkInput = this.checkInput.bind(this);
        this.reviewOrder = this.reviewOrder.bind(this);

        this.callRef = React.createRef();
    };

    checkInput(value, p, pe, type) {

        switch (type) {

            case "name":

                if (/^[a-zA-Z-' ]+$/.test(value) && value.charAt(0) !== " ") {

                    document.querySelector("#"+p).style.display = "block";
                    document.querySelector("#"+pe).style.display = "none";
                }
                
                else {
        
                    document.querySelector("#"+p).style.display = "none";
                    document.querySelector("#"+pe).style.display = "block";
                }
                
                break;

            case "email":

                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

                    document.querySelector("#"+p).style.display = "block";
                    document.querySelector("#"+pe).style.display = "none";
                }
                
                else {
        
                    document.querySelector("#"+p).style.display = "none";
                    document.querySelector("#"+pe).style.display = "block";
                }
                
                break;

            case "mobile":

                if (/^[0-9]+$/.test(value) && value.charAt(0) === "0") {

                    document.querySelector("#"+p).style.display = "block";
                    document.querySelector("#"+pe).style.display = "none";
                }
                
                else {
        
                    document.querySelector("#"+p).style.display = "none";
                    document.querySelector("#"+pe).style.display = "block";
                }
                
                break;

            case "address":

                if (/^[a-zA-Z0-9-' ]+$/.test(value)) {

                    document.querySelector("#"+p).style.display = "block";
                    document.querySelector("#"+pe).style.display = "none";
                }
                
                else {
        
                    document.querySelector("#"+p).style.display = "none";
                    document.querySelector("#"+pe).style.display = "block";
                }
                
                break;
    
            default:
                break;
        }
    }

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

                            <h3>1) Personal Details</h3>

                            <br/>

                            <label>*First Name:</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pFName1', 'pFNameE1', "name")} required defaultValue={this.props.location.review ? this.props.location.review[0].value : ""}/>
                            <p id="pFName1"></p>
                            <p className="text-danger" id="pFNameE1" style={{display: "none"}}>English alphabet and -' only</p>

                            <label>*Last Name:</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pLName1', 'pLNameE1', "name")} required defaultValue={this.props.location.review ? this.props.location.review[1].value : ""}/>
                            <p id="pLName1"></p>
                            <p className="text-danger" id="pLNameE1" style={{display: "none"}}>English alphabet and -' only</p>

                            <label>*Mobile:&emsp;&ensp;&thinsp;</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pMobile', 'pMobileE', "mobile")} minLength='9' maxLength='10' required defaultValue={this.props.location.review ? this.props.location.review[2].value : ""}/>
                            <p id="pMobile"></p>
                            <p className="text-danger" id="pMobileE" style={{display: "none"}}>Please enter a valid mobile number</p>

                            <label>*Email:&emsp;&ensp;&ensp;</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pEmail', 'pEmailE', "email")} required defaultValue={this.props.location.review ? this.props.location.review[3].value : ""}/>
                            <p id="pEmail"></p>
                            <p className="text-danger" id="pEmailE" style={{display: "none"}}>Please enter a valid email</p>

                            <input type="checkbox"/>
                            &ensp;<label>Subscribe to our Newsletter</label>

                        </div>

                        <div className="col-sm">
                            
                            <h3>2) Shipping Details</h3>

                            <br/>

                            <label>*First Name:</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pFName2', 'pFNameE2', "name")} required defaultValue={this.props.location.review ? this.props.location.review[5].value : ""}/>
                            <p id="pFName2"></p>
                            <p className="text-danger" id="pFNameE2" style={{display: "none"}}>English alphabet and -' only</p>

                            <label>*Last Name:</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pLName2', 'pLNameE2', "name")} required defaultValue={this.props.location.review ? this.props.location.review[6].value : ""}/>
                            <p id="pLName2"></p>
                            <p className="text-danger" id="pLNameE2" style={{display: "none"}}>English alphabet and -' only</p>

                            <label>*Address 1:&ensp;</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pAddress1', 'pAddressE1', "address")} required defaultValue={this.props.location.review ? this.props.location.review[7].value : ""}/>
                            <p id="pAddress1"></p>
                            <p className="text-danger" id="pAddressE1" style={{display: "none"}}>English alphabet, digits and -' only</p>

                            <label>Address 2:&nbsp;</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'pAddress2', 'pAddressE2', "address")} defaultValue={this.props.location.review ? this.props.location.review[8].value : ""}/>
                            <p id="pAddress2"></p>
                            <p className="text-danger" id="pAddressE2" style={{display: "none"}}>English alphabet, digits and -' only</p>
                     
                            <label>*City:&emsp;&emsp;&ensp;&nbsp;</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'city', 'cityE', "name")} required defaultValue={this.props.location.review ? this.props.location.review[9].value : ""}/>
                            <p id="city"></p>
                            <p className="text-danger" id="cityE" style={{display: "none"}}>English alphabet and -' only</p>
                            
                            <label>*Country:&emsp;</label>
                            &ensp;<input type="text" onChange={(e) => this.checkInput(e.target.value, 'country', 'countryE', "name")} required defaultValue={this.props.location.review ? this.props.location.review[10].value : ""}/>
                            <p id="country"></p>
                            <p className="text-danger" id="countryE" style={{display: "none"}}>English alphabet and -' only</p>
                            
                            <label>Comments:</label>
                            &ensp;<textarea maxLength='50' style={{resize: "none"}} defaultValue={this.props.location.review ? this.props.location.review[11].value : ""}/>

                        </div>

                        <div className="col-sm">
                            
                            <h3>3) Shipping Method</h3>

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
                            
                            <h3>4) Payment Method</h3>

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
                            
                            <h3>5) Review Order</h3>

                            <br/>

                            <button className="btn btn-primary">Click Here To Review Your Order</button>
                            
                        </div>

                        <Link to={{pathname: "/cart/guest/payment", params: this.props.location.params, review: this.state.review}}><button style={{display: "none"}} ref={this.callRef}></button></Link>

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
