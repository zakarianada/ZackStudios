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

export const drivePreviewUrl = (driveId: string) => `https://drive.google.com/file/d/${driveId}/preview`;
