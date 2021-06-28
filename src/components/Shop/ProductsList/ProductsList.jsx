import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ratingStars from '../../../functions/ratingStars';
import ProductsQuickView from '../ProductsQuickView/ProductsQuickView';
import { connect } from 'react-redux';
import { addProductCart, setLoading } from '../../../actions/actions';

class ProductsList extends Component {

    constructor(props) {

        super(props);

        this.state = {addNotify: "", status: "", price: "", newPrice: ""};

        if (this.props.stock) {
            this.state.addNotify = <button className="btn btn-outline-primary" onClick={async () => { await this.props.setLoading(); this.props.addProductCart(this.props.id, 1) }}>Add To <i className="fas fa-shopping-cart"></i></button>;
            this.state.status = <span className="text-success">In Stock</span>;
        }
    
        else {
            this.state.addNotify = <a href="#" className="btn btn-outline-danger" role="button">Notify Me</a>;
            this.state.status = <span className="text-danger">Out of Stock</span>;
        }
    
        if (this.props.discount) {
            this.state.price = <p style={{textDecoration: "line-through"}}>Price: ₪{this.props.price.toFixed(2)}</p>;
            this.state.newPrice = <p className="text-danger" style={{fontSize: "x-large"}}><strong>Discount: ₪{(this.props.price*(1-this.props.discountPercentage)).toFixed(2)}</strong></p>;
        } 
    
        else {
            this.state.price = <p style={{fontSize: "x-large"}}><strong>Price: ₪{this.props.price.toFixed(2)}</strong></p>;
            this.state.newPrice = <p style={{visibility: "hidden"}}>.</p>;
        }
    };

    componentDidUpdate(prevProps) {

        if (this.props !== prevProps) {
            
            if (this.props.stock) {
                this.setState({addNotify: <button className="btn btn-outline-primary" onClick={async () => { await this.props.setLoading(); this.props.addProductCart(this.props.id, 1) }}>Add To <i className="fas fa-shopping-cart"></i></button>});
                this.setState({status: <span className="text-success">In Stock</span>});
            }
        
            else {
                this.setState({addNotify: <a href="#" className="btn btn-outline-danger" role="button">Notify Me</a>});
                this.setState({status: <span className="text-danger">Out of Stock</span>});
            }
        
            if (this.props.discount) {
                this.setState({price: <p style={{textDecoration: "line-through"}}>Price: ₪{this.props.price.toFixed(2)}</p>});
                this.setState({newPrice: <p className="text-danger" style={{fontSize: "x-large"}}><strong>Discount: ₪{(this.props.price*(1-this.props.discountPercentage)).toFixed(2)}</strong></p>});
            } 
        
            else {
                this.setState({price: <p style={{fontSize: "x-large"}}><strong>Price: ₪{this.props.price.toFixed(2)}</strong></p>});
                this.setState({newPrice: <p style={{visibility: "hidden"}}>.</p>});
            }
        }
    }

    render(){
        return(
            <div className="col-md-4 text-center col-sm-6 col-xs-6">
                <div className="thumbnail product-box">
                    <Link to={"/shop/"+this.props.name}>
                        <img src={this.props.img} alt={this.props.name} height="150px"/>
                    </Link>
                        <div className="caption">
                            {/*https://forum.bootstrapstudio.io/t/dynamic-text-sizing/4282*/}
                            <Link to={"/shop/"+this.props.name}>
                                <h3 style={{fontSize: "calc(0.9em + 0.1vw)"}}>{this.props.title}</h3><br/>
                            </Link>
                            {this.state.price}
                            {this.state.newPrice}
                            <p>Ratings:&emsp;{ratingStars(this.props.rating)}</p>
                            <p>Status:&emsp;{this.state.status}</p>
                            <p>
                                {this.state.addNotify}&nbsp;<Link to={"/shop/"+this.props.name}><span className="btn btn-outline-success" role="button">More Details</span></Link>
                                &nbsp;<ProductsQuickView id={this.props.id} title={this.props.title} img={this.props.img} name={this.props.name} subtitle={this.props.subtitle} price={this.state.price} newPrice={this.state.newPrice} rating={<p>Ratings:&emsp;{ratingStars(this.props.rating)}</p>} status={this.state.status} moreDetails={<Link to={"/shop/"+this.props.name}><span className="btn btn-outline-success" role="button">More Details</span></Link>}/>
                            </p>
                        </div>
                </div>
            </div>
        );
    }
}

export default connect("", { addProductCart, setLoading })(ProductsList)