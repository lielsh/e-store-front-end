import './AccountAdmin.css';
import { NavLink, Redirect } from 'react-router-dom';
import { Admin, Resource, fetchUtils } from 'react-admin';
import AccountAdminDashboard from '../../../components/Account/AccountAdminDashboard/AccountAdminDashboard';
import { UserList, UserEdit, UserCreate } from '../../../components/Account/AccountAdminUsers/AccountAdminUsers';
import { OrderList, OrderEdit } from '../../../components/Account/AccountAdminOrders/AccountAdminOrders';
import * as Contact from '../../../components/Account/AccountAdminContacts/AccountAdminContacts'
import * as Coupon from '../../../components/Account/AccountAdminCoupons/AccountAdminCoupons';
import * as OrderStatus from '../../../components/Account/AccountAdminOrdersStatus/AccountAdminOrdersStatus';
import * as Product from '../../../components/Account/AccountAdminProducts/AccountAdminProducts';
import * as Brand from '../../../components/Account/AccountAdminProductsBrands/AccountAdminProductsBrands'
import * as Categoty from '../../../components/Account/AccountAdminProductsCategories/AccountAdminProductsCategories'
import * as SubCategoty from '../../../components/Account/AccountAdminProductsSubCategories/AccountAdminProductsSubCategories'
import * as Type from '../../../components/Account/AccountAdminProductsTypes/AccountAdminProductsTypes'
import * as Auth from '../../../components/Account/AccountAdminUsersAuthentications/AccountAdminUsersAuthentications'
import * as Role from '../../../components/Account/AccountAdminUsersRoles/AccountAdminUsersRoles'
import * as Ticket from '../../../components/Account/AccountAdminTickets/AccountAdminTickets'
import * as TicketStatus from '../../../components/Account/AccountAdminTicketsStatus/AccountAdminTicketsStatus'
import ComputerIcon from '@material-ui/icons/Computer';
import UserIcon from '@material-ui/icons/Group';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CommentIcon from '@material-ui/icons/Comment';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import EmailIcon from '@material-ui/icons/Email';

import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import createAdminStore from '../../../store/createAdminStore';

import firebaseDataProvider from 'ra-data-firebase-client'
import firebase from '../../../functions/firebase';

import simpleRestProvider from 'ra-data-simple-rest';

const history = createHashHistory();

const httpClient = (url, options = {}) => {

    options.user = {
        authenticated: true,
        token: process.env.REACT_APP_BEARER_TOKEN_ADMIN
    }
    
    return fetchUtils.fetchJson(url, options)
}

// const dataProvider = firebaseDataProvider(firebase, {})
const dataProvider = simpleRestProvider(process.env.REACT_APP_PROXY_ADMIN, httpClient);

/*
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
 const convertFileToBase64 = file =>

    new Promise((resolve, reject) => {

        const reader = new FileReader();
        
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
 });

const myDataProvider = {

    ...dataProvider,

    create: (resource, params) => {

        // fallback to the default implementation
        if (resource !== 'products' && !params.data.pictures) {
            
            return dataProvider.create(resource, params);
        }

        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = params.data.pictures.filter(
            p => p.rawFile instanceof File
        );
        const formerPictures = params.data.pictures.filter(
            p => !(p.rawFile instanceof File)
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map((picture64, i) => ({
                    src: picture64,
                    title: `${params.data.name}-${(new Date()).getTime()}${i}.${params.data.pictures[i].title.split(/\.(?=[^\.]+$)/)[1]}`,
                }))
            )
            .then(transformedNewPictures =>
                dataProvider.create(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        pictures: [
                            ...transformedNewPictures,
                            ...formerPictures,
                        ],
                    },
                })
            );
    },
    update: (resource, params) => {

        // fallback to the default implementation
        if (['products', 'contacts'].indexOf(resource) === -1 || !params.data.pictures) {
            
            return dataProvider.update(resource, params);
        }

        if (!Array.isArray(params.data.pictures))
            params.data.pictures = [params.data.pictures]
            
        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = params.data.pictures.filter(
            p => p.rawFile instanceof File
        );
        const formerPictures = params.data.pictures.filter(
            p => !(p.rawFile instanceof File)
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map((picture64, i) => ({
                    src: picture64,
                    title: `${params.data.name}-${(new Date()).getTime()}${i}.${params.data.pictures[i].title.split(/\.(?=[^\.]+$)/)[1]}`,
                }))
            )
            .then(transformedNewPictures =>
                dataProvider.update(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        pictures: [
                            ...transformedNewPictures,
                            ...formerPictures,
                        ],
                    },
                })
            );
    }
};

export default function AccountAdmin(props) {

    if (props.user.role === "Administrator") {
        return (
            <Provider store={createAdminStore({history})}>
                <div className="lead" style={{width: "95%", margin: "0 auto"}}>

                    <br/><br/><br/><br/>

                    <div>
                        <ol className="breadcrumb">
                            <li><NavLink to="/account" style={{textDecoration: "none"}}>Account&nbsp;</NavLink></li>
                                / <NavLink to={"/account/admin/"} style={{textDecoration: "none"}}><li className="active">&nbsp;Admin</li></NavLink>
                        </ol>
                    </div>
                    
                    <Admin history={history} dashboard={AccountAdminDashboard} dataProvider={myDataProvider}>
                        <Resource name="contacts" list={Contact.ContactList} edit={Contact.ContactEdit} icon={ContactPhoneIcon}/>
                        <Resource name="coupons" list={Coupon.CouponList} edit={Coupon.CouponEdit} create={Coupon.CouponCreate} icon={LoyaltyIcon}/>
                        <Resource name="orders" list={OrderList} edit={OrderEdit} icon={ReceiptIcon}/>
                        <Resource name="orders-status" list={OrderStatus.StatusList} edit={OrderStatus.StatusEdit} create={OrderStatus.StatusCreate} icon={ReceiptIcon}/>
                        {/* <Resource name="post" icon={CommentIcon}/> */}
                        <Resource name="products" list={Product.ProductList} edit={Product.ProductEdit} create={Product.ProductCreate} icon={ComputerIcon}/>
                        <Resource name="products-brands" list={Brand.BrandList} edit={Brand.BrandEdit} create={Brand.BrandCreate} icon={ComputerIcon}/>
                        <Resource name="products-categories" list={Categoty.CategoryList} edit={Categoty.CategoryEdit} create={Categoty.CategoryCreate} icon={ComputerIcon}/>
                        <Resource name="products-subcategories" list={SubCategoty.SubCategoryList} edit={SubCategoty.SubCategoryEdit} create={SubCategoty.SubCategoryCreate} icon={ComputerIcon}/>
                        <Resource name="products-types" list={Type.TypeList} edit={Type.TypeEdit} create={Type.TypeCreate} icon={ComputerIcon}/>
                        <Resource name="tickets" list={Ticket.TicketList} edit={Ticket.TicketEdit} icon={EmailIcon}/>
                        <Resource name="tickets-status" list={TicketStatus.StatusList} edit={TicketStatus.StatusEdit} create={TicketStatus.StatusCreate} icon={EmailIcon}/>
                        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
                        <Resource name="users-auths" list={Auth.AuthList} edit={Auth.AuthEdit} create={Auth.AuthCreate} icon={UserIcon}/>
                        <Resource name="users-roles" list={Role.RoleList} edit={Role.RoleEdit} create={Role.RoleCreate} icon={UserIcon}/>
                    </Admin>

                    <br/><br/><br/><br/>

                </div>
            </Provider>
        )
    }
    
    else {
        return <Redirect to={{pathname: "/"}}/>
    }
}
