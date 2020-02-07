const getLocationHash = () => window.location.hash.replace("#", "");

export const getObjectUrlString = urlString => {
  const search = getLocationHash(urlString);
  const objectUrl =
    search === ""
      ? {}
      : search.split("&").reduce((prev, curr) => {
          const [key, value] = curr.split("=");
          prev[decodeURIComponent(key)] = decodeURIComponent(value);
          return prev;
        }, {});
  return objectUrl;
};
