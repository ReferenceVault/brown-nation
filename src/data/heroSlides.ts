export type HeroSlide = {
  id: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  palette: {
    from: string;
    to: string;
  };
};

const U = "https://images.unsplash.com/photo-";

export const heroSlides: HeroSlide[] = [
  {
    id: "moment-of-joy",
    eyebrow: "Handcrafted. Heartfelt. Unforgettable.",
    headingLine1: "Every Bite,",
    headingLine2: "A Moment of Joy",
    description:
      "Indulge in handcrafted chocolates made with premium ingredients and endless passion.",
    primaryCta: "Shop Now",
    secondaryCta: "Explore Flavors",
    image: `${U}1526081715791-7c538f86060e`,
    palette: { from: "#f8ece5", to: "#eddcd0" },
  },
  {
    id: "made-with-love",
    eyebrow: "Small Batches. Big Flavor.",
    headingLine1: "Crafted by Hand,",
    headingLine2: "Loved by Heart",
    description:
      "Every bar is tempered, poured, and wrapped by artisans who treat chocolate as a craft.",
    primaryCta: "Shop Now",
    secondaryCta: "Explore Flavors",
    image: `${U}1666724427690-874b5f9ba2b2`,
    palette: { from: "#f5e6dd", to: "#e9d3c4" },
  },
  {
    id: "gift-of-joy",
    eyebrow: "Perfect For Every Occasion",
    headingLine1: "Gifting Made",
    headingLine2: "Deliciously Personal",
    description:
      "Custom boxes, printed bars, and corporate hampers designed around your celebration.",
    primaryCta: "Shop Now",
    secondaryCta: "Explore Flavors",
    image: `${U}1687471603664-c76ac6556b6f`,
    palette: { from: "#f7e8df", to: "#ecd6c8" },
  },
];
