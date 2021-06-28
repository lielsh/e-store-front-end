import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios'
import Spinner from '../../Spinner/Spinner';

export default class PrivateRoute extends Component {

    constructor(props) {

        super(props);

        this.state = {user: null, timeout: false};
    };

    componentDidMount() {

        const token = window.localStorage.getItem(process.env.REACT_APP_STORE_NAME)

        if (token) {
    
          axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/user-data`,
            method: "POST",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
            data: { token }
          })
          .then(res => {
            
            if (res.data.error) {

                window.localStorage.removeItem(process.env.REACT_APP_STORE_NAME)

                window.alert(res.data.message)
                //window.location.reload()

                this.props.history.push("/sign-in-up")
            }
              
            
            else
                this.setState({user: res.data.user});
          })
          .catch(err => {
              window.alert(err)
              this.setState({ timeout: true })
            })
        }

        else {

            this.setState({ timeout: true })
        }
    }

    render() {

        if (this.state.user) {

            return <Route {...this.props} component={(props) => <this.props.component {...props} user={this.state.user}/>}/>
        }

        else if (!this.state.user && this.state.timeout) {

            return <Redirect to={{pathname: "/sign-in-up"}}/>
        }

        else {
            
            return <div><br/><Spinner/></div>
        }
    }
}
