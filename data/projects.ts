export interface Project {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  repository: string;
  live?: string;
  impact: string;
  period: string;
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
    impact: 'Reduced analytics lead time by 64% and enabled finance to self-serve KPI refreshes in minutes.',
    period: '2023 — Present',
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
    impact: 'Cut incident triage time by 45% with predictive staffing alerts adopted by SRE leadership.',
    period: '2021 — 2023',
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
    impact: 'Enabled 200+ teams to bootstrap governed analytics environments in under a day.',
    period: '2019 — Present',
    repository: 'https://github.com/hadirahjou/dataops-starter-kits'
  },
  {
    title: 'MSK Serverless Crypto Data Platform',
    description:
      'Infrastructure-as-code stack that provisions an AWS MSK Serverless cluster with IAM-authenticated Kafka endpoints, CloudWatch logging, and guardrailed network access.',
    stack: ['Terraform', 'AWS MSK', 'IAM', 'CloudWatch', 'GitHub Actions'],
    highlights: [
      'Least-privilege IAM roles and security groups for EC2 collectors and downstream consumer teams',
      'Broker log shipping and retention controls wired through Terraform-managed CloudWatch resources',
      'CI/CD guidance with GitHub Actions for validated plans, manual applies, and automated state recovery'
    ],
    impact:
      'Gives crypto market data teams a hardened Kafka backbone for high-frequency order book ingestion without managing brokers.',
    period: '2024',
    repository: 'https://github.com/rahjooh/MSK-serverless'
  },
  {
    title: 'CryptoFlow — High-Frequency Order Book Pipeline',
    description:
      'Go-based service that continuously captures Binance futures order book depth and archives flattened snapshots as Parquet files in S3 for downstream research.',
    stack: ['Go', 'AWS S3', 'Parquet', 'Docker', 'Zerolog'],
    highlights: [
      'Reader, flattener, and S3 writer stages coordinated with back-pressure aware channels and tunable batch sizes',
      'Partitioned Parquet layouts (exchange/market/symbol/time) with configurable flush intervals to balance fidelity and cost',
      'Host-networked Docker deployment and IP shard mapping enabling multi-address traffic distribution across exchange endpoints'
    ],
    impact:
      'Delivers production-ready order book archives that feed quant analytics pipelines without losing depth or consistency during high-volatility bursts.',
    period: '2024',
    repository: 'https://github.com/rahjooh/CryptoTrade'
  }
];
