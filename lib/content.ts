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
  /** Source code URL, shown as a separate GitHub button beside the row. */
  repo?: string;
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yashvasin-sana/" },
];

export const site = {
  skipLink: "Skip to content",
};

export const menu = {
  /** Accessible names for the dialog, the toggle and the main links. */
  label: "Site menu",
  open: "Open menu",
  close: "Close menu",
  primaryLabel: "Primary",
  /** Heading above the elsewhere links. */
  asideTitle: "My Links",
};

export const about = {
  eyebrow: "About",
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  paragraphs: [
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
  ],
  /** Accessible name of the arrow at the bottom of the hero. */
  scrollCueLabel: "Scroll to About",
};

/** Shared by Writing posts and Work project pages. */
export const article = {
  backLabel: "Go Back",
  tocLabel: "On this page",
};

export const entryList = {
  /** Accessible name of a row's GitHub icon button. */
  repoLabel: (title: string) => `${title} source code on GitHub`,
};

export const work = {
  eyebrow: "Selected projects",
  title: "Work",
  intro: "A Collection of Notable Projects I've Built.",
  /** Accessible name of the list of projects. */
  listLabel: "Projects",
  /** Label of the GitHub button on a project page. */
  repoLabel: "Source code",
  /** Label of the button linking to a deployed project. */
  siteLabel: "Live site",
  // The projects themselves are the .md files in content/work.
};

export const writing = {
  eyebrow: "Notes and essays",
  title: "Writing",
  intro: "My Spontaneous Blog of Appreciation.",
  /** Accessible name of the list of posts. */
  listLabel: "Posts",
  // The posts themselves are the .md files in content/writing.
};

export const notFound = {
  eyebrow: "404",
  title: "Page not found",
  intro: "That address doesn't match anything on this site.",
  homeLabel: "Go to the home page",
};
