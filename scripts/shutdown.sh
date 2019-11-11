#!/bin/sh

docker service ls --filter="label=function" -q | xargs docker service rm

docker stack rm func && docker secret rm basic-auth-user && docker secret rm basic-auth-password