#!/bin/sh

if [ -f "./package-lock.json" ]; then
  npm run build
elif [ -f "./yarn.lock" ]; then
  type yarn >/dev/null 2>&1 || {
    echo >&2 "not found yarn. installing..."
    npm i -g yarn
  }
  yarn build
elif [ -f "./pnpm-lock.yaml" ]; then
  type pnpm >/dev/null 2>&1 || {
    echo >&2 "not found pnpm. installing..."
    npm i -g pnpm
  }
  pnpm run build
else
  type yarn >/dev/null 2>&1 || {
    echo >&2 "not found yarn. installing..."
    npm i -g yarn
  }
  yarn build
fi


type docker >/dev/null 2>&1 || {
  echo >&2 "not found docker(https://docs.docker.com/get-docker/) Aborting."
  sleep 1
  exit 1
}

default_tag=sv-sso-web
echo -e "image tag is(${default_tag}): "
read tag

if [[ -z "${tag}" ]]; then
  tag=${default_tag}
fi

echo "exec docker build -t ${tag} ."
sudo docker build -t ${tag} .
