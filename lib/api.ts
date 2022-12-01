export const fetcher = async (url: RequestInfo | URL, options = {}) => {
  let response;
  if (!options) response = await fetch(url);

  response = await fetch(url, options);

  return await response.json();
};
