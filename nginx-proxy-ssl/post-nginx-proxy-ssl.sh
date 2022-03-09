#!/bin/bash

echo "changing conf files.."
echo "default.conf -> default.conf.disable"
mv ./conf.d/default.conf ./conf.d/default.conf.disable;
echo "nginx-ssl.conf.disable -> nginx-ssl.conf"
mv ./conf.d/nginx-ssl.conf.disable ./conf.d/nginx-ssl.conf;

echo "rebooting nginx ..."
docker-compose --file nginx-proxy-ssl-docker-compose.yml
