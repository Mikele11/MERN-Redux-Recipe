import { FETCH_POSTS, FETCH_COMMENTS, NEW_COMMENT, NEW_POST, UPDATE_POST, DELETE_POST } from '../actions/types'
import axios from 'axios';

export const fetchPosts =()=> dispatch => {
  return axios.get(`/api/post`)
  .then(res => {
    dispatch({
      type: FETCH_POSTS,
      payload: res.data
    })
  })
  .catch((error) => {
    this.props.history.push("/login"); 
    console.log('action err',error)	  
  });
};

export const deletePost = id => dispatch => {
  return axios.delete(`/api/post/${id}`)
  .then((result) => {

    axios.delete(`/api/post/comment/${id}`)
    .then(res => {
      console.log('deleted comment',res);
    })
    .catch((error) => {
      console.log('error',error);
    });
    axios.get('/api/post')
      .then(res => {
        dispatch({
          type: DELETE_POST,
          payload: res.data
        })
      })
      .catch((error) => {
        console.log('error',error);
      });

  });
};

export const fetchComments = id => dispatch => {
  return axios.get(`/api/post/comment/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    })
  })
  .catch((error) => {
    this.props.history.push("/");  
    console.log('action err',error)	  
  });
};


export const createComment = (id, commentData) => dispatch => {
  return axios.post(`/api/post/comment/${id}`,commentData)
    .then((res) =>{
        dispatch({
          type: NEW_COMMENT,
          payload: res.data
        })
        console.log('create data',res.data)
      }
    )
    .catch(err =>{
      this.props.history.push("/")
      console.log('action err',err)
  });
};

export const createPost = (postData) => dispatch => {
  return axios.post(`/api/post`,postData)
    .then((res) =>{
      console.log('new_post',res)
        dispatch({
          type: NEW_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      this.props.history.push("/")
      console.log('action err',err)
  });
};

export const updatePost = (id,postData) => dispatch => {
  return axios.put(`/api/post/${id}`,postData)
    .then((res) =>{
      console.log('update_post',res)
        dispatch({
          type: UPDATE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      console.log('action err',err)
  });
};

