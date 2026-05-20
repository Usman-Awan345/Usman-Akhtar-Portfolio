export const getApiBaseUrl = () => {
  return (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
};

export const resolveAssetUrl = (url) => {
  if (!url) return '';
  if (/^(https?:|data:|blob:)/i.test(url)) return url;

  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return url;

  return `${apiBaseUrl}${url.startsWith('/') ? url : `/${url}`}`;
};

export const resolveApiUrl = (path) => {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return path;

  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
