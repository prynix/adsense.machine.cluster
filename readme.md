![](https://marketingland.com/wp-content/ml-loads/2016/08/google-adsense-icon3-1920.jpg)

```sh
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ apt-get install -y nodejs
$ apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
$ apt-get update
$ sudo apt-get install -y mongodb-org
```


```sh
$ git clone https://github.com/cr7parker/adsense.machine.cluster.git
```


```sh
$ service mongod start
$ npm i
$ npm run scrape
$ npm start
```