import type { ActionFunction, LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { getSession, commitSession, destroySession } from '~/sessions';

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({ request }) => {
	if (request.method !== 'POST') {
		return json({ message: 'Method not allowed' }, 405);
	}

	return redirect('/', {
		headers: {
			'Set-Cookie': await destroySession(request),
		},
	});
};

// A `GET` request to this route will enter preview mode
export const loader = async ({ request }: LoaderArgs) => {
	const session = await getSession(request);
	// For a more advanced use case, you could use this
	// to store a read token from sanity.io/manage
	session.set(`preview`, `a-random-string`);

	return redirect(`/`, {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};
