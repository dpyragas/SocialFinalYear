import './chat.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ chat, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = chat.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios('/users?userId=' + friendId);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser, chat]);
  return (
    <div>
      <div className='chat'>
        <img
          className='chatImg'
          src='https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
          alt=''
        />
        <span className='chatName'>{user?.username}</span>
      </div>
    </div>
  );
}

export default Chat;
