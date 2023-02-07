import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import Cookies from 'universal-cookie';
import { auth, provider } from '../firebase/firebase-config';

const cookies = new Cookies();

export const Auth = (props) => {
	const { setIsAuth } = props;

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			cookies.set('auth-token', result.user.refreshToken);
			setIsAuth(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="auth">
			<p> Sign In With Google To Continue </p>
			<button onClick={signInWithGoogle}> Sign In With Google </button>
		</div>
	);
};

export default Auth;
