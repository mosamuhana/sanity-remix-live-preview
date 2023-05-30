import { Link } from '@remix-run/react';

import { type IPostInfo } from '~/sanity/post';
import { formatStringDate } from '~/utils';

type Props = {
	posts: IPostInfo[];
};

export function Posts({ posts }: Props) {
	if (posts?.length <= 0) {
		return <div className="p-4 text-red-500">No posts found</div>;
	}

	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
			{posts.map(post =>
				<PostItem key={post.id} post={post} />
			)}
		</main>
	);
}

export function PostItem({ post }: { post: IPostInfo }) {
	const { id, slug, title, imageUrl } = post;
	const publishedAt = formatStringDate(post.publishedAt);
	return (
		<Link
			key={id}
			to={slug}
			className="p-4 hover:bg-blue-50 flex items-stretch"
		>
			{!imageUrl
				? null
				: (<img src={imageUrl} alt={title} className="mr-4 flex-none" />)
			}
			<div className="flex flex-col justify-between flex-1">
				<h2>{title}</h2>

				{publishedAt && (
					<h3 className="text-xs text-gray-400 self-end">Published At: {publishedAt}</h3>
				)}
			</div>
		</Link>
	);
}
