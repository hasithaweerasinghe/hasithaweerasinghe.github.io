// Everything the site says about you lives in this file.
// Edit the text here; the components only handle layout.

export const profile = {
  name: { first: 'Hasitha', last: 'Weerasinghe' },
  role: 'Software Engineer',
  tagline:
    'I build fast, thoughtful interfaces for the web, with a soft spot for React, TypeScript and good developer tooling.',
  avatar: 'https://github.com/hasithaweerasinghe.png?size=480',
  // Shows the "Open to opportunities" badge in the hero. Set to false to hide it.
  openToWork: true,
  // Rotating phrases in the hero's terminal line.
  exploring: [
    'end-to-end type safety with tRPC',
    'testing with Playwright',
    'building with AI SDKs',
    'system design',
  ],
  about: [
    "I'm Hasitha, a software engineer who has been building on the web since 2018. I like the space where product meets engineering: turning fuzzy ideas into interfaces that feel fast, obvious and a little delightful.",
    'Most of my work lives in the JavaScript and TypeScript ecosystem: React, Next.js and Node. Lately I have been digging into end-to-end type safety, reliable testing and AI-powered apps.',
  ],
  facts: [
    { label: 'Experience', value: '9+ years' },
    { label: 'Based in', value: 'London, UK' },
  ],
};

export const skills = {
  // Scrolling banner under the About section.
  highlights: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'tRPC',
    'Kysely',
    'Zod',
    'Playwright',
    'AWS',
    'Vercel AI SDK',
    'MCP',
  ],
  // Grouped grid in the Skills section.
  groups: [
    {
      title: 'Languages',
      items: ['JavaScript', 'TypeScript', 'SQL', 'Python', 'HTML/CSS'],
    },
    {
      title: 'Frontend',
      items: ['React', 'Next.js', 'TanStack Query', 'Redux', 'RxJS', 'Mantine', 'Material UI', 'D3.js', 'Visx'],
    },
    {
      title: 'Backend & data',
      items: ['Node.js', 'PostgreSQL', 'Relational data modelling', 'REST APIs', 'tRPC', 'Kysely', 'GraphQL', 'Zod', 'NextAuth'],
    },
    {
      title: 'Cloud & delivery',
      items: ['AWS S3', 'AWS SQS', 'Route 53', 'CloudFront', 'CloudWatch', 'Docker', 'GitHub Actions', 'CI/CD', 'Backblaze B2', 'Sentry'],
    },
    {
      title: 'Testing & security',
      items: ['Jest', 'MSW', 'Playwright', 'Cypress', 'Audit logging', 'Access control', 'Semgrep', 'Gitleaks', 'ISO 27001 practices'],
    },
    {
      title: 'AI engineering',
      items: ['OpenAI models', 'Vercel AI SDK', 'Mastra', 'SQL-backed agents', 'MCP servers'],
    },
  ],
};

export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Ballerina.io',
    kind: 'Open source',
    description:
      'Contributed to the official website for the Ballerina programming language, fixing scroll behaviour in the docs side navigation and the main navbar.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Merged PRs', href: 'https://github.com/ballerina-platform/ballerina-dev-website/pulls?q=is%3Apr+author%3Ahasithaweerasinghe' },
      { label: 'Repo', href: 'https://github.com/ballerina-platform/ballerina-dev-website' },
    ],
    featured: true,
  },
  {
    title: 'Better Fuel',
    kind: 'Community',
    description:
      "A community-built take on Sri Lanka's fuel information site during the 2022 fuel crisis. I improved how fuel types are shown on the map's marker cards.",
    tags: ['React', 'Maps', 'Vercel'],
    links: [
      { label: 'Live', href: 'https://better-fuel-gov-lk.vercel.app' },
      { label: 'PR', href: 'https://github.com/tmkasun/better-fuel-gov.lk/pull/1' },
    ],
    featured: true,
  },
  {
    title: 'React Redux Thunk Boilerplate',
    kind: 'Starter kit',
    description: 'A starter that wires React, Redux and redux-thunk together for async data flows.',
    tags: ['React', 'Redux', 'JavaScript'],
    links: [{ label: 'Code', href: 'https://github.com/hasithaweerasinghe/react-redux-thunk-boilerplate' }],
  },
  {
    title: 'React on GitHub Pages',
    kind: 'Template',
    description: 'A React and TypeScript app set up to build and deploy straight to GitHub Pages.',
    tags: ['React', 'TypeScript'],
    links: [{ label: 'Code', href: 'https://github.com/hasithaweerasinghe/react-gh-pages' }],
  },
  {
    title: 'Next.js on GitHub Pages',
    kind: 'Template',
    description: 'A statically exported Next.js site deployed to GitHub Pages.',
    tags: ['Next.js', 'Static export'],
    links: [{ label: 'Code', href: 'https://github.com/hasithaweerasinghe/next-gh-pages' }],
  },
];

export const contributions = [
  {
    date: '2022-06-17',
    repo: 'tmkasun/better-fuel-gov.lk',
    title: 'Marker Card fuel type UI improvements',
    href: 'https://github.com/tmkasun/better-fuel-gov.lk/pull/1',
  },
  {
    date: '2021-06-01',
    repo: 'ballerina-platform/ballerina-dev-website',
    title: 'Navbar scroll fix',
    href: 'https://github.com/ballerina-platform/ballerina-dev-website/pull/2326',
  },
  {
    date: '2021-06-01',
    repo: 'ballerina-platform/ballerina-dev-website',
    title: 'Left navbar scroll',
    href: 'https://github.com/ballerina-platform/ballerina-dev-website/pull/2317',
  },
];

// Add more links (LinkedIn, email, X, ...) and they appear in the
// contact section and the command palette automatically.
export const socials = [
  { label: 'GitHub', handle: '@hasithaweerasinghe', href: 'https://github.com/hasithaweerasinghe' },
];
