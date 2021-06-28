import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { closeProductAlert } from '../../../actions/actions';

function CartAlert(props) {

    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <div>
          <br/>
          <Alert variant="success" onClose={() => { props.closeProductAlert(); }} dismissible style={{width: "50%", margin: "0 auto", position: "relative", top: "100px"}}>
            <Alert.Heading style={{textAlign: "center"}}>The Shopping Cart Has Been Updated</Alert.Heading>
          </Alert>
        </div>
      );
    }

    return (<Button onClick={() => setShow(true)} style={{display: "none"}}>Show Alert</Button>);
  }

export default connect("", { closeProductAlert })(CartAlert)