import './sidebar.css';
import {
  RssFeed,
  ForumRounded,
  PeopleAltRounded,
  Group,
  EventNoteRounded,
  Home,
} from '@material-ui/icons';
import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Home className='sidebarIcon' />
            <span className='sidebarListItemText'>Main</span>
          </li>
          <li className='sidebarListItem'>
            <ForumRounded className='sidebarIcon' />
            <span className='sidebarListItemText'>Posts</span>
          </li>
          <li className='sidebarListItem'>
            <PeopleAltRounded className='sidebarIcon' />
            <span className='sidebarListItemText'>Members</span>
          </li>
          <li className='sidebarListItem'>
            <Group className='sidebarIcon' />
            <span className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <EventNoteRounded className='sidebarIcon' />
            <span className='sidebarListItemText'>Events</span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
