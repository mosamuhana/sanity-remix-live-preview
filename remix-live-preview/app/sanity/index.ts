import { type ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';
import { createClient, type SanityClient } from '@sanity/client';
import { definePreview } from '@sanity/preview-kit';

import { projectId, dataset } from '../env';

export const client: SanityClient = createClient({
	projectId,
	dataset,
	//apiVersion: '2023-01-01',
	//apiVersion: 'v2021-10-21',
	apiVersion: '2023-05-03',
	useCdn: true,
});

export const usePreview = definePreview({ projectId, dataset });

export const imageBuilder = imageUrlBuilder({ projectId, dataset });

export const buildImage = (image: SanityImageSource): ImageUrlBuilder => {
	//return imageBuilder?.image(image).auto('format').fit('max')
	return imageBuilder.image(image).format('webp');
};

export const getImage = (image?: SanityImageSource | null): string | undefined => {
	if (!image) return undefined;
	return buildImage(image).quality(80).url();
};

export const getThumbnailImage = (image?: SanityImageSource | null): string | undefined => {
	if (!image) return undefined;
	return buildImage(image)
			//.width(400)
			//.height(400)
			.quality(80)
			.size(64, 64)
			.url();
};
