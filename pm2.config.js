module.exports = {
  apps: [
    {
      node_args: '--require ./tsconfig-paths-bootstrap.js',
      name: 'starter-notification-api',
      script: './dist/main.js',
      exec_mode: 'cluster_mode',
      merge_logs: true,
      instance_var: 'INSTANCE_ID',
      instances: '1',
      autorestart: true,
      watch: false,
      max_memory_restart: '4G',
    },
  ],
};
