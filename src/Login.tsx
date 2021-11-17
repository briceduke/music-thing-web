import React, { ReactElement } from 'react';

const AUTH_URL =
	'https://accounts.spotify.com/authorize?client_id=2b81312af72a47ea8baa3982536aff97&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Login(): ReactElement {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="card shadow-2xl w-1/4 h-1/3 p-10 flex justify-evenly">
				<div>
					<header className="card-title text-5xl">
						Music<span className="text-primary">Thing</span>
					</header>
					<h2 className="text-content">Created with ❤️ by Brice Duke</h2>
				</div>
				<a href={AUTH_URL} className="w-full btn btn-primary">
					Login with Spotify
				</a>
			</div>
		</div>
	);
}
