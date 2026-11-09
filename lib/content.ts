/**
 * All site copy lives here. Edit this file to change what the site says;
 * the components only decide how it looks.
 */

export type NavItem = { label: string; href: string };

export type Entry = {
  title: string;
  summary: string;
  /** Short text on the right of the row, e.g. a date range. */
  meta: string;
  /** Add a URL to turn the row into a link. Rows with "#" are placeholders. */
  href?: string;
};

export const profile = {
  name: "Yashvasin Sana",
  tagline: ["Computer science student at Virginia Tech", "VP of BITS"],
  image: {
    // Replace with your own photo: drop a square image in /public/images
    // (e.g. profile.jpg) and update the path here.
    src: "/images/olivers.jpg",
    alt: "Profile Picture",
  },
};

export const siteDescription =
  "Personal portfolio of Yashvasin Sana, a computer science student building software. With an interest in High Performance and Quantum Computing.";

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
];

// Placeholder URLs: swap in your real profiles.
export const elsewhere: NavItem[] = [
  { label: "GitHub", href: "https://github.com/Silverscrypt" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
];

export const work = {
  eyebrow: "Selected projects",
  title: "Work",
  intro: "A few things I've designed and built.",
  entries: [
    {
      title: "Project one",
      summary: "One sentence on what it does and who it's for.",
      meta: "2026 to Present",
      href: "#",
    },
    {
      title: "Project two",
      summary: "One sentence on what it does and who it's for.",
      meta: "2025 to 2026",
      href: "#",
    },
    {
      title: "Project three",
      summary: "One sentence on what it does and who it's for.",
      meta: "2025",
      href: "#",
    },
  ] satisfies Entry[],
};

export const writing = {
  eyebrow: "Notes and essays",
  title: "Writing",
  intro: "Notes on what I'm building and learning.",
  backLabel: "Go Back",
  tocLabel: "On this page",
  // The posts themselves are the .md files in content/writing.
};
