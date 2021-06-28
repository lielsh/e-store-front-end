import { Link } from "react-router-dom";

export default function Confirmation(props) {

    const orderID = JSON.parse(localStorage.getItem("Order")).id;

    setTimeout(() => {localStorage.removeItem("Order");}, 0);

    if (props.location.params) {

        return (
            <div className="lead container" style={{margin: "0 auto", width: "95%"}}>

                <br/><br/><br/><br/>

                <h1>Your order confirmation number is: {orderID}</h1>

                <br/>

                <h2><Link to="/shop"> Click Here To Continue Shopping </Link></h2>

            </div>
        )
    }

    else {
        {props.history.goBack()}
    }
}
