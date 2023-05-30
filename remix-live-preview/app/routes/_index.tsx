import type {
	V2_MetaFunction as MetaFunction,
	LoaderArgs,
	LoaderFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPostList, type IPostInfo } from '~/sanity/post';
import { Posts } from '~/components/Posts';

type LoaderData = { posts: IPostInfo[] };

export const meta: MetaFunction = () => {
	return [
		{ title: 'Sanity + Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
	const posts = await getPostList();
	return { posts };
};

export default function Page() {
	const { posts } = useLoaderData() as LoaderData;

	return (<Posts posts={posts} />);
}
