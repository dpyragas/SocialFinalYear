import './topbar.css';
import {
  Search,
  Chat,
  Notifications,
  Home,
  HistoryRounded,
} from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../images/bcu_logo.png';
import defaultProfilePicture from '../../images/defaultAvatar.png';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>
            <img src={logo} alt='logo' width='300px' height='65px' />
          </span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input placeholder='Search...' className='searchInput' />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>
            <Home />
          </span>
          <span className='topbarLink'>
            <HistoryRounded />
          </span>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Link to={'/messenger'}>
              <Chat />
            </Link>
            {/* <span className='topbarIconBadge'>2</span> */}
          </div>
          {/* <div className='topbarIconItem'>
            <Notifications />
            <span className='topbarIconBadge'>1</span>
          </div> */}
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || defaultProfilePicture}
            alt=''
            className='topbarImg'
          />
        </Link>
        <ExitToAppIcon />
      </div>
    </div>
  );
}
