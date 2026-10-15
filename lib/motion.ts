export type MotionProject = {
  id: string;
  title: string;
  type: string;
  duration: string;
  driveId: string;
  thumbnail: string;
};

export const motionProjects: MotionProject[] = [
  { id: "showreel-3", title: "Showreel 03", type: "Featured reel", duration: "01:10", driveId: "1dyLp1CKpexR4OrQiQAIlBqQwprBOsi4Y", thumbnail: "/media/thumbnails/showreel-03.jpg" },
  { id: "showreel-2", title: "Showreel 02", type: "Dynamic edit", duration: "01:15", driveId: "1lNGhepEKGRQUSmc8MoM4bfB17VP3QnzA", thumbnail: "/media/thumbnails/showreel-02.jpg" },
  { id: "showreel-1", title: "Showreel 01", type: "Cinematic edit", duration: "01:02", driveId: "1k0NQQQzJDPhGh7gqOXVBDubOP9xsgXui", thumbnail: "/media/thumbnails/showreel-01.jpg" },
  { id: "dj-lifestyle", title: "DJ / Lifestyle", type: "Event edit", duration: "00:45", driveId: "1IJ8wpQ7k_LsPTTWjMMn7QIuVjeEk_gAf", thumbnail: "/media/thumbnails/dj-lifestyle.jpg" },
  { id: "summer-anamorphic", title: "Summerbama", type: "Anamorphic adventure", duration: "01:20", driveId: "1MbAK4_UEJ3CYF0SvNdeVLfW4dqFB_CR0", thumbnail: "/media/thumbnails/summer-anamorphic.jpg" },
  { id: "dubai-real-estate", title: "Dubai Real Estate", type: "Property campaign", duration: "00:48", driveId: "15DcfzUAexxvSfdI9a2fnn2tqZ3LGGPsZ", thumbnail: "/media/thumbnails/dubai-real-estate.jpg" },
  { id: "property-film", title: "Property Film", type: "Real estate edit", duration: "00:52", driveId: "1RDd8gUlMMpcnJHJbYjb4xqnSEQkBR-ai", thumbnail: "/media/thumbnails/property-film.jpg" },
  { id: "property-edit", title: "Real Estate Editing", type: "Property showcase", duration: "00:44", driveId: "1eWfW97Y3BgcLOaRac0_eMBj6iAm3uU8p", thumbnail: "/media/thumbnails/property-edit.jpg" },
  { id: "xfyro-earbuds", title: "XFyro ANC", type: "Social product ad", duration: "00:30", driveId: "1SMRmkGSvAIpe_TD35PWnkjYMJjsRpvc8", thumbnail: "/media/thumbnails/xfyro-anc.jpg" },
  { id: "travel", title: "Travel Film", type: "Travel / documentary", duration: "01:05", driveId: "14gG9nFY7wMe9-zM2lIFYpvCcHOHQaYrB", thumbnail: "/media/thumbnails/travel-film.jpg" },
];

