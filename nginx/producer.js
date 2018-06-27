const
  { createWriteStream } = require('fs'),
  sites = require('../sites.json'),
  { length } = sites;
/*
*   @see
*   https://www.digitalocean.com/community/questions/setting-up-multiple-nodejs-applications-using-nginx-vitual-hosts
*/
module.exports = class NginxConfsProducer {

  static buildConfig(port, domain) {
    return `server {
    listen 80;
    listen [::]:80;
    server_name ${domain} www.${domain};

    location / {    
        proxy_pass http://127.0.0.1:${port};
        include /etc/nginx/proxy_params;
    }
}`;
  }

  static saveConfig(title, config) {
    let stream = createWriteStream(`nginx/sites-available/${title}.conf`);
    stream.once('open', function () {
      stream.write(config);
      stream.end();
      console.log(`\tNginx conf for  ${title}  complete`);
    });
  }


  static main() {
    for (let i = 0; i < length; i++) {
      const
        { port, domain, title } = sites[i],
        config = NginxConfsProducer.buildConfig(port, domain);
      NginxConfsProducer.saveConfig(title, config);
    }
  }
}