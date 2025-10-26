export interface FullstackProject {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  repository: string;
  live?: string;
  impact: string;
  period: string;
}

export const fullstackProjects: FullstackProject[] = [
  {
    title: 'KKSH Online Services Platform',
    description:
      'Java Spring Boot platform powering e-commerce and network services storefronts with secure account management and device procurement flows.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    highlights: [
      'Modular service catalog supporting server, storage, and licensing bundles with tiered pricing rules',
      'Integrated payment and order-tracking pipeline tailored to B2B infrastructure buyers',
      'Self-service admin console for catalog curation, content updates, and customer support workflows'
    ],
    impact:
      'Enabled KKSH to market bundled network infrastructure online while maintaining operational oversight of service fulfillment.',
    period: '2022 — 2023',
    repository: 'https://github.com/rahjooh/KKSH',
    live: 'https://kksh.com'
  },
  {
    title: 'Gol Mangoli Florist Commerce API',
    description:
      'Django REST commerce backend for Gol Mangoli, managing seasonal inventory, promotions, and order fulfilment for florals and plants.',
    stack: ['Django REST Framework', 'PostgreSQL', 'Celery', 'Redis'],
    highlights: [
      'Product, collection, and availability modeling optimized for live floral inventory turnover',
      'Automated order confirmations, delivery routing, and SMS notifications with Celery task queues',
      'Role-based dashboard empowering in-store staff to manage promotions and shipments in real time'
    ],
    impact:
      'Modernized Gol Mangoli’s digital storefront, translating in-store expertise into an online-first sales channel.',
    period: '2021 — 2022',
    repository: 'https://github.com/rahjooh/golmangoli',
    live: 'https://golmangoli.com'
  },
  {
    title: 'Sphynx Electrical Marketplace',
    description:
      'Next.js storefront backed by PostgreSQL providing catalog search, specification comparisons, and financing support for electrical equipment.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    highlights: [
      'Server-side rendered product listings with real-time filtering on specifications and availability',
      'Secure customer accounts with saved projects and BOM export for procurement teams',
      'Operational analytics dashboards surfacing sales velocity and margin insights for administrators'
    ],
    impact:
      'Delivered a responsive, content-rich buying experience that helped Sphynx attract enterprise electrical contractors online.',
    period: '2020 — 2021',
    repository: 'https://github.com/rahjooh/tool',
    live: 'https://sphynx.ir'
  },
  {
    title: 'BoofShop Pet Supply Suite',
    description:
      'Next.js experience backed by a Go Gin API enabling omnichannel merchandising, subscriptions, and order fulfillment for pet accessories.',
    stack: ['Next.js', 'Go', 'Gin', 'PostgreSQL', 'Stripe'],
    highlights: [
      'Composable product detail pages with rich media, recommendations, and dynamic pricing widgets',
      'Go Gin microservices covering catalog, cart, checkout, and fulfillment integrations',
      'Subscription and loyalty modules driving repeat purchases with automated renewal reminders'
    ],
    impact:
      'Scaled BoofShop’s direct-to-consumer presence with a performant headless commerce stack tuned for repeat buyers.',
    period: '2019 — 2020',
    repository: 'https://github.com/rahjooh/boofweb',
    live: 'https://boofshop.com'
  },
  {
    title: 'AIpost Social Scheduling Platform',
    description:
      'Golang and Next.js platform orchestrating AI-assisted content creation, scheduling, and publishing across social networks.',
    stack: ['Go', 'Next.js', 'PostgreSQL', 'OpenAI APIs'],
    highlights: [
      'Unified calendar and queueing system syncing posts to Instagram, LinkedIn, and X with timezone-aware scheduling',
      'Multi-model LLM prompt workflows generating captions, hashtags, and image suggestions per channel',
      'Collaboration features including brand workspaces, approval flows, and analytics on engagement lift'
    ],
    impact:
      'Helps marketing teams ship consistent, on-brand social content while leveraging AI to reduce campaign planning time.',
    period: '2023 — Present',
    repository: 'https://github.com/rahjooh/aipost',
    live: 'https://aipost.ai'
  },
  {
    title: 'HadiRahjou.ir Personal Site',
    description:
      'This Next.js-powered personal site showcasing data engineering and fullstack work with MDX-driven content.',
    stack: ['Next.js', 'TypeScript', 'MDX', 'Tailwind CSS'],
    highlights: [
      'App Router architecture with reusable content sections and dynamic metadata',
      'MDX blog pipeline backed by remark/rehype for rich longform publishing',
      'Responsive design system with dark mode and accessible navigation patterns'
    ],
    impact:
      'Serves as a living portfolio demonstrating engineering capabilities and thought leadership.',
    period: '2024',
    repository: 'https://github.com/rahjooh/hadirahjou.ir',
    live: 'https://hadirahjou.ir'
  }
];
