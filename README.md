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
## Deploy the FaaS Stack on Docker Swarm
run `deploy_stack.sh` script in root directory
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
### Build Create Token Function
```
faas-cli build -f createtoken.yml
```
### Deploy Create Token Function
```
faas-cli deploy -f createtoken.yml
```
### Test Create Token Function
```
curl -X POST \
  http://127.0.0.1:8080/function/createtoken \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 5ae9d125-5c1a-46d4-82bb-cdd77509021e' \
  -H 'cache-control: no-cache' \
  -H 'password: ${password}' \
  -H 'username: ${username}'
```

## Deploy Verify Token Function
> this function doesn't start to develop.

# Note
 `Windows` is not recommended

# Owner

[@大明二代](https://github.com/damingerdai)

# License

[MIT](LICENSE) © 大明二代