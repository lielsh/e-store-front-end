import { NavLink } from "react-router-dom";
import AccountMenu from '../../../components/Account/AccountMenu/AccountMenu';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios'
import './Account.css';

export default function Account(props) {


    function deleteAvatar() {

        const token = window.localStorage.getItem(process.env.REACT_APP_STORE_NAME)

        if (token) {
    
          axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/user-delete-avatar/${props.user.id}`,
            method: "PUT",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
            data: { token }
          })
          .then((res) => {
            
            if (res.data.error)
              window.alert(res.data.message)
            
            else {                
                window.alert("The profile has been updated successfully");
                window.location.reload()
            }
          })
          .catch(err => window.alert(err))
        }
    }

    return(
        <div className="lead" style={{textAlign: "center", width: "95%", margin: "0 auto"}}>
            <br/><br/><br/><br/>

            <div className="main-body">
            
            <div>
                <ol className="breadcrumb">
                    <li><NavLink to="/account" style={{textDecoration: "none"}}>Account&nbsp;</NavLink></li>
                </ol>
            </div>

                <div className="row gutters-sm">

                    <AccountMenu {...props} />

                    <div className="col-md-10">
            
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            {props.user.photo ?
                                                <OverlayTrigger placement='bottom' overlay={<Tooltip> Click to delete image </Tooltip>}>
                                                    <img src={`${process.env.REACT_APP_PROXY_PUBLIC}/images/avatars/${props.user.photo}`} alt="Avatar" id="user-avatar" className="rounded-circle" width="150"
                                                    onClick={() => deleteAvatar()}/>
                                                </OverlayTrigger>   
                                                :
                                                <img src={`${process.env.REACT_APP_PROXY_PUBLIC}/images/avatars/default.png`} alt="Avatar" className="rounded-circle" width="150"/>
                                            }
                                            <div className="mt-3">
                                                <h4>{props.user.fname}&nbsp;{props.user.lname}</h4>
                                                <p className="text-muted font-size-sm">{props.user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <br/><br/><br/><br/><br/><br/>
    </div>
    );
}