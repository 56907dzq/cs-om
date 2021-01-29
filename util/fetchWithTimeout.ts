export async function fetchWithTimeout(
    uri: string,
    options: RequestInit = {},
    timeout: number,
    controller: AbortController,
  ): Promise<Response> {
    /**
     * Lets set up our `AbortController`, and create a request options object that includes the
     * controller's `signal` to pass to `fetch`.
     */
    const { signal = new AbortController().signal, ...allOptions } = options;
    const config = { ...allOptions, signal };
    /**
     * Set a timeout limit for the request using `setTimeout`. If the body of this timeout is
     * reached before the request is completed, it will be cancelled.
     */
    setTimeout(() => {
      controller.abort();
    }, timeout);
    return await fetch(uri, config);
  }