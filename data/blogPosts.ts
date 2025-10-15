export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'lakehouse-reliability-patterns',
    title: 'Reliability Patterns for Lakehouse-Scale Pipelines',
    summary:
      'Design principles and tooling approaches that keep lakehouse pipelines dependable even when the volume, velocity, and complexity of data grow overnight.',
    date: '2024-03-17',
    tags: ['Data Engineering', 'Lakehouse', 'Reliability'],
    readingTime: '8 min read',
    content: [
      'The lakehouse unlocks agility, but without deliberate reliability engineering it quickly turns into a swamp. In this post I break down the observability, orchestration, and governance patterns I rely on when the stakes are high.',
      'A resilient lakehouse starts by treating every table as a product. Define SLAs, add freshness and schema tests, and monitor them with alerts that actually reach humans. Pair this with a contract-first mindset to align producers and consumers.',
      'Finally, lean on automation. Declarative orchestration, data diffing in CI, and automated rollback tooling free up time to focus on new value instead of firefighting.'
    ]
  },
  {
    slug: 'semantic-layer-primer',
    title: 'A Pragmatic Primer to the Modern Semantic Layer',
    summary:
      'Disentangling the hype from the real benefits of a unified semantic layer, plus a blueprint to ship one with dbt Metrics, Cube, or Transform.',
    date: '2024-02-02',
    tags: ['Data Engineering', 'Semantic Layer'],
    readingTime: '6 min read',
    content: [
      'Metrics definitions sprawl across dashboards, BI tools, and spreadsheets. A semantic layer corals them into a single version of truth but only when paired with product thinking.',
      'My go-to approach is to start with a thin slice: pick the metrics that matter, ship governed definitions, and expose them through a familiar interface. The combination of dbt, a metrics API, and thoughtful change management can unlock velocity without chaos.',
      'Once live, invest in adoption. Evangelize, build starter dashboards, and make experimentation safe through preview environments.'
    ]
  },
  {
    slug: 'data-platform-roadmapping',
    title: 'Roadmapping a Data Platform with Confidence',
    summary:
      'A framework for sequencing data platform initiatives so they deliver compounding business value without burning out your team.',
    date: '2023-12-11',
    tags: ['Strategy', 'Data Platforms'],
    readingTime: '7 min read',
    content: [
      'A roadmap is less about the gantt chart and more about intent. Start with business questions, map them to enabling capabilities, and then design platform work that delivers measurable improvements.',
      'I share artefacts from discovery workshops, prioritization matrices, and risk registers that keep stakeholders aligned. The result: a north star narrative that defends the platform budget and energizes the team.',
      'The post closes with templates you can adapt for your own planning cycles.'
    ]
  }
];
