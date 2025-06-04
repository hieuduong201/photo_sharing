import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserPhotos = () => {
  const currentUser=useSelector((state)=>(state.user))
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [newComment,setNewComment]=useState({})
  const handleChange=(photoId,value)=>{
    setNewComment((prev)=>({...prev,[photoId]:value}))
  }
  const handleSubmit=async(phoId)=>{
    if(!newComment[phoId])
    {
      return
    }
    const res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/photo/comment/${phoId}`,{comment:newComment[phoId],user_id:currentUser._id})
    fetchPhotos()
    setNewComment((prev)=>({...prev,[phoId]:''}))
  }
  const handleDeleteComment=async(photoId,commentId)=>{
    const res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/photo/deletecomment/${photoId}`,{commentId})
    fetchPhotos()
  }
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getall`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPhotos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/photo/getall/${userId}`);
      setPhotos(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchPhotos();
  }, []);
  return (
    <div>
      {photos.map(photo => (
        <Card key={photo._id} style={{ marginBottom: '16px' }}>
          <img
            className='img-resize'
            src={`/images/${photo.file_name}`}
            alt="User Upload"
          />
          <CardContent>
            
            <Typography variant="body2">
              Ngày đăng: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            {photo.comments && photo.comments.map(comment => (
              <div key={comment._id} style={{ marginTop: '8px' }}>
                <Typography variant="caption">
                  <p >{new Date(comment.date_time).toLocaleString()}</p>
                  {users.find(user => user._id === comment.user_id) && (
                  <Link to={`/users/${comment.user_id}`}>
                    {users.find(user => user._id === comment.user_id).first_name}{" "}
                    {users.find(user => user._id === comment.user_id).last_name}
                  </Link>
                ) }

                  : {comment.comment}
                  {comment.user_id===currentUser._id&&
                  (<button style={{marginLeft:'10px'}} onClick={()=>{handleDeleteComment(photo._id,comment._id)}}>Xoa</button>)}
                </Typography>
              </div>
            ))}
            <div style={{display:'flex'}}>
              <input type="text" style={{width:'300px'}} value={newComment[photo._id]} onChange={(e)=>{handleChange(photo._id,e.target.value)}}/>
              <button onClick={()=>{handleSubmit(photo._id)}}>Gửi</button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserPhotos;
