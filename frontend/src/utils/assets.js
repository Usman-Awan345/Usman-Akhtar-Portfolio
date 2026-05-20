export const getApiBaseUrl = () => {
  return (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
};

export const resolveAssetUrl = (url) => {
  if (!url || typeof url !== 'string') return '';

  const normalizedUrl = url.trim().replace(/\\/g, '/');
  if (!normalizedUrl) return '';
  if (/^(https?:|data:|blob:)/i.test(normalizedUrl)) return normalizedUrl;

  const apiBaseUrl = getApiBaseUrl();
  const absolutePath = normalizedUrl.startsWith('/') ? normalizedUrl : `/${normalizedUrl}`;
  if (!apiBaseUrl) return absolutePath;

  return `${apiBaseUrl}${absolutePath}`;
};

export const resolveApiUrl = (path) => {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return path;

  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
