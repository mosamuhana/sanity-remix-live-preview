import isbot from 'isbot';
import { PassThrough } from 'node:stream';
import { type EntryContext, Response } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream } from 'react-dom/server';

const ABORT_DELAY = 5_000;

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	const callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';

	return new Promise((resolve, reject) => {
		const { pipe, abort } = renderToPipeableStream(
			<RemixServer
				context={remixContext}
				url={request.url}
				abortDelay={ABORT_DELAY}
			/>,
			{
				[callbackName]() {
					const body = new PassThrough();

					responseHeaders.set('Content-Type', 'text/html');

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					);

					pipe(body);
				},
				onShellError(error: unknown) {
					reject(error);
				},
				onError(error: unknown) {
					responseStatusCode = 500;
					console.error(error);
				},
			},
		);

		setTimeout(abort, ABORT_DELAY);
	});
}
