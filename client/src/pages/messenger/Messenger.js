import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Chat from '../../components/chat/Chat';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { io } from 'socket.io-client';

function Messenger() {
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  console.log(user);
  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get('/chat/' + user._id);
        setChat(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getChat();
  }, [user._id]);

  useEffect(() => {
    const getMesssages = async () => {
      try {
        const res = await axios.get('/messages/' + currentChat?._id);

        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMesssages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      chatId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post('/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input
              placeholder='Search for other users'
              className='chatMenuInput'
            />
            {chat.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Chat chat={chat} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className='chatBoxTop'>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='Your message'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className='chatSubmitButton' onClick={handleSubmit}>
                    Send
                  </button>
                </div>{' '}
              </>
            ) : (
              <span className='noChat'>Open a conversation to start...</span>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
