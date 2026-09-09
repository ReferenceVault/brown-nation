module.exports = {
  apps: [
    {
      name: 'brownnation-frontend',
      script: 'node_modules/.bin/next',
      args: 'start -p 3001',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '400M',
    },
  ],
};
