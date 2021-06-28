import BlogPostList from '../../../components/Blog/BlogPostList/BlogPostList';
import { connect } from 'react-redux';

function Blog({ posts }) {
    return(
        <div className="lead" style={{margin: "0 auto", width: "50%"}}>

            <br/><br/><br/><br/>

            <h1 style={{textAlign: "center"}}>Blog</h1><br/>

            {posts.map(post =>
                <div key={post.id}> 
                    <BlogPostList name={post.name} img={post.img[0]} title={post.title} author={post.author} subtitle={post.subtitle} comments={post.comments || []} datetime={post.datetime} updated={post.updated}/>
                    <br/><br/>
                </div>
            )}

            <br/><br/>

        </div>
    );
}

const mapStateToProps = state => ({
    posts: state.global.data.posts
  })
  
export default connect(mapStateToProps)(Blog)