#!/bin/bash
startCommand="npm start";
#local html directory
app="${PWD}/../../";
#remove existing container
docker rm -f "img"
echo "Running as img with code $app linked to /root/app and startcommand: $startCommand";
#run
docker run --name="img" -p 41800:41800 -e startCommand="$startCommand" -v $app:/root/app -v $app../picam:/root/app/build/picam -d img
