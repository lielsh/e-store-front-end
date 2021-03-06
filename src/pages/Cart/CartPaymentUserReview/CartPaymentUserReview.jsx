import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PayPal from '../../../components/Cart/PayPal/PayPal';
import { connect } from 'react-redux';

class CartPaymentUserReview extends Component {

  constructor(props) {

    super(props);

    this.state = {callRef: React.createRef(), paypal: "", products: {}};

    const temp = {};
    
    for (const [key, value] of Object.entries(this.props.location.params.productsInCart)) {
        
      for (let prod of this.props.products) {

          if (key === prod.id) {

              temp[prod.id] = prod;
          }
      }
    }

    this.state.products = temp;
  };

  componentDidMount() {

    if (this.props.location.params)
      this.setState({paypal: <PayPal total={this.state.callRef} params={this.props.location.params} review={this.props.location.review} user={this.props.user}/>})
  }

  render() {
    if (this.props.location.params) {
      return (
        <div className="lead" style={{margin: "0 auto", width: "95%"}}>

          <br/><br/><br/><br/>

          <div>
            <ol className="breadcrumb">
                <li><NavLink to={{pathname: "/cart/user", params: this.props.location.params, review: this.props.location.review}} style={{textDecoration: "none"}}>Go back to details</NavLink></li>
            </ol>
          </div>
          
          <div className="row">

            <div className="col-sm">
              
              <table>

                <tbody>

                {Object.keys(this.props.location.params.productsInCart).map((id, count) => 
                            <tr style={{fontSize: "20px"}} key={count}>
                                <th scope="row" style={{verticalAlign: "middle"}}>{++count}</th>
                                <td style={{verticalAlign: "middle"}}><Link to={"/shop/"+this.state.products[id].name}><img src={this.state.products[id].img[0]} alt={JSON.stringify(this.state.products[id].name)} width="50px"/></Link></td>
                                <td style={{verticalAlign: "middle"}}><Link to={"/shop/"+this.state.products[id].name}>{this.state.products[id].title}</Link></td>
                                <td style={{verticalAlign: "middle"}}>&emsp;???{this.state.products[id].discount ? (this.state.products[id].price * (1-this.state.products[id].discountPercentage)).toFixed(2) : (this.state.products[id].price).toFixed(2)}</td>
                                <td style={{verticalAlign: "middle"}}>&emsp;x{this.props.location.params.productsInCart[id]}</td>
                                <td style={{verticalAlign: "middle"}}>&emsp;???{this.state.products[id].discount ? (this.state.products[id].price * (1-this.state.products[id].discountPercentage) * this.props.location.params.productsInCart[id]).toFixed(2) : (this.state.products[id].price * this.props.location.params.productsInCart[id]).toFixed(2)}</td>
                            </tr>
                            )
                  }

                </tbody>

              </table>

            </div>

            <div className="col-sm">

              <table>

                <tbody>

                  <tr>
                    <th>Shipping Method</th>
                    <th>&emsp;</th>
                    <th>Payment Method</th>
                  </tr>

                  <tr>
                    <td>
                      {this.props.location.review[0].checked ? this.props.location.review[0].value.split(",")[0] + ": ???"  + this.props.location.review[0].value.split(",")[1] + ".00": 
                        this.props.location.review[1].checked ? this.props.location.review[1].value.split(",")[0] + ": ???"  + this.props.location.review[1].value.split(",")[1] + ".00": 
                        this.props.location.review[2].value.split(",")[0] + ": ???"  + this.props.location.review[2].value.split(",")[1] + ".00"}
                    </td>
                    <td>&emsp;</td>
                    <td>{this.props.location.review[3].value}</td>
                  </tr>

                </tbody>

              </table>
            </div>

          </div>
          
          <br/><br/><br/>

          <div className="row">

            <div className="col-sm">
                  
              <table>

                <tbody>

                    <tr>
                      <td>Total before fees:</td>
                      <td>&emsp;</td>
                      <td>???{this.props.location.params.total.replace(/,/g, "")}</td>
                    </tr>

                    <tr>
                      <td>Taxes:</td>
                      <td>&emsp;</td>
                      <td>???0.00</td>
                    </tr>

                    <tr>
                      <td>Shipping:</td>
                      <td>&emsp;</td>
                      <td>
                        {this.props.location.review[0].checked ? "???"  + this.props.location.review[0].value.split(",")[1] + ".00": 
                          this.props.location.review[1].checked ? "???"  + this.props.location.review[1].value.split(",")[1] + ".00": 
                          "???"  + this.props.location.review[2].value.split(",")[1] + ".00"}
                      </td>
                    </tr>
                    
                    <tr>
                      <td>Coupons:</td>
                      <td>&emsp;</td>
                      <td className="text-success">{this.props.location.params.couponsArr.map((coupon,count) => count === this.props.location.params.couponsArr.length-1 ? coupon : coupon + ", ")}</td>
                    </tr>

                    <tr style={{fontWeight: "bold"}}>
                      <td>Total after fees + coupons:</td>
                      <td>&emsp;</td>
                      <td ref={this.state.callRef}>???{(parseFloat(this.props.location.params.total.replace(/,/g, ""))*this.props.location.params.coupon+
                          parseFloat(this.props.location.review[0].checked ? this.props.location.review[0].value.split(",")[1]: 
                          this.props.location.review[1].checked ? this.props.location.review[1].value.split(",")[1]: 
                          this.props.location.review[2].value.split(",")[1])).toFixed(2)}
                      </td>
                    </tr>

                  </tbody>

              </table>

            </div>

            <div className="col-sm" style={{color: "white"}}>

              {this.state.paypal}

            </div>

          </div>

          <br/><br/><br/>
          {/* {console.log(this.props.location)}
            {console.log(this.props.location.params)} */}


        </div>
      )
    }

    else {
      {this.props.history.goBack()}
    }
  }
}

const mapStateToProps = state => ({
  products: state.global.data.products
})

export default connect(mapStateToProps)(CartPaymentUserReview)