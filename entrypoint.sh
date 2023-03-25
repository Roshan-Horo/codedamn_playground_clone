#!/bin/bash
/usr/bin/node index.js &
cd client
yarn run dev &
cd /root/app/playground-clone/demo_app
yarn run dev &
wait
