#!/bin/bash

# Update and upgrade packages
sudo apt update
sudo apt upgrade -y
sudo apt install -y unzip
# Install PostgreSQL and related packages
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install Node.js and npm
sudo apt install -y nodejs
sudo apt install -y npm

# Check Node.js version
nodejs -v


sudo mkdir webapp
sudo cp /tmp/webapp.zip /home/admin/webapp/webapp.zip
cd /home/admin/webapp/
unzip webapp.zip