#!/bin/bash
/usr/bin/node index.js &
cd client
/root/.yarn/bin/yarn run dev &
cd /home/testuser/code
/root/.yarn/bin/yarn run dev &
wait
