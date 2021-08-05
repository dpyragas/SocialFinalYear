import './share.css';
import {
  PermMedia,
  CodeRounded,
  LinkRounded,
  Cancel,
} from '@material-ui/icons';
import DescriptionIcon from '@material-ui/icons/Description';
import defaultProfilePicture from '../../images/defaultAvatar.png';

import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {
  const { user } = useContext(AuthContext);
  const content = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      content: content.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post('/upload', data);
      } catch (err) {}
    }
    try {
      await axios.post('/posts', newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={user.profilePicture || defaultProfilePicture}
            alt=''
          />
          <input
            placeholder={`Would you like to post anything ${user.username}?`}
            className='shareInput'
            ref={content}
          />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia className='shareIcon' />
              <span className='shareOptionText'>Media</span>
              <input
                style={{ display: 'none' }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              <DescriptionIcon className='shareIcon' />
              <span className='shareOptionText'>File</span>
            </div>
            <div className='shareOption'>
              <CodeRounded className='shareIcon' />
              <span className='shareOptionText'>Code</span>
            </div>

            <div className='shareOption'>
              <LinkRounded className='shareIcon' />
              <span className='shareOptionText'>Link</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
