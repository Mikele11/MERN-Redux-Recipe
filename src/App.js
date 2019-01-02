import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchPosts, deletePost } from './actions/postActions.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
   this.props.fetchPosts(); 
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  onDelete(index){
    this.props.deletePost(this.props.posts[index]._id); 
  }
  
  render() {
    console.log('render',this.props.posts)

    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Recipe List &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Recipe</Link></h4>
            <div>
                {this.props.posts.map((post,index)  =>
                <div class="article">
                  <div class ="article_date">
                    <div>Recording time: </div>
                    <div>{post.date}</div>
                  </div>
                  <div>{post.description}</div>
                    <div class ="article_author">
                    <div>Author: </div>
                    <div>{post.author}</div>
                  </div>
                  <div class ="article_author">                                                    
                    <div><Link to={`/showcomment/${this.props.posts[index]._id}`}>Comments: </Link></div>
                    <div>{post.comment.length}</div>
                  </div>
                  <div class ="article_buttons">
                    <div>
                      <button class="btn btn-warning"><Link to={`/update/${this.props.posts[index]._id}`}>Update<i class="glyphicon glyphicon-edit"></i></Link></button>
                    </div>
                    <div><button class="btn btn-danger" onClick={this.onDelete.bind(this,index)}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
                    <div>
                      <button class="btn btn-primary"><Link to={`/addcomment/${this.props.posts[index]._id}`}>add comments</Link></button>
                    </div>
                  </div>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(App);
