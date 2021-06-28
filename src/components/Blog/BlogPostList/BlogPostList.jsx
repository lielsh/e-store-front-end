import { NavLink } from 'react-router-dom';

export default function BlogPostList(props) {

    let datetime = props.datetime;
    let updated;

    if (props.updated) {
        updated = "(Updated)";
    }

    return(
        <div className="card" style={{fontStyle: "italic"}}>
            <div className="card-header">
                <NavLink to={"/blog/"+props.name} style={{color: "black"}}><h3 className="card-title">{props.title}</h3></NavLink>
                <small className="text-muted">{props.author} - February 17, 2021, 11:56 {updated}</small>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {props.subtitle}
                </p>
                <div style={{textAlign: "center"}}><br/><img className="card-img-top" src={props.img} alt={props.name} style={{width: "150px"}}/></div>
                <p className="card-text">
                    <br/><NavLink to={"/blog/"+props.name}>SHOW MORE</NavLink>
                </p>
            </div>
            <div className="card-footer">
                <NavLink to={"/blog/"+props.name}><small className="text-muted">{props.comments.length} Comments</small></NavLink>
            </div>
        </div>
    );
}