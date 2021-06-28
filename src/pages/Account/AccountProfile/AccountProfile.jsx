import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AccountMenu from '../../../components/Account/AccountMenu/AccountMenu';
import axios from 'axios';

const toBase64 = file => new Promise((resolve, reject) => {

    const reader = new FileReader();
    
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default class App extends Component {

    constructor(props) {

        super(props);

        this.state = {user: this.props.user};

        this.updateDetails = this.updateDetails.bind(this);
    }

    async updateDetails(form) {

        let flag = true;

        if (/^[a-zA-Z-' ]+$/.test(form[1].value) && form[1].value.charAt(0) !== " ") {

            document.querySelector("#formFName").style.display = "none";
        }
        
        else {

            document.querySelector("#formFName").style.display = "block";
            flag = false;
        }

        if (/^[a-zA-Z-' ]+$/.test(form[2].value) && form[2].value.charAt(0) !== " ") {

            document.querySelector("#formLName").style.display = "none";
        }
        
        else {

            document.querySelector("#formFName").style.display = "block";
            flag = false;
        }

        if (/^[0-9]+$/.test(form[3].value) && form[3].value.charAt(0) === "0") {

            document.querySelector("#formMobile").style.display = "none";
        }
        
        else {

            document.querySelector("#formMobile").style.display = "block";
            flag = false;
        }

        if (/^[a-zA-Z0-9-' ]+$/.test(form[4].value) && form[4].value.charAt(0) !== " ") {

            document.querySelector("#formAddress").style.display = "none";
        }
        
        else {

            document.querySelector("#formAddress").style.display = "block";
            flag = false;
        }

        if (/^[a-zA-Z-' ]+$/.test(form[5].value) && form[5].value.charAt(0) !== " ") {

            document.querySelector("#formCity").style.display = "none";
        }
        
        else {

            document.querySelector("#formCity").style.display = "block";
            flag = false;
        }

        if (/^[a-zA-Z-' ]+$/.test(form[6].value) && form[6].value.charAt(0) !== " ") {

            document.querySelector("#formCountry").style.display = "none";
        }
        
        else {

            document.querySelector("#formCountry").style.display = "block";
            flag = false;
        }

        if (/^[0-9]+$/.test(form[7].value) && form[7].value.length === 7) {

            document.querySelector("#formZipCode").style.display = "none";
        }
        
        else {

            document.querySelector("#formZipCode").style.display = "block";
            flag = false;
            console.log(form[7].value)
        }

        if (flag) {

            const user = {

                "fname": form[1].value,
                "lname": form[2].value,
                "mobile": form[3].value,
                "address": form[4].value,
                "city": form[5].value,
                "country": form[6].value,
                "zipcode": form[7].value
            };

            if (form[8].files.length) {

                const photo = await toBase64(form[8].files[0])

                user.photo = { title: `${this.state.user.id}.${form[8].files[0].name.split(/\.(?=[^\.]+$)/)[1]}`, picture: photo }
            }
                

            const token = window.localStorage.getItem(process.env.REACT_APP_STORE_NAME)

            if (token) {
        
              axios({
                url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/user-update/${this.state.user.id}`,
                method: "PUT",
                headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
                data: { token, user }
              })
              .then(async (res) => {
                
                if (res.data.error)
                  window.alert(res.data.message)
                
                else {                
                    window.alert("The profile has been updated successfully");
                    window.location.href = `${process.env.REACT_APP_SERVER}/account/`
                }
              })
              .catch(err => window.alert(err))
            }
        }
    }

    render() {
        return(
            <div className="lead" style={{textAlign: "center", width: "95%", margin: "0 auto"}}>
                <br/><br/><br/><br/>

                <div className="main-body">
                
                <div>
                    <ol className="breadcrumb">
                        <li><NavLink to="/account" style={{textDecoration: "none"}}>Account&nbsp;</NavLink></li>
                            / <NavLink to={"/account/profile/"} style={{textDecoration: "none"}}><li className="active">&nbsp;Profile</li></NavLink>
                    </ol>
                </div>

                    <div className="row gutters-sm">

                        <AccountMenu {...this.props} />

                        <div className="col-md-10">
                        <form method="POST" encType='multipart/form-data' onSubmit={(e) => { e.preventDefault(); this.updateDetails(e.target); }}>
                            <div className="card mb-3">
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Email</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.email} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required disabled/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">First Name</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.fname} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required/>
                                    <p className="text-danger" id="formFName" style={{display: "none"}}>English alphabet and -' only</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Last Name</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.lname} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required/>
                                    <p className="text-danger" id="formLName" style={{display: "none"}}>English alphabet and -' only</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Mobile</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.mobile} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required minLength='9' maxLength='10'/>
                                    <p className="text-danger" id="formMobile" style={{display: "none"}}>Please enter a valid mobile number</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Address</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.address} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required/>
                                    <p className="text-danger" id="formAddress" style={{display: "none"}}>English alphabet, digits and -' only</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">City</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.city} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required/>
                                    <p className="text-danger" id="formCity" style={{display: "none"}}>English alphabet and -' only</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Country</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.country} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required/>
                                    <p className="text-danger" id="formCountry" style={{display: "none"}}>English alphabet and -' only</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Zip Code</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" defaultValue={this.state.user.zipcode} style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}} required minLength='7' maxLength='7'/>
                                    <p className="text-danger" id="formZipCode" style={{display: "none"}}>Please enter a valid zip code</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <h5 className="mb-0">Avatar</h5>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" style={{textAlign: "center", width: "30%", margin: "0 auto", fontSize: "large"}}/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <button type="reset" className="btn btn-primary">&emsp;&nbsp;&thinsp;Reset&emsp;&nbsp;&thinsp;</button>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <button className="btn btn-primary">Save Changes</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>

            <br/><br/><br/><br/><br/><br/>
            </div>
        );  
    }
}