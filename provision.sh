#!/bin/bash -e

# Add localhost.firebaseio.test to hosts
sudo chown vagrant /etc/hosts
echo "127.0.0.1   localhost.firebaseio.test" >> /etc/hosts

# install dependancies
sudo apt-get update
sudo apt-get install -y curl git build-essential gyp python redis-server

# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source /home/vagrant/.nvm/nvm.sh

# install Node.js
nvm install 8.9.0

# set node environment variable
echo "export NODE_ENV=development" >> /home/vagrant/.bashrc

# install project dependancies
cd /vagrant
npm install



