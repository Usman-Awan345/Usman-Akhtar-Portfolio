import { resolveAssetUrl } from './assets';

export const projectPlaceholder = 'https://via.placeholder.com/800x500/111827/60A5FA?text=Project+Image';
export const projectThumbPlaceholder = 'https://via.placeholder.com/256/111827/60A5FA?text=Project';

export const getProjectScreenshotUrl = (project, width = 800) => {
  if (!project?.liveLink) return '';

  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.liveLink)}?w=${width}`;
};

export const getProjectImageUrl = (project, fallbackWidth = 800) => {
  return resolveAssetUrl(project?.image) || getProjectScreenshotUrl(project, fallbackWidth) || projectPlaceholder;
};

export const handleProjectImageError = (event, project, finalFallback = projectPlaceholder, width = 800) => {
  const screenshotUrl = getProjectScreenshotUrl(project, width);
  const currentSrc = event.currentTarget.src;

  if (screenshotUrl && currentSrc !== screenshotUrl) {
    event.currentTarget.src = screenshotUrl;
    return;
  }

  if (currentSrc !== finalFallback) {
    event.currentTarget.src = finalFallback;
  }
};
