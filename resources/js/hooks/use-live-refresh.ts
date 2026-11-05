import { usePoll } from '@inertiajs/react';

type PollRequestOptions = NonNullable<Parameters<typeof usePoll>[1]>;

/**
 * Reloads the current Inertia page in the background so newly created data
 * (for example contact messages or published content) appears without a
 * manual refresh. Inertia preserves the component state and scroll position,
 * so forms and filters are not reset while polling.
 */
export function useLiveRefresh(
    interval = 10000,
    requestOptions: PollRequestOptions = {},
) {
    return usePoll(interval, requestOptions, { background: 'throttle' });
}
