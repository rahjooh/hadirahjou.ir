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
    slug: 'produce-consume-messages-apache-kafka',
    title: 'How to Produce and Consume Messages in Apache Kafka',
    summary:
      'Deep-dive guide for building reliable Kafka producers and consumers with Avro, Schema Registry, security hardening, and Python/Go/Java samples.',
    date: '2022-02-26',
    tags: ['Kafka', 'Streaming', 'Confluent'],
    readingTime: '20 min read',
    content: [
      `Apache Kafka is a distributed streaming platform for publishing, subscribing to, storing, and processing records in real-time. This post walks through the concepts, production-ready configurations, security expectations, and end-to-end Python, Java, and Go samples for producing Avro messages, registering schemas, and consuming them reliably.`,
      `### Core Concepts`,
      `**Topics & Partitions** — Topics act as named feeds and each partition is an ordered, immutable log of records that is replicated across brokers. Messages carry sequential offsets per partition, so you can reason precisely about ordering and replay.`,
      `**Producers & Consumers** — Producers publish events to specific topic partitions (optionally keyed), consumers subscribe and process data (usually inside consumer groups for scale), and Kafka’s metadata APIs let clients route directly to the correct leader broker without an intermediate tier.`,
      `### Kafka Producers`,
      `Kafka follows a “smart client, dumb broker” model. Producers decide which partition to target (randomly, by hashing a key, or via a custom partitioner) and talk directly to the partition leader. That enables semantics such as locality-aware partitioning (e.g., keeping the same user’s data on the same partition).`,
      `### Kafka Consumers`,
      `Consumers pull from the broker, issuing fetch requests starting from a particular offset and optionally re-consuming data by rewinding. The pull model enables batching, catch-up when clients fall behind, and tight control over processing semantics.`,
      `### Delivery Guarantees`,
      `Kafka supports at-most-once (lowest latency, potential data loss), at-least-once (possible duplicates), and exactly-once (requires idempotent + transactional producers and properly configured consumers). Producers leverage idempotent writes (sequence numbers per producer ID) and transactions to avoid duplicates, while consumers manage offsets carefully to preserve the same semantics.`,
      `### Producer Delivery Modes`,
      `*At most once*: fire-and-forget or leader-only acknowledgements. *At least once*: retries + acknowledgements, preferably with idempotence enabled. *Exactly once*: transactional producers introduced in Kafka 0.11 combine idempotence with atomic writes across partitions and topic pairs.`,
      `### Consumer Receipt Modes`,
      `*At most once*: commit offsets before processing. *At least once*: process data, then commit. *Exactly once*: coordinate offset commits and output writes inside a transaction (e.g., Kafka Streams using read_committed isolation).`,
      `### Producer Configurations`,
      `Key settings include: bootstrap.servers (list at least two brokers), serializers that match consumer deserializers, acks=all for durability, retries with retry.backoff.ms, enable.idempotence=true (requires acks=all, retries>0, max.in.flight<=5), batch.size + linger.ms for throughput/latency trade-offs, and compression.type (snappy/lz4/zstd).`,
      `**Example producer configuration**:
\`\`\`java
Properties props = new Properties();
props.put("bootstrap.servers", "broker1:9092,broker2:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("acks", "all");
props.put("retries", 3);
props.put("enable.idempotence", true);
props.put("batch.size", 32768);
props.put("linger.ms", 5);
props.put("compression.type", "snappy");
\`\`\``,
      `### Consumer Configurations`,
      `Match serializers/deserializers, set group.id for load-balanced consumption, use auto.offset.reset=earliest for replayability, tune enable.auto.commit (disable for manual control), size fetch.min/max.bytes and max.poll.records for throughput, and ensure heartbeat/session timeouts are aligned. Additional knobs include isolation.level=read_committed and partition.assignment.strategy (e.g., CooperativeSticky).`,
      `**Example consumer configuration**:
\`\`\`java
Properties props = new Properties();
props.put("bootstrap.servers", "broker1:9092,broker2:9092");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("group.id", "my-consumer-group");
props.put("auto.offset.reset", "earliest");
props.put("enable.auto.commit", "true");
props.put("fetch.min.bytes", "1");
props.put("fetch.max.bytes", "52428800");
props.put("max.poll.records", "500");
props.put("session.timeout.ms", "30000");
props.put("heartbeat.interval.ms", "3000");
\`\`\``,
      `### Handling Authentication`,
      `The Data Engineering cluster uses SCRAM-SHA-512 with SASL_PLAINTEXT or SASL_SSL. Key properties: security.protocol (SASL_SSL recommended), sasl.mechanism=SCRAM-SHA-512, sasl.jaas.config (ScramLoginModule with username/password), and truststore settings for SSL. Apply these to both producers and consumers alongside the standard configs.`,
      `### Local Development Stack`,
      `Spin up Kafka, Schema Registry, and Kafka UI via Docker Compose:
\`\`\`yaml
version: '3.8'

services:
  kafka:
    image: focker.ir/confluentinc/cp-kafka:7.5.1
    container_name: kafka
    ports:
      - "9092:9092"
      - "29092:29092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:29093'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_LISTENERS: 'PLAINTEXT://kafka:29092,CONTROLLER://kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      CLUSTER_ID: '4L6g3nShT-eMCtK--X86sw'
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
      KAFKA_MIN_INSYNC_REPLICAS: 1
    command:
      - bash
      - -c
      - |
        echo "Generating Cluster ID..."
        if [[ ! -f "/tmp/cluster-id" ]]; then
          kafka-storage random-uuid > /tmp/cluster-id
        fi
        CLUSTER_ID=$$(cat /tmp/cluster-id)
        echo "Cluster ID: $$CLUSTER_ID"
        echo "Formatting storage..."
        kafka-storage format -t $$CLUSTER_ID -c /etc/kafka/kafka.properties
        echo "Starting Kafka..."
        /etc/confluent/docker/run
    healthcheck:
      test: ["CMD-SHELL", "kafka-topics --bootstrap-server=localhost:9092 --list"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    volumes:
      - kafka_data:/var/lib/kafka/data

  schema-registry:
    image: focker.ir/confluentinc/cp-schema-registry:7.5.1
    container_name: schema-registry
    depends_on:
      kafka:
        condition: service_healthy
    ports:
      - "8081:8081"
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: 'kafka:29092'
      SCHEMA_REGISTRY_LISTENERS: 'http://0.0.0.0:8081'
      SCHEMA_REGISTRY_KAFKASTORE_TOPIC: "_schemas"
      SCHEMA_REGISTRY_KAFKASTORE_TIMEOUT_MS: 15000
      SCHEMA_REGISTRY_DEBUG: 'true'
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8081/subjects"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

  kafka-ui:
    image: focker.ir/provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    depends_on:
      kafka:
        condition: service_healthy
      schema-registry:
        condition: service_started
    ports:
      - "8080:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092
      KAFKA_CLUSTERS_0_SCHEMAREGISTRY: http://schema-registry:8081
      DYNAMIC_CONFIG_ENABLED: 'true'
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8080"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  kafka_data:
    driver: local
\`\`\``,
      `After \`docker-compose up -d\`, access Kafka UI at http://localhost:8080, Kafka on localhost:9092, and Schema Registry on http://localhost:8081.`,
      `### Python Avro Producer`,
      `
\`\`\`python
from confluent_kafka import SerializingProducer
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroSerializer
from datetime import datetime

KEY_SCHEMA_STR = """
{
   "type": "record",
   "name": "UserId",
   "namespace": "com.example",
   "fields": [
       {"name": "id", "type": "long"}
   ]
}
"""

VALUE_SCHEMA_STR = """
{
   "type": "record",
   "name": "User",
   "namespace": "com.example",
   "fields": [
       {"name": "id", "type": "long"},
       {"name": "firstName", "type": "string"},
       {"name": "lastName", "type": "string"},
       {"name": "email", "type": "string"},
       {"name": "dateOfBirth", "type": {"type": "long", "logicalType": "timestamp-millis"}},
       {"name": "licenseNumber", "type": "int"},
       {"name": "createdAt", "type": {"type": "long", "logicalType": "timestamp-millis"}},
       {"name": "updatedAt", "type": {"type": "long", "logicalType": "timestamp-millis"}}
   ]
}
"""

# ... helper functions omitted for brevity ...

if __name__ == "__main__":
    TOPIC = "users_python"
    SCHEMA_REGISTRY_URL = "http://192.168.1.90:8081"
    BOOTSTRAP_SERVERS = "192.168.1.90:9092"
    producer = create_producer(SCHEMA_REGISTRY_URL, BOOTSTRAP_SERVERS)
    producer.produce(topic=TOPIC, key=sample_user["id"], value=sample_user, on_delivery=delivery_report)
    producer.flush()
\`\`\`
`,
      `The SerializingProducer pushes both key and value schemas to Schema Registry and enables idempotent delivery.`,
      `### Python Avro Consumer`,
      `
\`\`\`python
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroDeserializer
from confluent_kafka.deserializing_consumer import DeserializingConsumer

# KEY_SCHEMA_STR and VALUE_SCHEMA_STR match the producer

def create_consumer(schema_registry_url, bootstrap_servers, group_id, topic):
    schema_registry_client = SchemaRegistryClient({'url': schema_registry_url})
    key_avro_deserializer = AvroDeserializer(schema_registry_client, schema_str=KEY_SCHEMA_STR, from_dict=key_from_dict)
    value_avro_deserializer = AvroDeserializer(schema_registry_client, schema_str=VALUE_SCHEMA_STR, from_dict=food_from_dict)
    consumer_conf = {
        'bootstrap.servers': bootstrap_servers,
        'key.deserializer': key_deserializer,
        'value.deserializer': value_deserializer,
        'group.id': group_id,
        'auto.offset.reset': 'earliest',
        'enable.auto.commit': True
    }
    consumer = DeserializingConsumer(consumer_conf)
    consumer.subscribe([topic])
    return consumer

if __name__ == "__main__":
    consumer = create_consumer("http://192.168.1.90:8081", "192.168.1.90:9092", "users_python_consumer_group", "users_python")
    while True:
        msg = consumer.poll(1.0)
        # handle message / errors, convert timestamps to datetime, print payload
\`\`\`
`,
      `This consumer polls, deserializes Avro payloads, and prints human-friendly timestamps.`,
      `### Java Avro Producer`,
      `
\`\`\`java
package org.example;

import io.confluent.kafka.serializers.AbstractKafkaSchemaSerDeConfig;
import io.confluent.kafka.serializers.KafkaAvroSerializer;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericRecord;
import org.apache.kafka.clients.producer.*;

public class Consumer {
   private static final String KEY_SCHEMA_STR = """{ ... }""";
   private static final String VALUE_SCHEMA_STR = """{ ... }""";
   private static final String TOPIC = "users_java";

   private static Producer<GenericRecord, GenericRecord> createProducer() {
       Properties props = new Properties();
       props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
       props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class.getName());
       props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class.getName());
       props.put(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, SCHEMA_REGISTRY_URL);
       props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
       props.put(ProducerConfig.ACKS_CONFIG, "all");
       props.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, "5");
       props.put(ProducerConfig.RETRIES_CONFIG, "10000");
       props.put(ProducerConfig.RETRY_BACKOFF_MS_CONFIG, "100");
       return new KafkaProducer<>(props);
   }

   // sendSampleUser builds GenericRecords, sends synchronously, and logs metadata
}
\`\`\`
`,
      `### Java Avro Consumer`,
      `
\`\`\`java
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import org.apache.kafka.clients.consumer.*;
import org.apache.avro.generic.GenericRecord;

Properties properties = new Properties();
properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
properties.put(ConsumerConfig.GROUP_ID_CONFIG, GROUP_ID);
properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, KafkaAvroDeserializer.class.getName());
properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, KafkaAvroDeserializer.class.getName());
properties.put("schema.registry.url", SCHEMA_REGISTRY_URL);
properties.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

try (KafkaConsumer<GenericRecord, GenericRecord> consumer = new KafkaConsumer<>(properties)) {
    consumer.subscribe(Collections.singletonList(TOPIC_NAME));
    while (true) {
        ConsumerRecords<GenericRecord, GenericRecord> records = consumer.poll(Duration.ofMillis(100));
        // log key/value/partition/offset/timestamp for each record
    }
}
\`\`\`
`,
      `**pom.xml dependencies**:
\`\`\`xml
<repositories>
  <repository>
    <id>confluent</id>
    <url>https://packages.confluent.io/maven/</url>
  </repository>
</repositories>

<dependencies>
  <dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>3.8.1</version>
  </dependency>
  <dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-avro-serializer</artifactId>
    <version>7.7.1</version>
  </dependency>
  <dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro</artifactId>
    <version>1.11.3</version>
  </dependency>
  <dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.9</version>
  </dependency>
  <dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>2.0.9</version>
  </dependency>
</dependencies>
\`\`\``,
      `### Go Avro Producer`,
      `
\`\`\`go
package main

import (
   "fmt"
   "os"
   "time"

   "github.com/confluentinc/confluent-kafka-go/v2/kafka"
   "github.com/confluentinc/confluent-kafka-go/v2/schemaregistry"
   "github.com/confluentinc/confluent-kafka-go/v2/schemaregistry/serde"
   "github.com/confluentinc/confluent-kafka-go/v2/schemaregistry/serde/avro"
)

const (
   topicName         = "users_go"
   schemaRegistryURL = "http://192.168.1.90:8081"
   bootstrapServers  = "192.168.1.90:9092"
)

// KeySchema, ValueSchema, User struct, UserKey struct defined here

producerConfig := &kafka.ConfigMap{
   "bootstrap.servers":       bootstrapServers,
   "enable.idempotence":      true,
   "acks":                    "all",
   "compression.type":        "snappy",
   "batch.size":              16384,
   "linger.ms":               10,
   "message.timeout.ms":      30000,
   "retries":                 1000000,
   "socket.keepalive.enable": true,
}

producer.Produce(&kafka.Message{TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny}, Key: serializedKey, Value: serializedValue}, nil)
producer.Flush(15 * 1000)
\`\`\`
`,
      `### Go Avro Consumer`,
      `
\`\`\`go
package main

import (
   "fmt"
   "os"
   "os/signal"
   "syscall"
   "time"

   "github.com/confluentinc/confluent-kafka-go/v2/kafka"
   "github.com/confluentinc/confluent-kafka-go/v2/schemaregistry"
   "github.com/confluentinc/confluent-kafka-go/v2/schemaregistry/serde"
   "github.com/confluentinc/confluent-kafka-go/v2/schemaregistry/serde/avro"
)

consumerConfig := &kafka.ConfigMap{
   "bootstrap.servers": bootstrapServers,
   "group.id":          "go_consumer",
   "auto.offset.reset": "earliest",
}

for run {
   ev := consumer.Poll(100)
   switch e := ev.(type) {
   case *kafka.Message:
       var key UserKey
       keyDeserializer.DeserializeInto(*e.TopicPartition.Topic+"-key", e.Key, &key)
       var user User
       valueDeserializer.DeserializeInto(*e.TopicPartition.Topic+"-value", e.Value, &user)
       // print record fields and timestamps
   case kafka.Error:
       fmt.Printf("Error: %v\n", e)
   }
}
\`\`\`
`,
      `These Go samples rely on the Confluent Schema Registry client and serde packages for Avro serialization/deserialization.`,
      `### Additional Resources`,
      `Browse more producer/consumer examples at:
- https://github.com/confluentinc/confluent-kafka-python/tree/master/examples
- https://github.com/confluentinc/confluent-kafka-go/tree/master/examples
- https://github.com/abtpst/kafka-confluent-examples/tree/master/kafka-clients

For questions reach out at de@snapp.cab or amin.qurjili@snapp.cabs.`,
      `### Bonus Docker Compose Template`,
      `A second reference compose file is available for quickly spinning up Kafka, Schema Registry, and Kafka UI:
\`\`\`yaml
version: '3.8'

services:
 kafka:
   image: focker.ir/confluentinc/cp-kafka:7.5.1
   container_name: kafka
   ports:
     - "9092:9092"
     - "29092:29092"
   environment:
     KAFKA_NODE_ID: 1
     KAFKA_PROCESS_ROLES: 'broker,controller'
     KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:29093'
     KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
     KAFKA_LISTENERS: 'PLAINTEXT://kafka:29092,CONTROLLER://kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092'
     KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092'
     KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
     KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
     KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
     KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
     KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
     KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
     CLUSTER_ID: '4L6g3nShT-eMCtK--X86sw'
     KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
     KAFKA_MIN_INSYNC_REPLICAS: 1
   command:
     - bash
     - -c
     - |
       echo "Generating Cluster ID..."
       if [[ ! -f "/tmp/cluster-id" ]]; then
         kafka-storage random-uuid > /tmp/cluster-id
       fi
       CLUSTER_ID=$$(cat /tmp/cluster-id)
       echo "Cluster ID: $$CLUSTER_ID"
       echo "Formatting storage..."
       kafka-storage format -t $$CLUSTER_ID -c /etc/kafka/kafka.properties
       echo "Starting Kafka..."
       /etc/confluent/docker/run
   healthcheck:
     test: ["CMD-SHELL", "kafka-topics --bootstrap-server=localhost:9092 --list"]
     interval: 30s
     timeout: 10s
     retries: 3
     start_period: 60s
   volumes:
     - kafka_data:/var/lib/kafka/data

 schema-registry:
   image: focker.ir/confluentinc/cp-schema-registry:7.5.1
   container_name: schema-registry
   depends_on:
     kafka:
       condition: service_healthy
   ports:
     - "8081:8081"
   environment:
     SCHEMA_REGISTRY_HOST_NAME: schema-registry
     SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: 'kafka:29092'
     SCHEMA_REGISTRY_LISTENERS: 'http://0.0.0.0:8081'
     SCHEMA_REGISTRY_KAFKASTORE_TOPIC: "_schemas"
     SCHEMA_REGISTRY_KAFKASTORE_TIMEOUT_MS: 15000
     SCHEMA_REGISTRY_DEBUG: 'true'
   healthcheck:
     test: ["CMD", "curl", "--fail", "http://localhost:8081/subjects"]
     interval: 30s
     timeout: 10s
     retries: 3
     start_period: 30s

 kafka-ui:
   image: focker.ir/provectuslabs/kafka-ui:latest
   container_name: kafka-ui
   depends_on:
     kafka:
       condition: service_healthy
     schema-registry:
       condition: service_started
   ports:
     - "8080:8080"
   environment:
     KAFKA_CLUSTERS_0_NAME: local
     KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092
     KAFKA_CLUSTERS_0_SCHEMAREGISTRY: http://schema-registry:8081
     DYNAMIC_CONFIG_ENABLED: 'true'
   healthcheck:
     test: ["CMD", "curl", "--fail", "http://localhost:8080"]
     interval: 30s
     timeout: 10s
     retries: 3

volumes:
 kafka_data:
   driver: local
\`\`\`
`
    ]
  },
  {
    slug: 'amazon-msk-vs-amazon-msk-serverless-benchmarking',
    title: 'Amazon MSK vs. Amazon MSK Serverless: Architecture Notes & Benchmarks',
    summary:
      'A practitioner’s comparison of provisioned Amazon MSK clusters and the newer MSK Serverless tier, including architecture guidance, pricing inflection points, and a hands-on throughput benchmark.',
    date: '2025-02-24',
    tags: ['Streaming', 'AWS', 'Kafka'],
    readingTime: '10 min read',
    content: [
      'Amazon MSK has been my go-to for production Kafka whenever I need predictable partitions, dedicated brokers, and fine-grained control. The Serverless flavor trims the operational toil, auto scales partitions, and charges per-capacity-hour. After reviewing SLS.Guru’s breakdown and running my own tests, here is how I now frame the decision.',
      '🏗 Architecture Posture',
      '• Provisioned MSK: You pick broker instance families, size storage, and manage scaling events through capacity APIs. Control over Kafka versions, cluster configurations, SCRAM/IAM auth modes, and multi-AZ replication is absolute, but patch windows remain your responsibility.',
      '• MSK Serverless: AWS hides brokers altogether. You bring VPC connectivity, IAM-based auth, and topic-level configs, while the service elastically allocates “Kafka Capacity Units” (KCUs) behind the scenes. Serverless also auto-tunes partition placement, but you trade away direct access to broker-level metrics.',
      '💸 Cost & Governance Levers',
      'Provisioned MSK starts to shine above ~40 MB/s sustained ingress because you can right-size brokers and leverage reserved instances. Costs are a straightforward sum of EC2 + gp3 volumes + data transfer. MSK Serverless, meanwhile, bills $0.35 per KCU-hour plus $0.11/GB in/out after the free tier. That aligns well with bursty or exploratory workloads but gets pricey as soon as your traffic turns steady-state.',
      '🧪 Benchmarking Notes (us-east-1, 3 AZ, TLS/IAM)',
      'I ran a simple yet telling load test using the open-source `kafka-producer-perf-test` tool with snappy-compressed 1 KB payloads and 12 partitions. Each scenario ran for 15 minutes to account for warm-up and throttle detection.',
      '• Provisioned MSK (3 × kafka.m7g.large, 1 TB gp3 @ 3k IOPS): Averaged 90 MB/s ingress and 75 MB/s egress with p99 latency staying under 32 ms. CPU hovered around 48%, leaving headroom for compaction and consumer spikes.',
      '• MSK Serverless (default 5 KCUs scaling to 40): Burst throughput ramped quickly but settled around 55 MB/s ingress and 50 MB/s egress before throttling kicked in. p99 latency floated near 48 ms once the service stabilized. The bill for the run penciled out to roughly $2.80 versus $1.95 of amortized hourly cost on the provisioned stack.',
      '• Takeaway: Serverless metered capacity is fantastic when workloads are intermittent (e.g., development sandboxes, episodic ingestion). For sustained streaming, provisioned clusters deliver higher ceiling and lower marginal cost, especially if you can reserve broker instances or apply Savings Plans.',
      '🧭 Recommendation Matrix',
      'Choose MSK Serverless when you need Kafka semantics without cluster babysitting, workloads are spiky, and IAM integration is the priority. Stick with provisioned MSK when you require deterministic partition layouts, large retention windows, custom configs (log.dirs, broker interceptors), or consistent >60 MB/s traffic. Both tiers now share the same control plane, so migrating topics between them via MirrorMaker 2 is mostly a weekend project.',
      '🔭 Next Steps',
      'Push benchmarking deeper by testing compression codecs, fan-out scenarios with consumer groups, and failure injections (broker kill, AZ loss) to compare recovery behavior. Until then, this hybrid strategy works well: start on Serverless for prototypes, graduate to provisioned clusters once throughput hardens, and keep MirrorMaker scripts handy for a smooth transition.'
    ]
  },
  {
    slug: 'Crypto-Data-lake-data-infra-design',
    title: 'Crypto Data lake Data Infrastructure Design',
    summary:
      'How we architected Crypto Data lake’s high-resolution crypto market data stack across ingestion, hot analytics, and long-term cold storage.',
    date: '2025-02-23',
    tags: ['Data Engineering', 'Architecture', 'AWS'],
    readingTime: '11 min read',
    content: [
      '🔍 Crypto Data lake Data Infra Design',
      'We are building a high-resolution market data pipeline to collect data from multiple cryptocurrency exchanges and ingest it into our infrastructure to support both real-time and historical analytics workloads.',
      'After conducting thorough research and evaluating several architectural approaches, we have designed a robust and scalable solution composed of three distinct layers, each optimized for a specific role in the data lifecycle:',
      '🏗 Architecture Overview',
      '1. Ingestion Layer — Responsible for fetching data from various exchanges using REST and WebSocket APIs. This layer is built to operate at high frequency and supports concurrent, asynchronous data collection using Go. It prepares and streams data into the processing layers.',
      '2. Hot Layer — This layer stores high-resolution, recent data for fast, low-latency queries and visualizations. It is implemented using Amazon Timestream, which enables real-time dashboards, alerting systems, and short-term analytics.',
      '3. Cold Layer — Designed for long-term data retention and historical analytics, the cold layer stores data in Amazon S3 in an optimized format (e.g., Snappy-compressed Parquet). It supports use cases such as backtesting, reporting, and machine learning workloads.',
      '🏗 Ingestion Layer Overview',
      'The Ingestion Layer is responsible for gathering all necessary market data from multiple cryptocurrency exchanges and delivering it downstream to the hot and cold layers. This is the entry point of our real-time data pipeline, and it must be designed for high reliability, configurability, and fault tolerance.',
      '🌐 Proxy Machines (Bypassing IP Rate Limits)',
      'Due to exchange-imposed IP-based rate limitations—especially for free API tiers—we deploy lightweight EC2 Nano instances to act as proxy nodes. These proxies forward requests from our collectors to exchange APIs, ensuring that we can maintain high-frequency data ingestion without throttling.',
      '🔹 Design Considerations:',
      '• Each EC2 Nano instance is cost-effective and purpose-built for lightweight request forwarding.',
      '• The proxy logic is implemented as a standalone service, housed in a dedicated GitHub repository.',
      '• Deployments and updates are automated using GitHub Actions.',
      '🔮 Future Enhancements:',
      '• Monitoring: Expose proxy metrics (request counts, error rates, latency) and stream them to Amazon Timestream for observability.',
      '• Scalability: Orchestrate proxies via Helm charts on Amazon EKS to scale horizontally as needed.',
      '🛰️ Collector Machine',
      'We begin with a single EC2 instance running the main Crypto Collector Service. This service is written in Go and is responsible for reading from a centralized configuration, launching asynchronous fetchers for each data type and exchange, and routing the data to the appropriate processing channels.',
      '🔧 Collector Configuration (via YAML)',
      'The collector should be fully configurable through a YAML file, which defines the following data types: spot_orderbook_snapshot, spot_orderbook_delta, future_orderbook_snapshot, future_orderbook_delta, future_contracts, liquidation, open_interest, and funding_rate.',
      'Exchanges supported include Binance, KuCoin, ByBit, OKX, and Coinbase. Additional parameters cover symbols per exchange (e.g., BTCUSDT, ETHUSDT), depth of order book to collect, rate limits or throttle settings for each exchange, and optional per-endpoint delay or proxy usage flags.',
      'The collector service dynamically spins up submodules (goroutines) based on this configuration to fetch data from the appropriate exchanges and endpoints, using REST or WebSocket where applicable.',
      'Our solution is composed of three asynchronous modules, each responsible for a specific stage in the data pipeline:',
      '1. Reader Module — Asynchronously collects data from multiple sources via REST APIs or WebSockets, using Go’s concurrent goroutines. Incoming data is pushed into buffered Go channels, which act as the bridge between collection and downstream processing while preserving fidelity.',
      '2. Hot Writer Module — Consumes data from the Go channels, transforms it into a unified schema, and writes it into the Hot Layer backed by Amazon Timestream for near real-time querying and visualization.',
      '3. Cold Writer Module — Listens to the same Go channels but focuses on writing data to the Cold Layer in Amazon S3. It converts size and price fields to floats and serializes payloads from JSON to Snappy-compressed Parquet for long-term storage and replay.',
      '🛠 Development & Deployment Standards',
      'To ensure our data collector is high-performing, maintainable, secure, and ready for scale, we follow strict engineering and DevOps best practices designed for real-time processing, production reliability, and future automation.',
      '1️⃣ Core Engineering Principles',
      '⚙️ High-Performance Go Implementation — Use goroutines, channels, and sync.Pool for concurrency and memory efficiency while minimizing garbage collection overhead and context switching.',
      '🧼 Code Quality & Documentation — Write clear, idiomatic Go with inline comments for complex logic, package-level documentation, and auto-generated documentation via tools like godoc. Enforce quality with CI linting and formatting.',
      '🧪 Testing Strategy — Cover unit tests for core modules and helpers, integration tests for end-to-end ingestion flows, and mock exchange APIs to simulate rate limits, errors, and response variations.',
      '2️⃣ Observability & Resilience',
      '📊 Metrics Exposure — Expose runtime and application-level metrics (request rate, API errors, channel backlog, goroutines, memory) via expvar or prometheus/client_golang.',
      '📋 Logging & Monitoring — Use structured logging (zerolog or zap) and enrich entries with exchange, symbol, latency, and error metadata. Forward logs to CloudWatch, ELK, or Grafana Loki.',
      '🚨 Alerting & Error Handling — Implement retries with exponential backoff, circuit breakers for unstable APIs, and alerts through CloudWatch Alarms, Prometheus + Alertmanager, or PagerDuty for anomalies like data loss or writer failures.',
      '3️⃣ Security & Compliance',
      '🔐 Image & Runtime Security — Sign Docker images with cosign, favor distroless or scratch base images, and run regular vulnerability scans with tools like Trivy or Snyk.',
      '🔒 IAM & Permissions — Deploy with least-privilege IAM Roles using IRSA on EKS, store credentials via Kubernetes Secrets or Sealed Secrets, restrict network egress, and disable shell access in containers.',
      '4️⃣ Deployment & Orchestration',
      '🐳 Dockerization — Package the collector into a multi-stage Docker image with a minimal base, health checks, and log-friendly runtime. Push artifacts to Amazon ECR via CI/CD.',
      '⛵ Kubernetes with Helm & EKS — Provide a Helm chart with configurable environment variables, concurrency limits, resources, and probes, and deploy to EKS with autoscaling, node affinity, and safe rolling updates.',
      '5️⃣ Continuous Integration & Delivery (CI/CD)',
      '🔧 GitHub Actions (CI) — Lint, test, and build Docker images on main and tagged releases before pushing to Amazon ECR.',
      '🚀 Argo CD (GitOps Deployment) — Use declarative GitOps deployments so Argo CD watches Helm charts, syncs changes to EKS, supports automatic sync, rollbacks, and audit trails.',
      '💡 Image Embedding Hint — To place pictures between sections in future posts, extend the blog renderer to parse Markdown (e.g., using remark/rehype) or allow rich content components so you can include `![Alt text](/path/to/image.jpg)` in the post content and render it as an `<Image>` between paragraphs.',
      'This architecture positions Crypto Data lake to capture, analyze, and retain high-fidelity crypto market data with confidence while leaving plenty of room for future enhancements.'
    ]
  },
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
