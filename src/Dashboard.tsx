import React, { ReactElement, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import TrackResult from './TrackResult';
import useAuth from './useAuth';

interface Props {
	code: string;
}

export interface Track {
	artist: string;
	title: string;
	uri: string;
	albumUri: string;
	explicit: boolean;
}

const spotifyApi = new SpotifyWebApi({
	// clientId: '2b81312af72a47ea8baa3982536aff97',
});

export default function Dashboard({ code }: Props): ReactElement {
	const [search, setSearch] = useState<string>();
	const [searchResults, setSearchResults] = useState<Track[]>([]);

	const accessToken = useAuth(code);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!accessToken) return;
		if (!search) return setSearchResults([]);

		let cancel = false;
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks!.items.map((track) => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height! < smallest.height!) return image;
							return smallest;
						}
					);
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUri: smallestAlbumImage.url,
						explicit: track.explicit,
					};
				})
			);
		});

		return () => {
			cancel = true;
			return;
		};
	}, [search, accessToken]);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="p-10 card shadow-2xl w-1/2 h-1/2">
				<div className="card-title">Search Spotify</div>
				<div className="form-control mb-10">
					<input
						type="text"
						placeholder="songs, artists, etc."
						className="bg-base-200 input"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="overflow-y-scroll">
					{searchResults.map((track, idx) => (
						<TrackResult {...track} key={idx} />
					))}
				</div>
			</div>
		</div>
	);
}
