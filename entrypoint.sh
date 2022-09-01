#!/bin/bash
node index.js &
cd client
yarn run dev &
cd /home/testuser/code
live-server --port=3000 index.html &
