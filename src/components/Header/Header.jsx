import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import CartQuickView from '../Cart/CartQuickView/CartQuickView';
import { connect } from 'react-redux';
import { updateUserNavbar } from '../../actions/actions';
import axios from 'axios'

class Header extends Component {

  constructor(props) {

    super(props);

    this.state = {url: ""};

    this.callRefInp = React.createRef();
    this.callRefBtn = React.createRef();

    this.setUrl = this.setUrl.bind(this);
    this.signOut = this.signOut.bind(this);
  };

  setUrl() {

    this.setState({url: this.callRefInp.current.value});
  }

  signOut(e) {

    const confirm = window.confirm("Are you sure?");

    if (confirm) {

        this.props.updateUserNavbar(null);

        window.localStorage.removeItem(process.env.REACT_APP_STORE_NAME);
    }
    
    else {
      e.preventDefault();
    }
  }

  componentDidMount() {

    const token = window.localStorage.getItem(process.env.REACT_APP_STORE_NAME)

    if (token) {

      axios({
        url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/user-name`,
        method: "POST",
        headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
        data: { token }
      })
      .then(res => {
        
        if (res.data.error)
          window.alert(res.data.message)
        
        else
          this.props.updateUserNavbar(res.data.name);
      })
      .catch(err => console.log(err))
    }
  }

  render(){
    return(
        <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <NavLink exact to="/"><img src="/images/logos/logo2.png" alt="LIEL'S" width="30%" /></NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li activeclassname="nav-item active"><NavLink exact to="/" className="nav-link">Home</NavLink></li>
              <li activeclassname="nav-item active"><NavLink to="/about" className="nav-link">About</NavLink></li>
              <li activeclassname="nav-item active"><NavLink to="/shop" className="nav-link">Shop</NavLink></li>
              <li activeclassname="nav-item active"><NavLink to="/blog" className="nav-link">Blog</NavLink></li>
              <li activeclassname="nav-item active"><NavLink to="/contact" className="nav-link">Contact Us</NavLink></li>
            </ul>
            <ul className="nav navbar-nav navbar-right pr-3">
              {this.props.user ?
                <li activeclassname="nav-item active nav-link"><Link to="/" onClick={(e) => this.signOut(e)} className="nav-link">Sign Out <i className="fas fa-sign-out-alt"></i></Link></li> 
                :<li activeclassname="nav-item active"><NavLink to="/sign-in-up" className="nav-link">Sign In <i className="fas fa-sign-in-alt"></i></NavLink></li>
              }
              <li activeclassname="nav-item active"><NavLink to="/account" className="nav-link"><i className="fas fa-user-circle"></i>&nbsp;{this.props.user || "Hello"}</NavLink></li>
              <li activeclassname="nav-item active"><CartQuickView/></li>
              <li activeclassname="nav-item active"><span className="cartCount">{!this.props.loading ? Object.keys(this.props.productsInCart).length : ''}</span></li>
          </ul>
          <form className="form-inline mt-2 mt-md-0" onSubmit={e => { e.preventDefault(); this.callRefBtn.current.click(); }}>
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" ref={this.callRefInp} onChange={this.setUrl}/>
              <NavLink to={"/shop?q="+this.state.url} className="nav-link"><button className="btn btn-outline-success my-2 my-sm-0" type="button" ref={this.callRefBtn}>Search</button></NavLink>
          </form>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  productsInCart: state.global.productsInCart,
  loading: state.global.loading,
  user: state.global.user
})

export default connect(mapStateToProps, { updateUserNavbar })(Header)