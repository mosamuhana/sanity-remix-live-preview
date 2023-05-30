import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Post } from '~/components/Post';
import { getPostDetails, type IPostDetails } from '~/sanity/post';


type LoaderData = { post: IPostDetails };

export const loader = async ({ params, request }: LoaderArgs) => {
  const slug = params.slug!;

	const post = await getPostDetails(slug);

	return { post };
};

export default function Page() {
	const data = useLoaderData() as LoaderData;

	return <Post post={data.post} />;
}
