import './message.css';
import { format } from 'timeago.js';

function Message({ message, own }) {
  return (
    <div>
      <div className={own ? 'message own' : 'message'}>
        <div className='messageTop'>
          <img
            className='messageImg'
            src='https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
            alt=''
          />
          <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
      </div>
    </div>
  );
}

export default Message;
