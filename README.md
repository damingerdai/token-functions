# Token Function
a create and verify token function based on `Docker Compose`, `Openfass` and `Typescript`

# Install 
## clone the whole project
```shell script
git clone https://github.com/damingerdai/token-functions.git
```

## init template
```shell script
git submodule init
```

## Installation Dependencies
> For development, we use docker swarm, for production, we will use K8s
 
1. [Docker](https://docs.docker.com/install/)
2. [OpenFass CLI](https://docs.openfaas.com/cli/install/)

## Init docker swarm master node
```shell script
docker swarm init
```

# Deploy Function
## Install Faas
install faas from github
```shell srcipt
https://github.com/openfaas/faas.git
```

## Deploy the FaaS Stack on Docker Swarm
run `deploy_stack.sh` script in Faas root directory
```shell script
./deploy_stack.sh
```
The default configuration will create a username and password combination for you:
```
Attempting to create credentials for gateway.
...
[Credentials]
 username: admin
 password: <some_hash_secret>
 echo -n <some_hash_secret> | faas-cli login --username=admin --
password-stdin
```
Then Login fass-cli by run:
```
echo -n <some_hash_secret> | faas-cli login --username=admin --password-stdin
```
> the *some_hash_secret* is from the last step

You will need the password for the CLI, UI and REST API on the gateway, but you can invoke your functions without it.

## Test out the UI
Open [http://127.0.0.1:8080](http://127.0.0.1:8080)  to see the OpenFaaS portal
> you need input username and password from step *Deploy the FaaS Stack on Docker Swarm*, so don't forget the username and password.

## Deploy CreateToken
### Build Function
1. create token function
```
faas-cli build -f createtoken.yml
```
2. verify token function
```
faas-cli build -f verifytoken.yml
```
### Deploy Function
1. create token function
```
faas-cli deploy -f createtoken.yml
```
2. verify token function
```
faas-cli deploy -f verifytoken.yml
```
### Test Function
1. create token function
```
curl -X POST \
  http://127.0.0.1:8080/function/createtoken \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 5ae9d125-5c1a-46d4-82bb-cdd77509021e' \
  -H 'cache-control: no-cache' \
  -H 'password: ${password}' \
  -H 'username: ${username}'
```
2. verify token function
```
curl -X GET \
  'http://localhost:8080/function/verifytoken?token=${token}' \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: PostmanRuntime/7.19.0' \
  -H 'cache-control: no-cache' 
```
> note: `username`,`password` and `token` should be provided by you.

## Deploy Verify Token Function
> this function doesn't start to develop.

# Note
 `Windows` is not recommended

# Owner

[@大明二代](https://github.com/damingerdai)

# License

[MIT](LICENSE) © 大明二代