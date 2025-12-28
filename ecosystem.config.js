module.exports = {
  apps: [{
    name: 'hadirahjou-ir',
    script: 'server.mjs', // Use custom server
    cwd: process.cwd(),
    instances: 2, // Use multiple instances for better performance
    exec_mode: 'cluster', // Enable cluster mode
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      HOSTNAME: '0.0.0.0'
    },
    max_memory_restart: '500M', // Restart if memory exceeds 500MB
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    // Auto restart on crash
    autorestart: true,
    // Watch for file changes (disabled in production)
    watch: false,
    // Max restarts within time window
    max_restarts: 10,
    min_uptime: '10s',
  }]
};

