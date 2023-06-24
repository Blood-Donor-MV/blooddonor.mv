#!/bin/bash

podman run --rm -it \
    -v $(pwd):/app \
    -v /opt/android-sdk:/opt/android-sdk \
    -v $HOME/.gradle:/root/.gradle \
    -v $HOME/.dockercache/appuser/yarn:/root/.yarn \
    -v $HOME/.dockercache/appuser/npm:/root/.npm \
    -w /app \
    -e ANDROID_HOME=/opt/android-sdk \
    --network host \
    react-native-dev:node-18 $@
