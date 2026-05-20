export const defaultHeroImage = 'https://ui-avatars.com/api/?name=Usman+Akhtar&background=111827&color=F8D878&size=512&bold=true&length=2&font-size=0.33&rounded=true';

export const defaultProfileImage = 'https://ui-avatars.com/api/?name=Usman+Akhtar&background=111827&color=F8D878&size=800&bold=true&length=2&font-size=0.28';

export const applyImageFallback = (event, fallbackUrl) => {
  if (event.currentTarget.src !== fallbackUrl) {
    event.currentTarget.src = fallbackUrl;
  }
};
