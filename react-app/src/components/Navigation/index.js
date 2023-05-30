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
				{/* {sessionUser && (
				<li>
					<NavLink exact to="/profiles">Find Faces</NavLink>
				</li>
				)} */}
				{sessionUser && (
				<div>
					<NavLink exact to="/home"><img className="homeB" src="https://i.imgur.com/2iSoM4U.png"></img></NavLink>
				</div>
				)}
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</ul>

		</div>
	);
}

export default Navigation;
