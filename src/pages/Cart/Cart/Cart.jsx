import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import CartPayment from '../../../components/Cart/CartPayment/CartPayment'
import { Link } from 'react-router-dom';
import veryPrettyFloat from '../../../functions/veryPrettyFloat';
import { connect } from 'react-redux';
import { addProductCart, delProductCart, setLoading } from '../../../actions/actions';
import Spinner from '../../../components/Spinner/Spinner';

class Cart extends Component {

    constructor(props) {

        super(props);

        this.state = {total: 0.00, shipping: 0.00, taxes: 0.00, coupon: 1.00, couponsArr: [], validCoupons: [], inValidCoupons: "", internalLoading: false, products: {}};

        this.callRefInp = React.createRef();
        this.callRefBtn = React.createRef();

        this.applyCoupon = this.applyCoupon.bind(this);
        this.setInternalLoading = this.setInternalLoading.bind(this);
        this.updateTotal = this.updateTotal.bind(this);

        const temp = {};

        if (this.props.productsInCart && Object.keys(this.props.productsInCart).length > 0) {

            for (const [key, value] of Object.entries(this.props.productsInCart)) {
        
                for (let prod of this.props.products) {

                    if (key === prod.id) {

                        temp[prod.id] = prod;
                        this.state.total += prod.discount ? (prod.price * (1-prod.discountPercentage) * value) : (prod.price * value);
                    }
                }
            }
            
            this.state.products = temp;
            this.state.total = veryPrettyFloat(this.state.total);
        }
    }
    
    removeSpaces(e) {

        e.target.value = e.target.value.replace(/ /g, "").toUpperCase();
    }

    applyCoupon() {

        let input = this.callRefInp.current.value;
        let arr = [...this.state.couponsArr];
        let coupon = this.state.coupon;
        let validCoupons = [...this.state.validCoupons];

        let flag = false;
        let i;

        for (i = 0 ; i < this.props.coupons.length ; i++) {

            if ((input === this.props.coupons[i].name) && this.props.coupons[i].active) {

                flag = true;
                break;
            }

        }

        if (flag) {

            if (arr.indexOf(input) === -1) {

                arr.push(input);

                coupon -= this.props.coupons[i].discount;

                validCoupons.push(<p className="text-success">"{input}" applied successfully</p>);

                this.setState({coupon, couponsArr: arr, validCoupons, inValidCoupons: <p style={{display: "none"}}></p>});
            }
        }

        else {

            let message = <p className="text-danger">"{input}" is an invalid coupon</p>;
            this.setState({inValidCoupons: message});
        }

        this.callRefInp.current.value = "";

    }

    setInternalLoading() {

        this.setState({internalLoading: !this.state.internalLoading});
    }

    updateTotal() {

        if (this.props.productsInCart && Object.keys(this.props.productsInCart).length > 0) {

            let total = 0.00;

            Object.keys(this.props.productsInCart).map(id => total += this.state.products[id].discount ? (this.state.products[id].price * (1-this.state.products[id].discountPercentage) * this.props.productsInCart[id]) : (this.state.products[id].price * this.props.productsInCart[id]));
            
            this.setState({ total: veryPrettyFloat(total)});
        }
    }