export const aiAdProjects: MotionProject[] = [
  {
    "id": "zorxx-own-your-future",
    "title": "ZORXX — Own Your Future",
    "type": "Brand campaign",
    "duration": "01:52",
    "driveId": "1-fGsuxO9yDAl8OC7SE5Zx7O9rIQSqAT4",
    "thumbnail": "/media/thumbnails/ai-ads/zorxx-own-your-future.webp"
  },
  {
    "id": "gentlemens-ritual-high-stakes",
    "title": "Gentlemen’s Ritual — High Stakes",
    "type": "Apparel campaign",
    "duration": "00:32",
    "driveId": "1sZjNWz-gZW1o2TwEdy0Mhn1qzLslcza2",
    "thumbnail": "/media/thumbnails/ai-ads/gentlemens-ritual-high-stakes.webp"
  },
  {
    "id": "gentlemens-ritual-off-the-clock",
    "title": "Gentlemen’s Ritual — Off the Clock",
    "type": "Lifestyle campaign",
    "duration": "00:31",
    "driveId": "13pn5hWSCkY5Y0mN6jjjKMziD-t-26pAi",
    "thumbnail": "/media/thumbnails/ai-ads/gentlemens-ritual-off-the-clock.webp"
  },
  {
    "id": "gentlemens-ritual-american-collection",
    "title": "Gentlemen’s Ritual — The American Collection",
    "type": "Apparel campaign",
    "duration": "00:30",
    "driveId": "1QZetqCW1rOngTuhBVAhV0fz-UXuZev8i",
    "thumbnail": "/media/thumbnails/ai-ads/gentlemens-ritual-american-collection.webp"
  },
  {
    "id": "tree-care-local-service",
    "title": "Tree Care — A Safer Tomorrow",
    "type": "Local service ad",
    "duration": "00:46",
    "driveId": "1lpPHhCQsSd1OPcpbagOyPWhr83SwWAO1",
    "thumbnail": "/media/thumbnails/ai-ads/tree-care-local-service.webp"
  },
  {
    "id": "construction-solid-ground",
    "title": "Construction — Built on Solid Ground",
    "type": "Local service ad",
    "duration": "00:44",
    "driveId": "1zbVuasN4Tcpdjrkev03T_psNyGOOQrRx",
    "thumbnail": "/media/thumbnails/ai-ads/construction-solid-ground.webp"
  },
  {
    "id": "insurance-claim-support",
    "title": "Insurance — Claim with Confidence",
    "type": "Insurance campaign",
    "duration": "00:24",
    "driveId": "14DdwONkdT3xO4F62f2WcEpEtXv1qo1DP",
    "thumbnail": "/media/thumbnails/ai-ads/insurance-claim-support.webp"
  },
  {
    "id": "trading-mindset",
    "title": "Trading Mindset",
    "type": "AI spokesperson",
    "duration": "00:56",
    "driveId": "1O4McqMvP-5Q89fdLPvUewbHdp4Ua-TM6",
    "thumbnail": "/media/thumbnails/ai-ads/trading-mindset.webp"
  },
  {
    "id": "everyday-gratitude",
    "title": "Everyday Gratitude",
    "type": "AI UGC ad",
    "duration": "00:38",
    "driveId": "1FDm4YppGjw8wflsK099VHG5YsILOlYYj",
    "thumbnail": "/media/thumbnails/ai-ads/everyday-gratitude.webp"
  },
  {
    "id": "lip-color-in-motion",
    "title": "Lip Color in Motion",
    "type": "Beauty product ad",
    "duration": "00:12",
    "driveId": "19hgtCSETECOgPrXtF2IiKxxmzYTRsfv6",
    "thumbnail": "/media/thumbnails/ai-ads/lip-color-in-motion.webp"
  },
  {
    "id": "healthy-habits-spokesperson",
    "title": "Healthy Habits",
    "type": "AI spokesperson",
    "duration": "00:49",
    "driveId": "1ZMB5M3CdyKOY3PLMz8vsNG27Mi-qbaup",
    "thumbnail": "/media/thumbnails/ai-ads/healthy-habits-spokesperson.webp"
  },
  {
    "id": "fritos-crunch-you-crave",
    "title": "Fritos — The Crunch You Crave",
    "type": "Food product ad",
    "duration": "00:12",
    "driveId": "1K84LY3seWyDAxVW1wy0ZNwrueKdIgCxV",
    "thumbnail": "/media/thumbnails/ai-ads/fritos-crunch-you-crave.webp"
  },
  {
    "id": "golden-hour-fashion",
    "title": "Golden Hour — Fashion Film",
    "type": "Fashion campaign",
    "duration": "00:12",
    "driveId": "1yFYJTOyZ0BoXidSoiv87E6rOqbux8Z5W",
    "thumbnail": "/media/thumbnails/ai-ads/golden-hour-fashion.webp"
  },
  {
    "id": "jqe-tokyo-after-dark",
    "title": "JQE — Tokyo After Dark",
    "type": "Automotive campaign",
    "duration": "00:16",
    "driveId": "1Sh8Wvw-p9dQYjthXzI1lX2uGuQjOECaT",
    "thumbnail": "/media/thumbnails/ai-ads/jqe-tokyo-after-dark.webp"
  },
  {
    "id": "jqe-tokyo-night-drive",
    "title": "JQE — Tokyo Night Drive",
    "type": "Automotive alternate cut",
    "duration": "00:16",
    "driveId": "1pLRcJeeBl99rVaAVDRzMMCnFN5LTxYAy",
    "thumbnail": "/media/thumbnails/ai-ads/jqe-tokyo-night-drive.webp"
  },
  {
    "id": "ai-cinema-worlds-beyond",
    "title": "AI Cinema — Worlds Beyond",
    "type": "Cinematic showcase",
    "duration": "01:11",
    "driveId": "1c9-GEJ6wTrXrcvpnywWIVrAT6eOKohSO",
    "thumbnail": "/media/thumbnails/ai-ads/ai-cinema-worlds-beyond.webp"
  }
];

export const drivePreviewUrl = (driveId: string) => `https://drive.google.com/file/d/${driveId}/preview`;
