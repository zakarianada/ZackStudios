export type ClientReview = {
  quote: string;
  client: string;
  context?: string;
  sourceUrl?: string;
};

// Add only client-approved quotes and attribution supplied by Zack.
// The section stays hidden until genuine reviews are available.
export const clientReviews: ClientReview[] = [];
