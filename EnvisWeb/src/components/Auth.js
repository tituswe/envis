import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config.js';

export const Auth = () => {
	const signInWithGoogle = async () => {
		await signInWithPopup(auth, provider);
	};

	return (
		<div className="auth">
			<p> Sign In With Google To Continue </p>
			<button onClick={signInWithGoogle}> Sign In With Google </button>
		</div>
	);
};
