#!/bin/bash

echo "creating certbot folder structure..."
mkdir certbot && mkdir certbot/conf && mkdir certbot/data && mkdir certbot/logs;
mkdir dhparam && mkdir dhparam/conf;

echo "done.."
tree -d

echo "creating dhparam if needed ..."
if [ ! -f "./dhparam/conf/dhparam-2048.pem" ]; then 
	opensl dhparam -out ./dhparam/conf/dhparam-2048.pem 2048
fi

echo "make the proper changes in ./conf.d/default.conf and ./conf.d/nginx-ssl.conf.disable"
echo "spin up the stack"
echo "$ docker-compose --file nginx-proxy-ssl-docker-compose.yaml up -d"