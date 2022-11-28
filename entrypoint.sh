#!/bin/bash
yarn evolutions:run -y
pm2-docker start pm2.config.js
