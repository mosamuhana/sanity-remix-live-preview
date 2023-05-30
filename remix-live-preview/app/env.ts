import invariant from 'tiny-invariant';

invariant(process.env.ENCRYPTION_KEY, 'ENCRYPTION_KEY environment variable is not set');
invariant(process.env.NODE_ENV, 'NODE_ENV environment variable is not set');
invariant(process.env.SANITY_PROJECTID, 'SANITY_PROJECTID environment variable is not set');
invariant(process.env.SANITY_DATASET, 'SANITY_DATASET environment variable is not set');

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
export const NODE_ENV = process.env.NODE_ENV;

export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

export const projectId = process.env.SANITY_PROJECTID;
export const dataset = process.env.SANITY_DATASET;
