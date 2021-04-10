#!/bin/bash 

# Current script dir (https://stackoverflow.com/a/246128)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# persistency directory ./vhd/
vhd="$DIR/vhd"

echo "Starting mongoDB container... (Persisted to '$vhd')"
docker run --name 'todo-app-monogodb' -p 27017:27017 -v "$DIR/vhd:/data/db" mongo