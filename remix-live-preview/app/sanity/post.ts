import type { SanityDocument } from '@sanity/client';

import { client } from '~/sanity';
import { getThumbnailImage } from '~/sanity';

export interface IPostInfo {
	id: string;
	slug: string;
	title?: string;
	imageUrl?: string;
	publishedAt?: string;
}

export interface IPostDetails {
	id: string;
	title?: string;
	slug: string;
	author?: { name: string; slug: string; };
	imageUrl?: string;
	publishedAt?: string;
	createdAt?: string;
	updatedAt?: string;
	body?: any;
}

export async function getPostList() {
	const query = `*[_type == "post" && defined(slug.current)]{
    "id": _id,
    title,
    slug,
    mainImage,
		publishedAt
  }`;

	const posts: SanityDocument[] = await client.fetch(query);

	return posts.map(({ id, title, slug, mainImage, publishedAt }) => {
		return {
			id,
			title,
			slug: slug.current,
			imageUrl: getThumbnailImage(mainImage),
			publishedAt,
		} as IPostInfo;
	});
}

export async function getPostDetails(slug: string) {
	const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    title,
    slug,
    author->{name,slug},
    "imageUrl": mainImage.asset->url,
    publishedAt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
    body
	}`;

	const {
		id,
		title,
		slug: _slug,
		author,
		imageUrl,
		publishedAt,
		createdAt,
		updatedAt,
		body,
	} = await client.fetch(query, { slug });

	const details: IPostDetails = {
		id,
		title,
		slug: _slug.current,
		author,
		imageUrl,
		publishedAt,
		createdAt,
		updatedAt,
		body,
	};

	return details;
}

/*
const getPostsDetailedQuery = () => {
	return `*[_type == "post" && defined(slug.current)]{
    _id,
    "id": _id,
    title,
    slug,
    author->{name,slug},
    mainImage,
    "image": mainImage,
    "originalImage": mainImage.asset->url,
    categories[]->{title,description},
    publishedAt,
    "createdAt": _createdAt,
    "updatedAt": _updatedAt,
    body
  }`;
};
*/
