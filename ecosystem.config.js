module.exports = {
  apps : [{
    name   : "server",
    script: 'npm start'
  }],

  deploy : {
    production : {
      key  : 'deployment.pem',
      user : 'ubuntu',
      host : '52.53.149.163',
      ref  : 'origin/master',
      repo : 'git@github.com:codecallogic/warehouse-api.git',
      path : '/home/ubuntu/server',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install --legacy-peer-deps && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};