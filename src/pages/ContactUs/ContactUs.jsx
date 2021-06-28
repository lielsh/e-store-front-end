import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import './ContactUs.css';
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner';

export default class ContactUs extends Component {

    constructor() {

        super()

        this.state = {contacts: null, sending: false}

        this.sendMessage = this.sendMessage.bind(this)

        this.formRef = React.createRef()
    }

    sendMessage(name, email, subject, message) {
        
        if (name && email && subject && message) {

            this.setState({ sending: true })

            axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/emails/from-client`,
            method: "POST",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
            data: { name, email, subject, message, datetime: new Date() }
            })
            .then(res => {
            
            if (res.data.error) {

                window.alert(res.data.message)
                this.setState({ sending: false })
            }
            
            else {

                this.formRef.current[0].value = ''
                this.formRef.current[1].value = ''
                this.formRef.current[2].value = ''
                this.formRef.current[3].value = ''

                window.alert(res.data.message)
                this.setState({ sending: false })
            }
            })
            .catch(err => {
                window.alert(err)
                this.setState({ sending: false })
            })
        }
    }

    componentDidMount() {

        axios({
            url: `${process.env.REACT_APP_PROXY_PUBLIC}/contacts`,
            method: "GET",
            headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC }
            })
            .then(res => {
            
            if (res.data.error)
                console.log(res.data.error)
            
            else
                this.setState({contacts: res.data[0]})
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.contacts) {
            return (
                <div className="conatiner lead">
                    
                    <br/><br/>
                
                    <MapContainer center={[this.state.contacts.latitude, this.state.contacts.longitude]} zoom={this.state.contacts.zoom} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[this.state.contacts.latitude, this.state.contacts.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                        {/* <Marker position={[this.state.contacts.latitude, this.state.contacts.longitude]} icon={new Icon({iconUrl: "/icon.ico", iconSize: [50, 50], iconAnchor: [15, 35]})}> */}
                            <Popup>
                                <div style={{textAlign: "center"}}>
                                    <img src={this.state.contacts.logo} alt={this.state.contacts.name}/>
                                    <h6><br/><i>&nbsp;{this.state.contacts.address}, {this.state.contacts.city}, {this.state.contacts.country}&ensp;</i></h6>
                                    <h6><i>Telephone: {this.state.contacts.telephone}</i></h6>
                                </div>
                            </Popup>
                            <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
                            {/* <Tooltip direction="top" offset={[10, -35]} opacity={1} permanent> */}
                                <span  style={{fontWeight: "bold"}}>{this.state.contacts.name}</span>
                            </Tooltip>
                        </Marker>
                    </MapContainer>
                
                    <br/><br/>

                    <div style={{margin: "0 auto", width: "40%"}}>

                        <h2 style={{textAlign: "center"}}>DROP YOUR MESSAGE</h2>

                        <br/><p style={{textAlign: "center"}}><i>{this.state.contacts.address}, {this.state.contacts.city}, {this.state.contacts.country}</i></p>
                        <p style={{textAlign: "center"}}><i>Telephone: {this.state.contacts.telephone}</i></p><br/>
                        
                        <form className="row main_contact" method="POST" id="contact_message" ref={this.formRef} onSubmit={e => { e.preventDefault(); this.sendMessage(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value) }}>

                            <div className="col-sm">

                                <label>Name *</label><br/>
                                <input type="text" name="name" required/><br/>

                                <br/><label>Email *</label><br/>
                                <input type="email" name="email" required/>

                            </div>

                            <div className="col-sm">

                                <label>Subject *</label><br/>
                                <input type="text" name="subject" required/><br/>

                                <br/><label>Message *</label><br/>
                                <textarea name="message" form="contact_message" required style={{resize: "none"}}></textarea>

                            </div>
                            {this.state.sending ?
                                <div style={{position: "relative", left: '25%'}}><Spinner/></div>
                                :
                                <button type="submit" name="submit_message">SUBMIT MESSAGE</button>
                            }
                        </form>

                    </div>

                    <br/><br/><br/><br/>

                </div>
            )
        }

        else {
            return(<Spinner/>)
        }
    }
}