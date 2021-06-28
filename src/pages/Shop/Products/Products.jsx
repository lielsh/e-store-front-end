import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Products.css';
import ratingStars from '../../../functions/ratingStars';
import ProductsList from '../../../components/Shop/ProductsList/ProductsList';
import ProductsFilter from '../../../components/Shop/ProductsFilter/ProductsFilter';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../../components/Spinner/Spinner';

class Products extends Component {

    constructor(props) {

        super(props);
        
        this.state = {
                        prodsArr: this.props.products, displayArr: this.props.products, displayArrLen: this.props.products.length, searched: "",
                        numHardware: 0, numLaptops: 0, numPeripheral: 0, numSoftwares: 0,
                        filterArrRating: [], isStock: false, isSale: false,
                        filterArrCat: [], arrCat: [], filterArrSub: [], arrSub: [], filterArrType: [], arrType: [], filterArrBrand: [], arrBrand: [],
                        callRefHardware: React.createRef(), callRefLaptops: React.createRef(), callRefPeripheral: React.createRef(), callRefSoftwares: React.createRef(),
                        callRefSub: React.createRef(), callRefType: React.createRef(), callRefBrand: React.createRef(),
                        addProductCart: this.props.addProductCart, loading: false
                    };

        this.lowPrice = this.lowPrice.bind(this);
        this.highPrice = this.highPrice.bind(this);
        this.bestRating = this.bestRating.bind(this);
        this.alphabet = this.alphabet.bind(this);
        this.resetFilters = this.resetFilters.bind(this);

        for (let prod of this.state.prodsArr) {

            if (prod.category === "Hardware")
                this.state.numHardware++;

            else if (prod.category === "Laptops")
                this.state.numLaptops++;

            else if (prod.category === "Peripheral")
                this.state.numPeripheral++;
            
            else if (prod.category === "Softwares")
                this.state.numSoftwares++;
        }
    };
     
    lowPrice() {

        let newArr = this.state.displayArr;

        newArr = newArr.sort((a,b) => {

            let priceA = a.price;
            let priceB = b.price;

            if (a.discount)
                priceA = a.price*(1-a.discountPercentage);
        
            if (b.discount)
                priceB = b.price*(1-b.discountPercentage);

            return (priceA > priceB) ? 1 : ((priceB > priceA) ? -1 : 0)
        });

        this.setState({displayArr: newArr});
    }

    highPrice() {

        let newArr = this.state.displayArr;

        newArr  = newArr.sort((a,b) => {

            let priceA = a.price;
            let priceB = b.price;

            if (a.discount)
                priceA = a.price*(1-a.discountPercentage);
            
            if (b.discount)
                priceB = b.price*(1-b.discountPercentage);

            return (priceA < priceB) ? 1 : ((priceB < priceA) ? -1 : 0)

        });

        this.setState({adisplayArr: newArr});
    }

    bestRating() {

        let newArr = this.state.displayArr;

        newArr = newArr.sort((a,b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));

        this.setState({displayArr: newArr});
    }

