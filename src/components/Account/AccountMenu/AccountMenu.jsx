import { NavLink } from "react-router-dom";
import { auth } from '../../../functions/firebase';
import { connect } from 'react-redux';
import { updateUserNavbar } from '../../../actions/actions';

function AccountMenu(props) {

    function signOut() {

        const confirm = window.confirm("Are you sure?");

        if (confirm) {

            props.updateUserNavbar(null);

            auth().signOut().then(() => {props.history.push("/sign-in-up")}).catch((error) => {alert(error)});
        }
    }

    return (
        <div className="col-md-2 mb-3">
            <div className="card">
                <div className="card-body">
                    <div>
                        <div className="row">
                            <NavLink to="/account" style={{margin: "0 auto"}}><button className="btn btn-success" style={{width: "100px", fontSize: "large"}}>Welcome</button></NavLink>
                        </div>
                        <hr/>
                        <div className="row">
                            <NavLink to="/account/profile" style={{margin: "0 auto"}}><button className="btn btn-secondary" style={{width: "100px", fontSize: "large"}}>Profile</button></NavLink>
                        </div>
                        <hr/>
                        <div className="row">
                            <NavLink to="/account/orders" style={{margin: "0 auto"}}><button className="btn btn-secondary" style={{width: "100px", fontSize: "large"}}>Orders</button></NavLink>
                        </div>
                        <hr/>
                        <div className="row">
                            <button className="btn btn-danger" onClick={signOut} style={{margin: "0 auto", width: "100px", fontSize: "large"}}>Sign Out</button>
                        </div>
                        {props.user.role === "Administrator" ?
                            <>
                            <hr/>
                            <div className="row">
                                <NavLink to="/account/admin" style={{margin: "0 auto"}}><button className="btn btn-warning" style={{width: "100px", fontSize: "large"}}>Admin</button></NavLink>
                            </div>
                            </>
                        : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect("", { updateUserNavbar })(AccountMenu)
