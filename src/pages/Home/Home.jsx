import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';
import { connect } from 'react-redux';

function Home({ products }) {
    return(
       <div className="container lead" style={{textAlign: "center"}}>

           <br/><br/><br/>

           <p style={{fontWeight: "bold", fontSize: "70px"}}>Welcome To</p>
           <img src="/images/logos/logo.png" alt="logo"/><br/><br/> 

           <Link to="/shop"><button className="btn btn-danger" style={{width: "100%", fontWeight: "bold", padding: "10px"}}>Shop Now</button></Link><br/><br/><br/>

           <div className="row">

                {/* https://www.flaticon.com/ */}

                <div className="col-sm">
                    <img src="/images/home/graphic-card.png" alt="hardware" width="128px"/><br/>
                    <h5>Hardware</h5>
                </div>

                <div className="col-sm">
                    <img src="/images/home/laptop.png" alt="laptops" width="128px"/><br/>
                    <h5>Laptops</h5>
                </div>

                <div className="col-sm">
                    <img src="/images/home/keyboard.png" alt="peripheral" width="128px"/><br/>
                    <h5>Peripheral</h5>
                </div>

                <div className="col-sm">
                    <img src="/images/home/software.png" alt="softwares" width="128px"/><br/>
                    <h5>Softwares</h5>
                </div>

           </div>

           <br/><p style={{fontSize: "xx-small"}}>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>

           <br/><Link to="/shop"><button className="btn btn-danger" style={{width: "100%", fontWeight: "bold", padding: "10px"}}>Shop Now</button></Link><br/><br/><br/>

            <Carousel>

                <Carousel.Item>
                    <h3>New Arrival</h3>
                    <br/>
                    <Link to={"/shop/"+products[8].name}><img src={products[8].img[0]} alt={products[8].name} width="128px"/></Link>
                    <br/><br/>
                    <Link to={"/shop/"+products[8].name}><h5>{products[8].title}</h5></Link>
                    <br/><br/>
                </Carousel.Item>

                <Carousel.Item>
                    <h3>On Sale</h3>
                    <br/>
                    <Link to={"/shop/"+products[7].name}><img src={products[7].img[0]} alt={products[7].name} width="128px"/></Link>
                    <br/><br/>
                    <Link to={"/shop/"+products[7].name}><h5>{products[7].title}</h5></Link>
                    <br/><br/>
                </Carousel.Item>

                <Carousel.Item>
                    <h3>Best Ratings</h3>
                    <br/>
                    <Link to={"/shop/"+products[5].name}><img src={products[5].img[0]} alt={products[5].name} width="128px"/></Link>
                    <br/><br/>
                    <Link to={"/shop/"+products[5].name}><h5>{products[5].title}</h5></Link>
                    <br/><br/>
                </Carousel.Item>

                <Carousel.Item>
                    <h3>Best Sellers</h3>
                    <br/>
                    <Link to={"/shop/"+products[0].name}><img src={products[0].img[0]} alt={products[0].name} width="128px"/></Link>
                    <br/><br/>
                    <Link to={"/shop/"+products[0].name}><h5>{products[0].title}</h5></Link>
                    <br/><br/>
                </Carousel.Item>

            </Carousel>

            <br/><br/><br/><br/>

       </div>
    );
}

const mapStateToProps = state => ({
    products: state.global.data.products
})
  
export default connect(mapStateToProps)(Home)