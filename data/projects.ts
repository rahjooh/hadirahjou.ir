export interface Project {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  repository: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: 'PulseLake — Modern Analytics Platform',
    description:
      'Composable lakehouse platform orchestrated with Dagster and Terraform, powering 60+ KPI dashboards with minute-level SLAs.',
    stack: ['Dagster', 'DuckDB', 'dbt', 'Terraform', 'BigQuery'],
    highlights: [
      'Modular asset-based orchestration with environment-aware deployments',
      'Data quality guardrails automated with Great Expectations and CI gates',
      'Semantic layer powering Looker and Hex workspaces from a single source of truth'
    ],
    repository: 'https://github.com/hadirahjou/pulselake'
  },
  {
    title: 'AtlasOps — Incident Intelligence Hub',
    description:
      'Operational analytics tool chaining streaming ingestion with a ML triage service to forecast incident response capacity.',
    stack: ['Kafka', 'Spark Structured Streaming', 'Databricks', 'scikit-learn'],
    highlights: [
      'Feature store designed for both batch and streaming workloads',
      'Experiment tracking and deployment via MLflow pipelines',
      'Integrated root-cause explorer built with Next.js and server actions'
    ],
    repository: 'https://github.com/hadirahjou/atlasops',
    live: 'https://atlasops.hadirahjou.ir'
  },
  {
    title: 'DataOps Starter Kits',
    description:
      'Collection of production-ready templates for CI/CD, governance, and observability tailored to analytics teams scaling quickly.',
    stack: ['GitHub Actions', 'Great Expectations', 'Prefect', 'Metabase'],
    highlights: [
      'Opinionated blueprints for branching strategies and artifact promotion',
      'Reusable Terraform modules for monitoring stacks',
      'Interactive documentation with Storybook and mdx support'
    ],
    repository: 'https://github.com/hadirahjou/dataops-starter-kits'
  }
];
