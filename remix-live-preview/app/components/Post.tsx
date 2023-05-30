import { type ReactNode } from 'react';
import { PortableText } from '@portabletext/react';

import { type IPostDetails } from '~/sanity/post';

type Props = {
	post: IPostDetails;
};

export function Post({ post }: Props) {
	const { title, imageUrl, body } = post;

	const list: ReactNode[] = [
		imageUrl && (
			<img
				className="mx-2 my-2 rounded-lg"
				src={imageUrl}
				alt={title}
			/>
		),

		title && <h1 className="mx-0 my-4 text-blue-800">{title}</h1>,

		body && <PortableText value={body} />,
	].filter(Boolean);

	return (
		<main className="container prose prose-lg mx-auto flex flex-col p-4">
			{...list}
		</main>
	);
}