    alphabet() {

        let newArr = this.state.displayArr;

        newArr = newArr.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));

        this.setState({displayArr: newArr});
    }

    filterCategories(category) {

        if (this.state.callRefSub.current) {

            if (this.state.callRefSub.current._reactInternals.alternate)
                this.state.callRefSub.current._reactInternals.alternate.firstEffect.stateNode.checked = false;
        }

        let arr = [...this.state.prodsArr];
        let filterArr = [...this.state.filterArrCat]; 

        const index = filterArr.indexOf(category);

        if (index === -1)
            filterArr.push(category);
        
        else
            filterArr.splice(index, 1);
        
        if (filterArr.length > 0) {

           arr = arr.filter(prod => {

                if ((filterArr.indexOf(prod.category) !== -1))
                    return prod;
            });
        }

        this.setState({displayArr: arr, displayArrLen: arr.length, arrCat: arr, filterArrCat: filterArr, filterArrSub: [], arrSub: [], filterArrType: [], arrType: [], filterArrBrand: [], arrBrand: []});   
    }


    filterCategoriesSub(category) {

        if (this.state.callRefType.current) {

            if (this.state.callRefType.current._reactInternals.alternate)
                this.state.callRefType.current._reactInternals.alternate.firstEffect.stateNode.checked = false;
        }
        
        let arr = [...this.state.arrCat];
        let filterArr = [...this.state.filterArrSub]; 

        const index = filterArr.indexOf(category);

        if (index === -1)
            filterArr.push(category);
        
        else
            filterArr.splice(index, 1);
        
        if (filterArr.length > 0) {

           arr = arr.filter(prod => {

                if ((filterArr.indexOf(prod.subcategory) !== -1))
                    return prod;
            }); 
        }

        this.setState({displayArr: arr, displayArrLen: arr.length, arrSub: arr, filterArrSub: filterArr, filterArrType: [], arrType: [], filterArrBrand: [], arrBrand: []}); 
    }

    filterCategoriesType(category) {

        if (this.state.callRefBrand.current) {

            if (this.state.callRefBrand.current._reactInternals.alternate)
                this.state.callRefBrand.current._reactInternals.alternate.firstEffect.stateNode.checked = false;
        }

        let arr = [...this.state.arrSub];
        let filterArr = [...this.state.filterArrType]; 

        const index = filterArr.indexOf(category);

        if (index === -1)
            filterArr.push(category);
        
        else
            filterArr.splice(index, 1);
        
        if (filterArr.length > 0) {

           arr = arr.filter(prod => {

                if ((filterArr.indexOf(prod.type) !== -1))
                    return prod;
            });
        }

        this.setState({displayArr: arr, displayArrLen: arr.length, arrType: arr, filterArrType: filterArr, filterArrBrand: [], arrBrand: []});   
    }

    filterCategoriesBrand(category) {

        let arr = [...this.state.arrType];
        let filterArr = [...this.state.filterArrBrand]; 

        const index = filterArr.indexOf(category);

        if (index === -1)
            filterArr.push(category);
        
        else
            filterArr.splice(index, 1);
        
        if (filterArr.length > 0) {

           arr = arr.filter(prod => {

                if ((filterArr.indexOf(prod.brand) !== -1))
                    return prod;
            });  
        }

        this.setState({displayArr: arr, displayArrLen: arr.length, arrBrand: arr, filterArrBrand: filterArr}); 
    }

    filterRating(rate) {

        let arr = [...this.state.prodsArr];
        let filterArr = [...this.state.filterArrRating]; 

        const index = filterArr.indexOf(rate);

        if (index === -1)
            filterArr.push(rate);
        
        else
            filterArr.splice(index, 1);
        
        if (filterArr.length > 0) {

           arr = arr.filter(prod => {

                if (prod.rating === rate)
                    return prod;
            });  
        }

        this.setState({displayArr: arr, displayArrLen: arr.length, filterArrRating: filterArr}); 
    }

    filterStock() {

        let arr = [...this.state.prodsArr];

        if (this.state.isStock)
            this.setState({isStock: false});
        
        else
            this.setState({isStock: true});

        if (!this.state.isStock) {

            arr = arr.filter(prod => {

                    if (prod.stock !== this.state.isStock)
                        return prod;
                });
        }

        this.setState({displayArr: arr, displayArrLen: arr.length}); 
    }

    filterSale() {

        let arr = [...this.state.prodsArr];

        if (this.state.isSale)
            this.setState({isSale: false});
        
        else
            this.setState({isSale: true});

        if (!this.state.isSale) {
            
            arr = arr.filter(prod => {

                    if (prod.discount !== this.state.isSale)
                        return prod;
                });
        }

        this.setState({displayArr: arr, displayArrLen: arr.length}); 
    }

    resetFilters() {

        if (this.state.callRefHardware.current)
        this.state.callRefHardware.current.checked = false;
        
        if (this.state.callRefLaptops.current)
            this.state.callRefLaptops.current.checked = false;

        if (this.state.callRefPeripheral.current)
            this.state.callRefPeripheral.current.checked = false;

        if (this.state.callRefSoftwares.current)
            this.state.callRefSoftwares.current.checked = false;
        
        this.setState({displayArr: this.state.prodsArr, displayArrLen: this.state.prodsArr.length, searched: "", arrCat: [], filterArrCat: [], filterArrSub: [], arrSub: [], filterArrType: [], arrType: [], filterArrBrand: [], arrBrand: []});

        this.props.history.push("/shop?q=");

        window.scrollTo(0, 0);
    }
    
    loadMore() {

        this.setState({ loading: true })
        
        axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/products?limit=${this.state.displayArrLen + 3}`,
            method: "GET",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC }
          })
          .then(res => this.setState({ prodsArr: res.data, displayArr: res.data,  displayArrLen: res.data.length, loading: false }))
          .catch(err => { this.setState({ loading: false }) ; console.log(err) })
    }

    componentDidUpdate() {

        let search = window.location.href.split("?q=")[1];

        if ((search) && (search.replace(/%20/g, " ") !== this.state.searched) && (typeof search === 'string')) {

        if (this.state.callRefHardware.current)
            this.state.callRefHardware.current.checked = false;
            
        if (this.state.callRefLaptops.current)
            this.state.callRefLaptops.current.checked = false;

        if (this.state.callRefPeripheral.current)
            this.state.callRefPeripheral.current.checked = false;

        if (this.state.callRefSoftwares.current)
            this.state.callRefSoftwares.current.checked = false;

            search = search.replace(/%20/g, " ");

            let arr = [...this.state.prodsArr];
            
            const space = [...new Set(search.split(" "))];

            if ((space.length > 1) || (space[0] !== "")) {

                arr = arr.filter(prod => {
                
                    if ((prod.title.toLowerCase().includes(search.toLowerCase())))
                        return prod;
                });

            }

            this.setState({displayArr: arr, displayArrLen: arr.length, searched: search, arrCat: [], filterArrCat: [], filterArrSub: [], arrSub: [], filterArrType: [], arrType: [], filterArrBrand: [], arrBrand: []});

            window.scrollTo(0, 0);
        }

        else if (!(search) && ("" !== this.state.searched) && (typeof search === 'string')) {

            if (this.state.callRefHardware.current)
            this.state.callRefHardware.current.checked = false;
            
            if (this.state.callRefLaptops.current)
                this.state.callRefLaptops.current.checked = false;

            if (this.state.callRefPeripheral.current)
                this.state.callRefPeripheral.current.checked = false;

            if (this.state.callRefSoftwares.current)
                this.state.callRefSoftwares.current.checked = false;

            this.setState({displayArr: this.state.prodsArr, displayArrLen: this.state.prodsArr.length, searched: "", arrCat: [], filterArrCat: [], filterArrSub: [], arrSub: [], filterArrType: [], arrType: [], filterArrBrand: [], arrBrand: []});

            window.scrollTo(0, 0);
        }
    }

   render(){
    if (!this.state.loading) {
      return(
         <main role="main" className="lead" style={{width: "95%", margin: "0 auto"}}>

            <br/><br/><br/><br/>

            <div>
                <ol className="breadcrumb">
                    <li><NavLink to="/shop?q=" style={{textDecoration: "none"}} onClick={() => this.resetFilters()}>Shop</NavLink></li>
                </ol>
            </div>

            <div className="row">

            <div className="col-md-3">

                <div>
                    <span className="list-group-item active">Categories</span>
                    <ul className="list-group">
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterCategories(e.target.value, "Cat")} value="Hardware" ref={this.state.callRefHardware}/> Hardware
                           <span className="label label-success pull-right"> ({this.state.numHardware})</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterCategories(e.target.value, "Cat")} value="Laptops" ref={this.state.callRefLaptops}/> Laptops
                         <span className="label label-danger pull-right"> ({this.state.numLaptops})</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterCategories(e.target.value, "Cat")} value="Peripheral" ref={this.state.callRefPeripheral}/> Peripheral
                             <span className="label label-info pull-right"> ({this.state.numPeripheral})</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterCategories(e.target.value, "Cat")} value="Softwares" ref={this.state.callRefSoftwares}/> Softwares
                             <span className="label label-success pull-right"> ({this.state.numSoftwares})</span>
                        </li>
                     </ul>
                </div>

                <br/>

                <div>
                    <span className="list-group-item active list-group-item-success">Sub-Categories</span>
                    <ul className="list-group">
                    {
                        this.state.filterArrCat.map((prod, index) =>
                        <ProductsFilter
                            key={index} category={"category"} filter={prod} filterCategories={this.filterCategoriesSub.bind(this)} ref={this.state.callRefSub} products={this.state.prodsArr}
                        />)
                    }
                    </ul>

                </div>

                <br/>

                <div>
                    <span className="list-group-item active">Types</span>
                    <ul className="list-group">
                    {
                        this.state.filterArrSub.map((prod, index) =>
                        <ProductsFilter
                            key={index} category={"subcategory"} filter={prod} filterCategories={this.filterCategoriesType.bind(this)} ref={this.state.callRefType} products={this.state.prodsArr}
                        />)
                    }
                    </ul>

                </div>

                <br/>

                <div>
                    <span className="list-group-item active">Brands</span>
                    <ul className="list-group">
                    {
                        this.state.filterArrType.map((prod, index) =>
                        <ProductsFilter
                            key={index} category={"type"} filter={prod} filterCategories={this.filterCategoriesBrand.bind(this)} ref={this.state.callRefBrand} products={this.state.prodsArr}
                        />)
                    }
                    </ul>

                </div>
                
                <br/>

                <div>
                    <span className="list-group-item active">Ratings</span>
                    <ul className="list-group">
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(0)}/> {ratingStars(0)}
                            <span className="label label-warning pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(0.5)}/> {ratingStars(0.5)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(1.0)}/> {ratingStars(1.0)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(1.5)}/> {ratingStars(1.5)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(2.0)}/> {ratingStars(2.0)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(2.5)}/> {ratingStars(2.5)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(3.0)}/> {ratingStars(3.0)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(3.5)}/> {ratingStars(3.5)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(4.0)}/> {ratingStars(4.0)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(4.5)}/> {ratingStars(4.5)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                        <li className="list-group-item"><input type="checkbox" onChange={(e) => this.filterRating(5.0)}/> {ratingStars(5.0)}
                            <span className="label label-success pull-right"> ()</span>
                        </li>
                    </ul>

                </div>

                <br/>

                <div>
                    <span className="list-group-item active">Stock</span>
                    <ul className="list-group">
                        <li className="list-group-item"><input type="checkbox" onChange={() => this.filterStock()}/> In Stock
                            <span className="label label-warning pull-right"> ()</span>
                        </li>
                    </ul>

                </div>

                <br/>

                <div>
                    <span className="list-group-item active">On Sale</span>
                    <ul className="list-group">
                        <li className="list-group-item"><input type="checkbox" onChange={() => this.filterSale()}/> Yes
                            <span className="label label-warning pull-right"> ()</span>
                        </li>
                    </ul>

                </div>

                <br/>

                <div>
                    <a className="list-group-item active btn-danger text-center font-weight-bold" type="button" onClick={() => this.resetFilters()} style={{borderRadius: "15px", cursor: "pointer", textDecoration: "none"}}>Reset</a>
                </div>

                <br/><br/><br/>

            </div>

            <div className="col-md-9">

                <div className="row">
                    <div className="btn-group alg-right-pad">&nbsp;&thinsp;
                        <button type="button" className="btn btn-default"><strong style={{fontSize: "large"}}>{this.state.displayArrLen}  </strong>Items</button>
                        <div className="btn-group">&nbsp;
                            <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown">
                                Sort Products &nbsp;
                              <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a onClick={this.lowPrice}>By Price Low</a></li>
                                <li className="divider"></li>
                                <li><a onClick={this.highPrice}>By Price High</a></li>
                                <li className="divider"></li>
                                <li><a onClick={this.bestRating}>By Ratings</a></li>
                                <li className="divider"></li>
                                <li><a onClick={this.alphabet}>By Alphabet</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">

                    {   this.state.displayArrLen <= 0 ? <div className="col-md-4 text-center col-sm-6 col-xs-6 font-weight-bold">No products for "{window.location.href.split("?q=")[1]}"</div> :
                            this.state.displayArr.map((prod, index) =>
                            <ProductsList 
                                key={index} id={prod.id} img={prod.img[0]} name={prod.name} title={prod.title} subtitle={prod.subtitle} price={prod.price} rating={prod.rating} stock={prod.stock} discount={prod.discount} discountPercentage={prod.discountPercentage} products={this.state.prodsArr}
                            />)
                    }
        
                </div>
                <br /><br /><br />
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {/* <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                            </li> */}
                            <li className="page-item"><a className="page-link" type="button" onClick={() => this.loadMore()}>Load More</a></li>
                        </ul>
                    </nav>
                </div>

            </div>
            
            </div>
            <br /><br />
       </main>
      );
    }
    else {
        return <Spinner/>
    }
   }
}

const mapStateToProps = state => ({
    products: state.global.data.products
})
  
export default connect(mapStateToProps)(Products)