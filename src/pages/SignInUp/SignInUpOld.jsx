// https://bbbootstrap.com/snippets/login-form-footer-and-social-media-icons-55203607

import React from 'react';
import './SignInUp.css';
import { auth, db } from '../../functions/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
import { updateUserNavbar } from '../../actions/actions';

function SignInUp(props) {

    let callRefBtn = React.createRef();

    function moveTo(name) {
        
        props.updateUserNavbar(name);

        if (props.location.cart)
            props.history.push("/cart");

        else
            props.history.push("/account/profile");
    }

    async function SignInUpFacebookGithubGoogle(user) {

        let data;
                
        await db.on("value", async (snapshot) => {

            data = await (snapshot.val().users);

            if (data[user.uid]) {

                data = await data[user.uid];

                const name = await data.fname || data.email;
                moveTo(name);
            }

            else {

                db.child("users").child(user.uid).set({

                    "id": user.uid,
                    "active": true,
                    "address": "",
                    "email": user.email,
                    "fname": "",
                    "lname": "",
                    "mobile": "",
                    "city": "",
                    "country": "",
                    "zipcode": "",
                    "role": "Customer"
                });

                moveTo(user.email);
            }
        });

    }

    function signUp(form) {

        document.querySelector("#signUpError").innerHTML = ""

        auth().createUserWithEmailAndPassword(form[0].value, form[1].value)

            .then(async (userCredential) => {
                // Signed in 
                let user = userCredential.user;
                //this.setState({redirect: true})

                db.child("users").child(user.uid).set({

                    "id": user.uid,
                    "active": true,
                    "address": "",
                    "email": form[0].value,
                    "fname": "",
                    "lname": "",
                    "mobile": "",
                    "city": "",
                    "country": "",
                    "zipcode": "",
                    "role": "Customer"
                });

                moveTo(form[0].value);
            })

            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                //alert(errorCode.split("auth/")[1] + ": " + errorMessage)
                document.querySelector("#signUpError").innerHTML = '<p style="color:red; font-weight:bold; padding-top:10px;">'+ errorMessage +'</p>'
            });
    }

    function signIn(form) {

        document.querySelector("#signInError").innerHTML = ""

        auth().signInWithEmailAndPassword(form[0].value, form[1].value)

            .then((userCredential) => {

                let user = userCredential.user;
                
                return user;

            }).then(async (user) => {

                let data;

                await db.on("value", async (snapshot) => {

                    data = await (snapshot.val().users);
                    data = await data[user.uid];
                    
                    moveTo(data.fname || data.email);
                });
            })
        
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                //alert(errorCode.split("auth/")[1] + ": " + errorMessage)
                document.querySelector("#signInError").innerHTML = '<p style="color:red; font-weight:bold; padding-top:10px;">'+ errorMessage +'</p>'
            });
    }

    function signInFacebook() {

        const provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({ auth_type : 'reauthenticate'});

        auth().signInWithPopup(provider)

            .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;
            // The signed-in user info.
            let user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            let accessToken = credential.accessToken;

            SignInUpFacebookGithubGoogle(user);
            })

            .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            
            if (errorMessage !== "The popup has been closed by the user before finalizing the operation.")
                alert(errorMessage)
            });
    }

    function signInGithub() {

        const provider = new firebase.auth.GithubAuthProvider();
        provider.setCustomParameters({prompt: 'consent'});

        auth().signInWithPopup(provider)

            .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;
        
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            let token = credential.accessToken;
        
            // The signed-in user info.
            let user = result.user;

            SignInUpFacebookGithubGoogle(user);
            })

            .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            
            if (errorMessage !== "The popup has been closed by the user before finalizing the operation.")
                alert(errorMessage)
            });
    }

    function signInGoogle() {

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
        
        auth().signInWithPopup(provider)

            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                let credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = credential.accessToken;
                // The signed-in user info.
                let user = result.user;

                SignInUpFacebookGithubGoogle(user);
            })
            
            .catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;

                if (errorMessage !== "The popup has been closed by the user before finalizing the operation.")
                    alert(errorMessage)
            });
    }

    return(
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
                            <form method="POST" className="login-form" onSubmit={e => { e.preventDefault(); signIn(e.target); }}>
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
                            <form method="POST" id="signUpForm" className="login-form" onSubmit={e => { e.preventDefault(); signUp(e.target); }} style={{display: "none", padding: "10px"}}>
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
    );
}

export default connect("", { updateUserNavbar })(SignInUp)