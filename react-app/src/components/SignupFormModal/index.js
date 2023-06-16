import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				history.push('/profiles/current')
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	console.log('signup errors: ', errors['undefined'])

	return (
		<div  id="signUpModal2">
			<div id="signUpModal">
				<h1 id="signupText">Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label >
						<h4 className="labelTag">email:</h4>
						</label>
						<input
							className="inSignup"
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							/>
					<label>
						<h4 className="labelTag">username:</h4>
						<input
							className="inSignup"
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							/>
					</label>
					<label>
						<h4 className="labelTag">password:</h4>
						<input
							className="inSignup"
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={6}
							maxLength={15}
							/>
					</label>
					<label>
						<h4 className="labelTag"> confirm password:</h4>
						<input
							className="inSignup"
							placeholder="confirm password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							minLength={6}
							maxLength={15}
							/>
					</label>
					<div id="subBox">
						<button id="signUpBtn" type="submit">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignupFormModal;
