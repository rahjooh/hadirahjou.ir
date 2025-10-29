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
    slug: 'designing-high-throughput-crypto-market-data-pipeline',
    title: 'Designing a High-Throughput Crypto Market Data Pipeline',
    summary:
      'An end-to-end architecture blueprint for capturing, processing, and storing one-second crypto market data across major exchanges using AWS primitives.',
    date: '2025-02-22',
    tags: ['Data Engineering', 'Streaming', 'AWS'],
    readingTime: '14 min read',
    content: [
      'Designing a high-throughput crypto market data pipeline means balancing latency, durability, and developer velocity while half a dozen exchanges firehose updates at you every second.',
      '## Overview & Requirements',
      'The target capture includes Binance, OKX, Bybit, Kraken, Coinbase, and Kucoin spot and futures markets. Every second we persist order book snapshots and deltas, trade ticks, liquidation notices, funding rates, and open interest, all inside a single AWS region and availability zone.',
      'That translates into hundreds of messages per second and bursts whenever volatility hits. The system must be resilient to spikes, stay sub-second end-to-end, scale horizontally, and offer multiple consumers for real-time analytics alongside durable storage in Amazon S3.',
      '## Data Sources & Collection Approach',
      'WebSocket feeds are the backbone for order book updates and trades because they avoid REST rate limits and deliver push-based latency. Each exchange publishes incremental book updates—side, price, size tuples—that we fold into an in-memory state and emit full snapshots every second for reconstructability.',
      'Liquidation events ride on dedicated futures channels when available; otherwise we detect them heuristically from trade sizes. Funding rates and open interest arrive far less frequently, so scheduled REST polls suffice. The collector handles initial syncs, graceful backoff when rate limits trigger, and exponential retry on dropped sockets.',
      'Volume wise, think 50–100 messages per second at baseline—roughly 0.5–1 MB/sec uncompressed. Compression turns that into tens of gigabytes per day, so the pipeline must stream and batch efficiently to avoid drowning in tiny files.',
      '## Choosing a Collector Language',
      'Python wins on prototyping speed but struggles with the GIL once dozens of websocket loops and JSON serializations run concurrently. Benchmarks routinely show Go delivering an order of magnitude higher throughput for network-heavy workloads.',
      'Go strikes the right balance: lightweight goroutines handle each exchange or even each market feed, channels coordinate backpressure, and the runtime’s garbage collector is mature enough for long-lived services. Rust offers even lower latency and deterministic memory, yet the development tax and smaller exchange SDK ecosystem make it a second-phase optimization rather than a day-one choice.',
      '## Streaming vs. Direct Writes',
      'A monolithic process that writes straight to S3 via in-memory channels is tempting but fragile—one crash and buffered data evaporates. Introducing a durable streaming backbone decouples collection from storage and analytics so each stage can scale and fail independently.',
      'Kafka is the classic pick for sustained high throughput, partitioned topics, and long retention windows. It guarantees ordered, durable logs with replay for reprocessing and supports multiple consumer groups—perfect when you want an S3 ingestor and analytics jobs to read simultaneously.',
      'Redis Streams is a lighter alternative with microsecond latency and simpler operations, especially if you only need a short-lived buffer before S3. The trade-off is memory-bound retention and more careful persistence tuning. RabbitMQ shines for task routing but becomes a bottleneck for continuous firehose ingestion, so it falls out of contention here.',
      '## AWS-Managed or Self-Hosted?',
      'Self-hosting Kafka or Redis on EC2 grants maximum control and can be cost-effective with the right expertise. You choose instance types, tune partitions, and manage scaling events. The flip side is ongoing operational toil: upgrades, broker failures, partition rebalancing, and metric hygiene land on your plate.',
      'AWS offers managed analogues that remove that burden. Kinesis Data Streams paired with Kinesis Data Firehose gives you turnkey ingestion with automatic retries, encryption, and S3 delivery. Amazon MSK manages Kafka brokers for you while preserving the Kafka APIs. ElastiCache handles Redis failover and patching. The architectural skeleton stays the same; the question is whether you prefer opex dollars or pager duty.',
      '## Landing Data in S3',
      'Regardless of the streaming fabric, S3 remains the system of record. Use a deterministic prefix such as s3://<bucket>/crypto_data/<exchange>/<data_type>/year=YYYY/month=MM/day=DD/hour=HH/ to make partition pruning trivial for Athena or Spark.',
      'Buffer data into gzip-compressed JSON or Parquet chunks sized in megabytes rather than kilobytes. Firehose can handle this buffering automatically with 1 MB or 60 second flush thresholds; a custom ingestor can do the same by batching records per exchange per minute.',
      'Store both the one-second snapshots and the intervening deltas so downstream consumers can choose between reconstructing the full book or sampling the snapshots alone. Metadata jobs (Glue crawlers or dbt models) can register schemas and keep the data lake query-friendly.',
      '## Real-Time Consumers',
      'With a streaming backbone in place you can spin up multiple consumers without touching the collectors. A Kafka Streams or Flink job can compute rolling liquidity metrics, detect anomalous spreads, or fan out alerts to SNS. A lightweight Go or Python worker might maintain the latest top-of-book cache in Redis for API clients.',
      'Keep each consumer stateless where possible and checkpoint offsets in the broker so they can replay after a restart. Latency budgets stay sub-second when consumers process batches measured in milliseconds rather than minutes.',
      '## Cost Modeling (ap-south-1, Single AZ)',
      'Assume roughly 815 KB/sec of compressed JSON—about 67 GB/day or 2 TB/month. Two m7g.large instances comfortably run the collectors. Kinesis plus Firehose lands near $250–$300 per month at this volume, while self-hosted Redis Streams on EC2 sits around $300 with careful trimming. A three-broker Kafka cluster, whether self-managed or via MSK, pushes the monthly total into the $450–$520 range once you account for broker instances and a terabyte of gp3 storage.',
      'S3 Standard in ap-south-1 adds roughly $50/month for fresh data, and request charges stay in the single dollars if you batch writes. Savings Plans or reserved capacity can shave 20–40% off the compute-heavy options.',
      '## Recommendation',
      'For most teams, Go collectors feeding Kinesis Data Streams with Firehose delivery to S3 strike the best balance of low operational overhead, predictable cost, and managed durability. You still get sub-second fan-out to Lambda or Flink for real-time analytics, and S3 stays tidy thanks to Firehose batching and compression.',
      'If you need Kafka semantics—longer retention, sophisticated replay, rich ecosystem—MSK is the quickest path without standing up brokers yourself. And if absolute minimal cost plus ultra-low latency trump durability, a carefully persisted Redis Streams deployment can work, provided you trim aggressively once objects land in S3.',
      'The throughline across all variants is the same: capture data reliably with Go, stream it through a resilient backbone, batch it smartly into S3, and let independent consumers extract insight in real time. With that foundation, scaling to more markets or heavier analytics becomes an exercise in turning dials rather than rewriting the pipeline.'
    ]
  },
  {
    slug: 'self-managed-iceberg-vs-aws-s3-tables',
    title: 'Comparison of Self-Managed Iceberg on S3 vs. AWS S3 Tables for High-Resolution Crypto Data',
    summary:
      'A practitioner’s look at the trade-offs between building your own Apache Iceberg tables on Amazon S3 and adopting the fully managed Amazon S3 Tables service for millisecond-scale crypto feeds.',
    date: '2025-02-21',
    tags: ['Data Engineering', 'AWS', 'Apache Iceberg'],
    readingTime: '12 min read',
    content: [
      'Collecting sub-second crypto market data pushes storage and metadata systems to their limits, so the first decision you make is whether to self-manage Apache Iceberg on a vanilla S3 bucket or lean into the new managed S3 Tables service. Both options promise schema evolution, ACID guarantees, and time travel, but the day-two experience could not be more different.',
      'In a self-managed setup, you orchestrate a Go-based collector that writes Parquet files into standard S3 and keeps the Iceberg metadata in sync. Because Go still lacks a production-grade Iceberg library, you either stitch together bindings to PyIceberg or Spark or implement the snapshot commit protocol yourself. The prize is total control: you choose partitioning, snapshot cadence, and catalog strategy—Glue Data Catalog remains optional and free for small tables. Storage pricing also stays at the familiar $0.023 per GB, which keeps the monthly bill for ~1.2 TB of data in the high twenties.',
      'That control comes with a heavy operational tax. You are accountable for every manifest list, atomic metadata swap, and small-file compaction run. Without aggressive automation the table corrodes: queries slow down, snapshots bloat, and concurrency bugs creep in. Ensuring one-second time travel means carefully sequencing snapshot creation and retention policies, all while juggling eventual consistency semantics on S3. None of the performance optimizations arrive for free—you pay in engineering hours or extra Spark and Trino jobs.',
      'Amazon S3 Tables removes almost all of that undifferentiated heavy lifting. You create a table bucket, point your Iceberg-compatible writers at its catalog endpoint, and AWS handles commits, snapshots, and manifest cleanup. Continuous maintenance jobs compact small files into 64–512 MB targets, retire stale snapshots per policy, and delete orphaned data. AWS reports up to 3× faster queries and 10× the transaction throughput versus self-managed Iceberg, gains that matter when you are capturing every order book twitch.',
      'The managed path integrates neatly with the broader analytics stack. Enable the Glue Data Catalog preview and Athena, EMR, Trino, or Redshift see the table instantly. IAM now operates at the table ARN level, so granting a data scientist read access to only the futures namespace is one policy edit away. New ingestion tooling might be required—today that means Spark, the AWS CLI, or services like Kinesis Data Firehose—but once data lands, every engine inherits Iceberg’s time-travel semantics out of the box.',
      'You do pay a premium for that serenity. Storage in an S3 Table bucket runs roughly 15% higher at $0.0265 per GB. On top of that sit object monitoring fees of $0.025 per 1,000 objects and compaction charges of $0.002 per 1,000 objects plus $0.005 per GB rewritten. For a month of 40 GB daily ingest, expect total fees in the low forties—still a modest figure when compared to the cost of rolling and running your own maintenance pipelines.',
      'Head-to-head, the decision comes down to priorities. If avoiding vendor lock-in and preserving bespoke control over metadata is paramount, self-managed Iceberg delivers with a lower raw storage price tag, at the cost of ongoing toil. If you value predictable performance, automated optimization, and faster time to production, S3 Tables earns its keep by eliminating the maintenance backlog and providing a managed, analytics-optimized surface over standard Iceberg tables.',
      'For most teams racing to extract features from high-resolution crypto data, the managed service wins on velocity and reliability. The slight monthly premium buys automatic compaction, trustworthy snapshots, and a seamless bridge into the rest of the AWS analytics ecosystem. The DIY route remains viable—but only if you are ready to become an Iceberg maintainer as well as a market data engineer.'
    ]
  },
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
