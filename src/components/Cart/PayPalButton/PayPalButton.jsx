import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { setLoading } from '../../../actions/actions';
import axios from 'axios'

function PayPalButton(props) {

    const paypal = useRef()

    const shipping = []
    const products = []

    props.review[0].checked ?
                        shipping.push(props.review[0].value.split(",")[0], "₪" + props.review[0].value.split(",")[1] + ".00"): 
                        props.review[1].checked ? shipping.push(props.review[1].value.split(",")[0], "₪" + props.review[1].value.split(",")[1] + ".00"): 
                        shipping.push(props.review[2].value.split(",")[0], "₪" + props.review[2].value.split(",")[1] + ".00")
    
    for (const [key, value] of Object.entries(props.params.productsInCart)) {

        products.push({prodId: key, prodQuantity: value})
    }
    useEffect(() => {
        window.paypal.Buttons({
            createOrder:(data,actions,err)=>{
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units:[
                        {
                            // description:"there is "+ cart +"items on your cart ",
                            description:"LIEL'S LTD",
                            amount:{
                                currency_code:"ILS",
                                // value:localStorage.getItem("total"),
                                value: props.amount,
                            }
                        }
                    ]
                })

            },
            onApprove:async (data,actions)=>{

                props.setLoading();

                const order = await actions.order.capture()

                const newOrder = {

                    "id": order.id,
                    "datetime": order.create_time,
                    "uid": props.user.id,
                    "total": "₪" + props.amount,
                    "coupons": props.params.couponsArr,
                    "productsInCart": products,
                    "shipping": shipping,
                    "payment": props.review[3].value,
                    "refund": false
                }

                const token = window.localStorage.getItem(process.env.REACT_APP_STORE_NAME)

                if (token) {

                    axios({
                      url: `${process.env.REACT_APP_PROXY_PUBLIC}/users/add-order`,
                      method: "POST",
                      headers: { authorization: process.env.REACT_APP_BEARER_TOKEN_PUBLIC },
                      data: { token, order: newOrder }
                    })
                    .then(res => {
                      
                      if (res.data.err)
                        window.alert(res.data.err)
                      
                      else
                        localStorage.setItem("Order", JSON.stringify(order))
                    })
                    .catch(err => window.alert(err))
                }   
            },
            onError: (err)=>{
                localStorage.setItem("Order",null)
                alert(err)

            }
            
        }).render(paypal.current)

    }, [])
    return (
        <div ref={paypal}></div>
    )
}


export default connect("", { setLoading })(PayPalButton)
