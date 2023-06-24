#!/bin/bash

podman run --rm -it \
    -v $(pwd):/app \
    -v /opt/android-sdk:/opt/android-sdk \
    -v $HOME/.gradle:/root/.gradle \
    -w /app \
    -p 3001:3000 \
    --name blood-donation-frontend \
    react-native-dev:node-18 npm run dev
