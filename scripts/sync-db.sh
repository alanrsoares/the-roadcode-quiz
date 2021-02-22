#!/bin/bash

DB_MODULE_PATH="./node_modules/aa-db"

echo "Syncing aa-db"

node $DB_MODULE_PATH/dist/sync.js

echo "Cleaning old assets"

rm -f ./src/db.json
rm -rf ./public/assets

echo "Copying new assets"

cp $DB_MODULE_PATH/db/db.json src/
cp -R $DB_MODULE_PATH/db/assets public/
