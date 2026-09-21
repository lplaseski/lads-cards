// Set when a card is opened from the gallery during this page session, so the
// card page can go back through history (keeping filters and scroll position)
// instead of loading a fresh gallery. Resets on a full page load.
let cameFromGallery = false;

export const markCameFromGallery = () => {
  cameFromGallery = true;
};

export const hasGalleryHistory = () => cameFromGallery;
