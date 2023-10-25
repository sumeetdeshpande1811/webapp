#!/usr/bin/env bash
 
sudo cp /tmp/webapp.service /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl start webapp
sudo systemctl restart webapp
sudo systemctl status webapp
sudo systemctl enable webapp
APISRVC=$?
if [ $APISRVC -eq 0 ]; then
  echo "API service is installed successfully!"
else
  echo "Unable to install the API service"
fi