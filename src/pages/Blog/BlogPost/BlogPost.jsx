import { NavLink } from 'react-router-dom';
import BlogPostAddComments from '../../../components/Blog/BlogPostAddComments/BlogPostAddComments';
import BlogPostViewComments from '../../../components/Blog/BlogPostViewComments/BlogPostViewComments';
import NotFound from '../../404/NotFound';
import { connect } from 'react-redux';

function BlogPost({ posts }) {
        
    const temp = posts.filter(post => post.name === window.location.href.split("/blog/")[1]);

    let post;
    let updated;

    if (temp.length === 1) {
        
        post = temp[0];

        if (post.updated)
            updated = "(Updated)";
    }

    if (!post.comments)
        post.comments = []

    if (post) {
        return (
            <main role="main" className="lead" style={{width: "95%", margin: "0 auto"}}>
                
                <br/><br/><br/><br/>

                <div>
                    <ol className="breadcrumb">
                        <li><NavLink to="/blog" style={{textDecoration: "none"}}>Go back to blog</NavLink></li>
                    </ol>
                </div>

                <div className="card border-light" style={{fontStyle: "italic"}}>
                    <div className="card-header">
                        <NavLink to={"/blog/"+post.name} style={{color: "black"}}><h3 className="card-title">{post.title}</h3></NavLink>
                        <small className="text-muted">{post.author} - February 17, 2021, 11:56 {updated}</small>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {post.subtitle}
                        </p>
                        <div style={{textAlign: "center"}}><br/><img className="card-img-top" src={post.img} alt={post.name} style={{width: "150px"}}/></div>
                    </div>
                    <p className="card-text" style={{whiteSpace: "pre"}}>
                        <br/>{post.details}
                    </p>
                    <div className="card-footer">
                        <small className="text-muted">{post.comments.length} Comments</small>
                        {/* this.user ? <BlogPostAddComments/> : null */}
                        <BlogPostAddComments/>
                        <br/>
                        {post.comments.length > 0 ? <hr style={{width: "102%", position: "relative", right: "1%"}}/> :null}
                        {post.comments.length > 0 ?
                            post.comments.map((comment, count) => 
                            count === post.comments.length-1 ? <div key={count}><BlogPostViewComments comment={comment}/></div> : <div key={count}><BlogPostViewComments comment={comment}/><br/></div>)
                        : null}
                    </div>
                </div>

                <br/><br/><br/><br/>

            </main>
        )
    }

    else {
        return <NotFound />;
    }
}

const mapStateToProps = state => ({
    posts: state.global.data.posts
  })
  
export default connect(mapStateToProps)(BlogPost)
