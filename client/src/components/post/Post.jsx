import './post.css';
import {
  MoreVert,
  KeyboardArrowUpRounded,
  RateReviewRounded,
} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import defaultProfilePicture from '../../images/defaultAvatar.png';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const voteHandler = () => {
    try {
      axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={user.profilePicture || defaultProfilePicture}
                alt=''
              />
            </Link>
            <span className='postUsername'>
              {user.username}
              <br></br>
              <span className='postDate'>{format(post.createdAt)}</span>
            </span>
          </div>
          <div className='postTopRight'>
            <EditIcon />
            <CloseIcon />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.content}</span>
          <img className='postImg' src={post.image} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <KeyboardArrowUpRounded className='upvote' onClick={voteHandler} />

            <span className='postLikeCounter'>{like} </span>
          </div>
          <div className='postBottomRight'>
            <div className='postCommentIcon'>
              <RateReviewRounded />
              <span className='postCommentText'>{post.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
