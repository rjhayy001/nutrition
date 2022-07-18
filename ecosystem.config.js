module.exports = {
  apps: [
    {
      name: 'Nutrition',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      port: 9696,
    }
  ]
}
