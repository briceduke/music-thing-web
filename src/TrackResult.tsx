import React, { ReactElement } from 'react';

import { Track } from './Dashboard';

export default function TrackResult({
	albumUri,
	artist,
	title,
	uri,
	explicit,
}: Track): ReactElement {
	return (
		<div className="card card-side shadow-2xl mb-4 h-20 text-left">
			<figure className="h-20 w-20">
				<img src={albumUri} className="h-20 w-20" />
			</figure>
			<div className="p-4 flex justify-between w-full items-center">
				<div className="">
					<span>
						<h2 className="text-lg font-bold">
							{title} {explicit && <p className="badge badge-accent">E</p>}
						</h2>
					</span>
					<p className="text-secondary">{artist}</p>
				</div>
				<div className="btn btn-circle btn-primary">▶️</div>
			</div>
		</div>
	);
}
