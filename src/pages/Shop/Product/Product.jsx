import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Product.css';
import ratingStars from '../../../functions/ratingStars';
import NotFound from '../../404/NotFound';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux';
import { addProductCart, setLoading } from '../../../actions/actions';

class Product extends Component {

   constructor(props) {

      super(props);

      this.callRef = React.createRef();
      
      // const product = products.filter(prod => prod.name === this.props.match.params.prodName);
      const product = this.props.products.filter(prod => prod.name === window.location.href.split("/shop/")[1]);
      
      if (product.length === 1) {

         this.state = {arr: product[0], src: product[0].img[0], type: product[0].type, addNotify: "", status: "", price: "", newPrice: "", quantity: 1};
      
         this.updateImage = this.updateImage.bind(this);
         this.updateQuantity = this.updateQuantity.bind(this);
         this.setStatusPrice = this.setStatusPrice.bind(this);

         if (this.state.arr.stock) {
            this.state.addNotify = <button type="button" className="btn btn-outline-primary" onClick={async () => { await this.props.setLoading(); this.props.addProductCart(this.state.arr.id, this.state.quantity) }}><span style={{fontSize: "1.25rem", fontWeight: "300"}}>Add to <i className="fas fa-shopping-cart"></i></span></button>;
            this.state.status = <span className="text-success">In Stock</span>;
         }
    
         else {
            this.state.addNotify = <button type="button" className="btn btn-outline-danger"><span style={{fontSize: "1.25rem", fontWeight: "300"}}>Notify Me</span></button>
            this.state.status = <span className="text-danger">Out of Stock</span>;
         }
    
         if (this.state.arr.discount) {
            this.state.price =  <span style={{textDecoration: "line-through"}}>Price: ₪{this.state.arr.price.toFixed(2)}</span>;
            this.state.newPrice = <strong className="text-danger"><br/>Discount: ₪{(this.state.arr.price*(1-this.state.arr.discountPercentage)).toFixed(2)}</strong>;
         } 
    
         else {
            this.state.price = <strong>Price: ₪{this.state.arr.price.toFixed(2)}</strong>;
            this.state.newPrice = <span style={{display: "none"}}>.</span>;
         }
      }

   };

   updateImage(img) {

      this.setState({src: img.target.src});
   }

   updateQuantity() {
      
      this.setState({quantity: parseInt(this.callRef.current.value)});
   }
   
   setStatusPrice(prod) {

         if (prod.stock) {
            this.setState({addNotify: <button type="button" className="btn btn-outline-primary"><span style={{fontSize: "1.25rem", fontWeight: "300"}}>Add to <i className="fas fa-shopping-cart"></i></span></button>});
            this.setState({status: <span className="text-success">In Stock</span>});
         }
    
         else {
            this.setState({addNotify: <button type="button" className="btn btn-outline-danger"><span style={{fontSize: "1.25rem", fontWeight: "300"}}>Notify Me</span></button>});
            this.setState({status: <span className="text-danger">Out of Stock</span>});
         }
    
         if (prod.discount) {
            this.setState({price:  <span style={{textDecoration: "line-through"}}>Price: ₪{prod.price.toFixed(2)}</span>});
            this.setState({newPrice: <strong className="text-danger"><br/>Discount: ₪{(prod.price*(1-prod.discountPercentage)).toFixed(2)}</strong>});
         } 
    
         else {
            this.setState({price: <strong>Price: ₪{prod.price.toFixed(2)}</strong>});
            this.setState({newPrice: <span style={{display: "none"}}>.</span>});
         }
   }

   render(){

      if (this.state) {

         return(
            <main role="main" className="lead" style={{width: "95%", margin: "0 auto"}}>
               
               <br/><br/><br/><br/>

               <div>
                  <ol className="breadcrumb">
                     <li><NavLink to="/shop" style={{textDecoration: "none"}}>Shop&nbsp;</NavLink></li>
                           / <NavLink to={"/shop/"+this.state.arr.name} style={{textDecoration: "none"}}><li className="active">&nbsp;{this.state.arr.title}</li></NavLink>
                  </ol>
               </div>

               <h1 className="mt-5">{this.state.arr.title}</h1>
   
               <div className="row">

                  <div className="col-sm">
                  
                     <br/><p>{this.state.arr.subtitle}</p><br/>
                     
                     <ul style={{paddingLeft: "20px"}}>
                        {this.state.arr.details.map((detail, index) => <span key={index}><li>{detail}</li><br/></span>)}
                     </ul>

                  </div>
   
                  <div className="col-sm">
                     <br/>
                        <OverlayTrigger placement='bottom' overlay={<Tooltip> Click to enlarge image </Tooltip>}>
                           <img id="myImg" src={this.state.src} alt="Prod_Img"
                              onClick={() => window.open(this.state.src,'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1090px, height=550px, top=25px left=120px')}
                           />
                        </OverlayTrigger>
                  </div>

                  <div className="col-sm">
                  {this.state.price}
                     {this.state.newPrice}
                     <br/><br/>
                     Ratings:&emsp;{ratingStars(this.state.arr.rating)}
                     <br/><br/>
                     {this.state.status}
                     <br/><br/>
                     Shipping:&emsp;<span className="text-success">Free Shipping</span>
                     <br/><br/>
                     Shipping To:&emsp;Worldwide
                     <br/><br/>
                     Arrives:&emsp;6-12 Working Days After Dispatch
                     <br/><br/>
                     Quantity:&emsp;<select ref={this.callRef} onChange={this.updateQuantity}><option>1</option><option>2</option><option>3</option><option>4</option></select>
                     <br/><br/>
                     {this.state.addNotify}
                     &emsp;
                     {/* <button type="button" className="btn btn-outline-warning">
                        <span style={{fontSize: "1.25rem", fontWeight: "300"}}>Add to <i className="fas fa-star"></i></span>
                     </button> */}
                  </div>
   
               </div>
   
               <br/><br/>

               {this.state.arr.img.map((img, index) => <div className="gallery" key={index+1}><img src={img} alt={"Img"+(index+1)} onClick={this.updateImage}/></div>)}
               
               {/*https://getbootstrap.com/docs/4.0/utilities/display/#hiding-elements*/}
               <span className="d-block d-xl-none" style={{color: "white"}}>........................</span>
   
               <br/><br/><br/><br/><br/><br/><br/><br/><br/>
   
               <h3>Similar Products:</h3>
   
               <br/>

               {  this.props.products.map((prod,index) => {

                     // if (prod.type === this.state.type && prod.name !== this.props.match.params.prodName) {
                     if (prod.type === this.state.type && prod.name !== window.location.href.split("/shop/")[1]) {
                        return (
                           <Link key={index} onClick={() => { this.setState({arr: prod, src: prod.img[0], type: prod.type}); this.setStatusPrice(prod) }} to={"/shop/"+prod.name}>
                              <div className="gallery">
                                 <img src={prod.img[0]} alt={prod.name}/>
                                 <div className="desc">{prod.title}</div>
                              </div>
                           </Link>
                        );
                     }
                  })
               }
               
               <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
               
          </main>
         );
      }
      
      else {
         return <NotFound />;
      }
   }
}

const mapStateToProps = state => ({
   products: state.global.data.products
})
 
export default connect(mapStateToProps, { addProductCart, setLoading })(Product)