    render() {
        if (!this.state.internalLoading) {
            return(
            <div className="container lead">
                <br/><br/><br/><br/>

                    <table className="table table-hover" style={{textAlign: "center"}}>
                        <tbody>
                        {this.props.productsInCart && Object.keys(this.props.productsInCart).length > 0 ? Object.keys(this.props.productsInCart).map((id, count) => 
                                <tr style={{fontSize: "20px"}} key={count}>
                                    <th scope="row" style={{verticalAlign: "middle"}}>{++count}</th>
                                    <td style={{verticalAlign: "middle"}}><Link to={"/shop/"+this.state.products[id].name}><img src={this.state.products[id].img[0]} alt={JSON.stringify(this.state.products[id].name)} width="60px"/></Link></td>
                                    <td style={{verticalAlign: "middle"}}><Link to={"/shop/"+this.state.products[id].name}>{this.state.products[id].title}</Link></td>
                                    <td style={{verticalAlign: "middle"}}>₪{this.state.products[id].discount ? (this.state.products[id].price * (1-this.state.products[id].discountPercentage)).toFixed(2) : (this.state.products[id].price).toFixed(2)}</td>
                                    <td style={{verticalAlign: "middle"}}>x&emsp;<input type="number" min="1" max="4" defaultValue={this.props.productsInCart[id]} style={{width: "60px", textAlign: "center"}} id={"quantity"+id}/></td>
                                    <td style={{verticalAlign: "middle"}}>₪{this.state.products[id].discount ? (this.state.products[id].price * (1-this.state.products[id].discountPercentage) * this.props.productsInCart[id]).toFixed(2) : (this.state.products[id].price * this.props.productsInCart[id]).toFixed(2)}</td>
                                    <td style={{verticalAlign: "middle"}}> <Button variant="outline-warning" onClick={async () => { await this.props.setLoading(); await this.props.addProductCart(id, document.querySelector("#quantity"+id).value); this.updateTotal(); this.setInternalLoading(); this.setInternalLoading(); }}>Update</Button></td>
                                    <td style={{verticalAlign: "middle"}}> <Button variant="outline-danger" onClick={async () => { await this.props.setLoading(); await this.props.delProductCart(id); this.updateTotal(); this.setInternalLoading(); this.setInternalLoading(); }}>Remove</Button></td>
                                </tr>
                                )

                        : 
                                <tr>
                                    <td>No products in the shopping cart</td>
                                </tr>
                        }
                        </tbody>
                    </table>

                    {
                        this.props.productsInCart && Object.keys(this.props.productsInCart).length > 0 ?

                        <table className="table table-bordered" style={{tableLayout: "fixed"}}>
                            <tbody>
                                <tr>
                                    <td>Total:</td>
                                    <td style={{textAlign: "center"}}>{"₪" + this.state.total}</td>
                                </tr>
                                {/* <tr>
                                    <td>Shipping:</td>
                                    <td style={{textAlign: "center"}}>{"₪" + this.state.shipping.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Taxes:</td>
                                    <td style={{textAlign: "center"}}>{"₪" + this.state.taxes.toFixed(2)}</td>
                                </tr> */}
                                <tr>
                                    <td>Coupon:</td>
                                    <td style={{textAlign: "center"}}>
                                        <form className="input-group" onSubmit={e => { e.preventDefault(); this.callRefBtn.current.click(); }}>
                                            <input type="text" className="form-control" maxLength='10' style={{textAlign: "center"}} ref={this.callRefInp} onChange={(e) => this.removeSpaces(e)}/>
                                            <input type="button" className="form-control btn btn-success" value="Apply Coupon" onClick={this.applyCoupon} ref={this.callRefBtn}/>
                                        </form>
                                        <br/>{this.state.validCoupons.map(e => e)}{this.state.inValidCoupons}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        : null
                    }

                    {
                        this.props.productsInCart && Object.keys(this.props.productsInCart).length > 0 ?

                        <table className="table">
                            <tbody>
                                <tr style={{fontWeight: "bold"}}>
                                    <td>Total:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
                                    {/* <td>Total after fees:</td> */}
                                    <td>{"₪" + veryPrettyFloat(parseFloat(this.state.total.replace(/,/g,"")*(this.state.coupon))+this.state.shipping+this.state.taxes)}</td>
                                </tr>
                            </tbody>
                        </table>

                        : null
                    }

                    {
                        this.props.productsInCart && Object.keys(this.props.productsInCart).length > 0 ?

                            this.props.user ?

                                <Link to={{pathname: "/cart/user", params: {productsInCart: this.props.productsInCart, total: this.state.total, coupon: this.state.coupon, couponsArr: this.state.couponsArr, validCoupons: this.state.validCoupons, inValidCoupons:"", removeSpaces: this.removeSpaces, applyCoupon: this.applyCoupon}}}><button className="btn btn-primary">Proceed To Payment</button></Link>
                                :
                                <Link to={{pathname: "/sign-in-up", cart: true}}><button className="btn btn-primary">Proceed To Payment</button></Link>
                                // <CartPayment productsInCart={this.props.productsInCart} total={this.state.total} coupon={this.state.coupon} couponsArr={this.state.couponsArr} validCoupons={this.state.validCoupons} inValidCoupons={""} removeSpaces={this.removeSpaces} applyCoupon={this.applyCoupon}/>

                        : null
                    }

                    <br/><br/><br/><br/>
            </div>
            );
        }
        else {
            return <Spinner/>
        }
    }
}

const mapStateToProps = state => ({
    products: state.global.data.products,
    productsInCart: state.global.productsInCart,
    coupons: state.global.data.coupons,
    loading: state.global.loading,
    user: state.global.user
 })

 export default connect(mapStateToProps, { addProductCart, delProductCart, setLoading })(Cart)