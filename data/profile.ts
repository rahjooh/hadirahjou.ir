export const summary = `Senior Data Engineer with over a decade of experience building scalable big data systems, 
modern analytics pipelines, and cloud-native infrastructure. Adept at designing real-time platforms, 
migrating legacy systems, and implementing ML-based data products for fintech and enterprise environments.`;

export const experience = [
    {
        role: 'Senior Data Engineer',
        company: 'Snapp!',
        period: 'Apr 2024 — Present',
        description: `
Led the migration of 50TB of big data infrastructure and 33 Spark legacy pipelines from Hadoop (YARN/HDFS) to Kubernetes and S3.
Architected Spark clusters and data pipelines using custom Helm charts, Spark APIs, and Airflow operators for Kafka sink and flattening workflows.
Managed OKD deployments via CI/CD and Vault with ArgoCD; automated VM provisioning with Ansible.
Performed server maintenance, upgrades, and bare-metal onboarding for OKD clusters.
Maintained AWS infrastructure integrating Kafka, ClickHouse, and related streaming technologies.`
    },
    {
        role: 'Fullstack and Senior Data Engineer',
        company: 'Informatics Services Corporation',
        period: 'Feb 2023 — Apr 2024',
        description: `
Built Python async modules for concurrent processing across 240+ Linux servers handling 200M+ daily transactions.
Achieved 80% faster reporting through multiprocessing and async IO optimization.
Developed and deployed microservices in Django on Heroku to solve messaging, authorization, and monitoring challenges.
Optimized MySQL query performance with complex aggregations, cutting execution time by 60%.
Implemented Django dashboards for real-time database management and monitoring.`
    },
    {
        role: 'Senior Data Engineer',
        company: 'Soshyant Financial Tech Company',
        period: 'Feb 2022 — Jan 2023',
        description: `
Developed fraud detection and portfolio analytics systems on Hadoop using PySpark, integrating rule-based checks and ML (Isolation Forest).
Built Spark ETL jobs for portfolio calculations over billions of records, stored in Hadoop and MSSQL.
Containerized ETL workflows and scheduled on Kubernetes.
Deployed services via Kafka and REST APIs; delivered analytics through Tableau dashboards.
Implemented and maintained a 6-node Spark cluster.`
    },
    {
        role: 'Data Engineer & Senior Developer',
        company: 'Ayandeh Bank',
        period: 'May 2017 — Feb 2022',
        description: `
Designed Customer 360 and Churn Detection dashboards consolidating multi-source data via Hadoop and PostgreSQL for Tableau visualization.
Built segmentation pipelines using RFM modeling and custom KMeans algorithms for customer targeting.
Developed churn prediction models using PySpark logistic regression and frequency-based scoring.
Implemented I/O banking dashboards for executive analytics using Java and Spark.
Served as DBA Assistant managing backups, SQL automation, and reconciliation operations.`
    },
    {
        role: 'Database Engineer & Python Developer',
        company: 'PEDEC (Petroleum Engineering & Development Company)',
        period: 'Apr 2012 — Apr 2017',
        description: `
Led data migration projects unifying multi-format datasets (TXT, FoxPro, Excel, Access, MSSQL, MySQL) into Oracle databases.
Installed and maintained Oracle 10g/11g RAC with Streams and GoldenGate replication for high availability.
Developed Python-based reporting and ticketing applications for database operations.
Performed query optimization, backup automation, and disaster recovery implementations.`
    }
];

export const education = [
    {
        degree: 'Master’s Degree, Decision Science and Knowledge Engineering',
        institution: 'University of Tehran',
        period: '2016 — 2019',
        description:
            'Implemented multiple machine learning algorithms; studied statistical learning, game theory, big data, and linear algebra. Gained hands-on experience with R, Python, and Golang.'
    },
    {
        degree: 'Bachelor’s Degree, Computer Software Engineering',
        institution: 'Islamic Azad University',
        period: '2006 — 2008'
    },
    {
        degree: 'Associate Degree, Computer Software Engineering',
        institution: 'Islamic Azad University',
        period: '2003 — 2005'
    },
    {
        degree: 'Diploma, Computer Engineering',
        institution: 'Pars Afzar',
        period: '2000 — 2002'
    }
];

export const skills = [
    ['Python', 'Go', 'PySpark', 'Terraform','TypeScript', 'SQL'],
    ['Apache Spark', 'Kafka', 'AWS MSK', 'AWS Lambda','ClickHouse', 'Hadoop', 'Airflow'],
    ['Kubernetes', 'AWS S3', 'AWS ECS', 'AWS Cloudwatch', 'AWS Glue', 'Ansible', 'ArgoCD', 'Vault'],
    ['Django', 'MySQL', 'PostgreSQL', 'MSSQL', 'dbt','AWS Athena'],
    ['ETL/ELT Pipelines', 'Streaming Architectures', 'Big Data Processing', 'Machine Learning Integration']
];

export const certifications = [
    'AWS Services for Solutions Architect Associate — Udemy (Nov 2020)',
    'Big Data on Amazon Web Services (AWS) — Udemy (Nov 2020)',
    'Deep Learning: Basics to Advanced — Udemy (Nov 2020)',
    'Data Analytics Real-World Projects using Python — Udemy (Oct 2020)',
    'What is Data Science — Coursera (Oct 2020)',
    'Business Analytics Course 2020 — Udemy (Sep 2020)',
    'Tableau 2020 Training for Data Science & Business Analytics — Udemy (Nov 2019)',
    'Master Complete Statistics for Computer Science — Udemy (Oct 2019)'
];

export const interests = [
    'Designing modern data platforms',
    'Machine learning and analytics engineering',
    'Cloud infrastructure automation',
    'Technical mentorship and leadership',
    'Cycling and outdoor endurance activities'
];

export const stats = [
    { label: 'ETL/ELT pipelines built', value: '100+' },
    { label: 'Legacy systems modernized', value: '10+' },
    { label: 'Data volume managed', value: '50TB+' }
];

export const operatingPrinciples = [
    {
        title: 'Automate for scalability',
        description:
            'Design every workflow and deployment pipeline to scale with minimal manual intervention using IaC and orchestration tools.'
    },
    {
        title: 'Data reliability first',
        description:
            'Ensure reproducibility, lineage tracking, and consistency across data systems to build trust in analytics outputs.'
    },
    {
        title: 'Enable teams through systems',
        description:
            'Empower teams with frameworks, playbooks, and tools that standardize best practices across the organization.'
    }
];
