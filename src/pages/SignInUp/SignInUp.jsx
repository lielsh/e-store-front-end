import React, { useEffect } from 'react'
import './SignInUp.css'
import { connect } from 'react-redux'
import { updateUserNavbar } from '../../actions/actions'
import axios from 'axios'

function SignInUp(props) {

    const callRefBtn = React.createRef();

    function moveTo(name) {
        
        props.updateUserNavbar(name);

        if (props.location.cart)
            props.history.push("/cart");

        else
            props.history.push("/account/profile");
    }

    function signIn(email, password) {

        document.querySelector("#signInError").innerHTML = ""

        axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/sign-in`,
            method: "POST",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
            data: { email, password }
          })
          .then(res => {

            if (res.data.error)
                document.querySelector("#signInError").innerHTML = `<p style="color:red; font-weight:bold; padding-top:10px;">${res.data.message}</p>`
            
            else {
                
                window.localStorage.setItem(process.env.REACT_APP_STORE_NAME, res.data.token)

                const name = res.data.user.name || res.data.user.email

                moveTo(name)
            }
          })
          .catch(err =>  document.querySelector("#signInError").innerHTML = `<p style="color:red; font-weight:bold; padding-top:10px;">${err}</p>`)
    }

    function signInFacebook() {

        return
    }

    function signInGithub() {

        return
    }

    function signInGoogle() {

        window.location.href = `${process.env.REACT_APP_PROXY_PUBLIC}/users/sign-in-google?auth=${process.env.REACT_APP_BEARER_TOKEN_PUBLIC}`

        // window.open(`${process.env.REACT_APP_PROXY_PUBLIC}/users/sign-in-google`,
        // 'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=550px, height=550px, top=50px left=500px')
    }

    function signUp(email, password) {

        document.querySelector("#signUpError").innerHTML = ""
        
        axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/sign-up`,
            method: "POST",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
            data: { email, password }
          })
          .then(res => {

            if (res.data.error)
                document.querySelector("#signUpError").innerHTML = `<p style="color:red; font-weight:bold; padding-top:10px;">${res.data.message}</p>`
            
            else
                signIn(email, password)
          })
          .catch(err =>  document.querySelector("#signUpError").innerHTML = `<p style="color:red; font-weight:bold; padding-top:10px;">${err}</p>`)
    }

    useEffect(() => {

        if (props.location.search) {

            window.localStorage.setItem(process.env.REACT_APP_STORE_NAME, props.location.search.split("token=")[1])

            const name = props.location.search.split("name=")[1].split("&")[0] || props.location.search.split("email=")[1].split("&")[0]

            moveTo(name)
        }
    })

    return (
        <div className="lead" style={{textAlign: "center"}}>
            <br/><br/>
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                    <div className="row d-flex">
                        <div className="col-lg-6" style={{margin: "0 auto"}}>
                            <div className="card2 card border-0 px-4 py-5">
                                <div className="row mb-4 px-3" style={{margin: "0 auto"}}>
                                    <h2 className="mb-0 mr-4 mt-2" style={{position: "relative", bottom: "15px"}}>Sign in with</h2>
                                    <div className="text-center mr-3">
                                        <a role="button" id="signInFacebook" onClick={signInFacebook}><i className="fab fa-facebook fa-lg"></i></a>
                                    </div>
                                    <div className="text-center mr-3">
                                        <a role="button" id="signInGithub" onClick={signInGithub}><i className="fab fa-github fa-lg"></i></a>
                                    </div>
                                    <div className="btn-google text-center mr-3">
                                        <a role="button" id="signInGoogle" onClick={signInGoogle}><i className="fab fa-google fa-lg"></i></a>
                                    </div>
                                </div>
                                <form method="POST" className="login-form" onSubmit={e => { e.preventDefault(); signIn(e.target[0].value, e.target[1].value); }}>
                                    <div className="row px-3 mb-4">
                                        <div className="line"></div> <small className="or text-center">OR</small>
                                        <div className="line"></div>
                                    </div>
                                    <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Email Address</h6>
                                        </label> <input className="mb-4" type="text" name="text" placeholder="Enter a valid email address" required/> </div>
                                    <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label> <input type="password" name="password" placeholder="Enter password" required/> </div>
                                    <div className="row px-3" id="signInError"></div>
                                    <div className="row px-3 mb-4 my-3">
                                        <div className="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" className="custom-control-input" checked="checked" disabled/> <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label> </div> <a href="#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                                    </div>
                                    <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center" ref={callRefBtn} style={{margin: "0 auto"}}>Sign In</button> </div>
                                    <div className="row mb-4 px-3"> <small className="font-weight-bold" style={{margin: "0 auto"}}>Don't have an account? <a className="text-danger" type="button" onClick={() => document.querySelector("#signUpForm").style.display = "block"}>Sign Up</a></small> </div>
                                </form>
                                <form method="POST" id="signUpForm" className="login-form" onSubmit={e => { e.preventDefault(); signUp(e.target[0].value, e.target[1].value); }} style={{display: "none", padding: "10px"}}>
                                    <div className="row px-3 mb-4"></div>
                                    <h2>Sign Up</h2>
                                    <div className="row px-3 mb-4"></div>
                                    <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Email Address</h6>
                                        </label> <input className="mb-4" type="text" name="text" placeholder="Enter a valid email address" required/> </div>
                                    <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label> <input type="password" name="password" placeholder="Enter password" required/> </div>
                                    <div className="row px-3" id="signUpError"></div>
                                    <div className="row px-3 mb-4 my-3">
                                    </div>
                                    <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center" ref={callRefBtn} style={{margin: "0 auto"}}>Sign Up</button> </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default connect("", { updateUserNavbar })(SignInUp)