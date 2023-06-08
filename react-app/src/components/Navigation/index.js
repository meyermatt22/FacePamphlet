import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navTotal'>
			<ul className='navbutns'>
				{!sessionUser && (
				<div id='noUser'>
					FacePamphlet
				</div>
				)}
				{sessionUser && (
					<div id='navB2'>

					<div >
						<ProfileButton user={sessionUser} />
					</div>
					<div id='wUser'>
						FacePamphlet
					</div>

				<div>
					<NavLink exact to="/home"><img className="homeB" src="https://i.imgur.com/2iSoM4U.png"></img></NavLink>
				</div>
					</div>
				)}
			</ul>

		</div>
	);
}

export default Navigation;
