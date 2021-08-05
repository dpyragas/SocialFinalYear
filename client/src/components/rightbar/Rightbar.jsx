import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import bcusu from '../../images/bcusu.png';
import quiz from '../../images/quiz.png';

export default function Rightbar({ user }) {
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [friends, setFriends] = useState([]);
  // const { user: currentUser, dispatch } = useContext(AuthContext);
  // const [followed, setFollowed] = useState(
  //   currentUser.followings.includes(user?.id)
  // );

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("/users/friends/" + user._id);
  //       setFriends(friendList.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // }, [user]);

  // const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(`/users/${user._id}/unfollow`, {
  //         userId: currentUser._id,
  //       });
  //       dispatch({ type: "UNFOLLOW", payload: user._id });
  //     } else {
  //       await axios.put(`/users/${user._id}/follow`, {
  //         userId: currentUser._id,
  //       });
  //       dispatch({ type: "FOLLOW", payload: user._id });
  //     }
  //     setFollowed(!followed);
  //   } catch (err) {
  //   }
  // };

  const HomeRightbar = () => {
    return (
      <>
        <Calendar />
        <div className='birthdayContainer'>
          <div className='birthdayText'>
            <b>Upcoming events:</b>
            <div className='event'>
              <span style={{ fontWeight: '400' }}>14th May -</span>
              <span style={{ color: '#0097F1' }}> Have Your Say</span>
            </div>
          </div>
        </div>
        <img className='rightbarAd' src={bcusu} alt='' />
        <div className='birthdayText'>
          <div className='event'>
            <span style={{ fontWeight: '400' }}>20th May -</span>
            <span style={{ color: '#0097F1' }}> Quiz in the Loft</span>
          </div>
        </div>
        <img className='rightbarAd' src={quiz} alt='' />
        <div className='birthdayText'>
          <div className='event'>
            <span style={{ fontWeight: '400' }}>27th May -</span>
            <span style={{ color: '#0097F1' }}> The Amazing Event</span>
          </div>
        </div>
        <img className='rightbarAd' src={bcusu} alt='' />
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {/* {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )} */}
        <h4 className='rightbarTitle'>Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Title:</span>
            <span className='rightbarInfoValue'>Student</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Course:</span>
            <span className='rightbarInfoValue'>Computer and Data Science</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Skills:</span>
            <span className='rightbarInfoValue'>
              JavaScript, ReactJS, Node.js, Python
            </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Connect:</span>
            <span className='rightbarInfoValue'>
              <a href='/' style={{ color: 'blue', fontWeight: '400' }}>
                LinkedIn, Github
              </a>
            </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Portfolio:</span>
            <span className='rightbarInfoValue'>
              <a
                href='https://pyragas.dev'
                style={{ color: 'blue', fontWeight: '400' }}
              >
                https://pyragas.dev
              </a>
            </span>
          </div>
        </div>
        <h4 className='rightbarTitle'>About me:</h4>
        <div className='rightbarAboutMe'>
          Knight Rider, a shadowy flight into the dangerous world of a man who
          does not exist. Michael Knight, a young loner on a crusade to champion
          the cause of the innocent, the helpless in a world of criminals who
          operate above the law. Hey there where ya goin’, not exactly knowin’,
          who says you have to call just one place home. He’s goin’ everywhere,
          B.J. McKay and his best friend Bear. He just keeps on movin’, grooves
          keep improvin’, every day is better than the last. New dreams and
          better scenes, and best of all I don’t pay property tax. Rollin’ down
          to Dallas, who’s providin’ my palace, off to New Orleans or who knows
          where. Places new and friends, too, I’m B.J. McKay and this is my best
          friend Bear. Hong Kong Phooey, number one super guy. Hong Kong Phooey,
          quicker than the human eye. He’s got style, a groovy style, and a car
          that just won’t stop. When the going gets tough, he’s really rough,
          with a Hong Kong Phooey chop (Hi-Ya!). Hong Kong Phooey, number one
          super guy. Hong Kong Phooey, quicker than the human eye. Hong Kong
          Phooey, he’s fan-riffic!{' '}
        </div>
        {/* <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div> */}
      </>
    );
  };
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
