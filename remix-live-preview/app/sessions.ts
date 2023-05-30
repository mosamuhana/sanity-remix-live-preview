import {
	type SessionStorage,
	type Session,
	createCookieSessionStorage,
} from '@remix-run/node';

import { ENCRYPTION_KEY, IS_PROD } from './env';

const PREVIEW_KEY = "preview";
//const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const sessionStorage: SessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__session',
		sameSite: 'lax',
		secrets: [ENCRYPTION_KEY],
		secure: IS_PROD,
	},
});

export async function getSession(requestOrCookieHeader?: Request | string | null ): Promise<Session> {
	let cookie: string | null = null;
	if (requestOrCookieHeader) {
		if (requestOrCookieHeader instanceof Request) {
			cookie = requestOrCookieHeader.headers.get('Cookie');
		} else {
			cookie = requestOrCookieHeader;
		}
	}
	return await sessionStorage.getSession(cookie);
}

export async function commitSession(requestOrSession: Request | Session): Promise<string> {
	const session = await _getSessionFrom(requestOrSession);
	return await sessionStorage.commitSession(session);
}

export async function destroySession(requestOrSession: Request | Session): Promise<string> {
	const session = await _getSessionFrom(requestOrSession);
	return await sessionStorage.destroySession(session);
}

export async function getPreviewMode(requestOrSession: Request | Session) {
	const session = await _getSessionFrom(requestOrSession);
	return !!session.get(PREVIEW_KEY);
}


async function _getSessionFrom(requestOrSession: Request | Session): Promise<Session> {
	if (requestOrSession instanceof Request) {
		return await getSession(requestOrSession);
	} else {
		return requestOrSession;
	}
}
