#!/bin/bash
source .env || {
    echo "Error loading .env file"
    exit 1
}
HOST=$POSTGRES_HOST
PORT=$POSTGRES_PORT
DB_NAME=$POSTGRES_DB
USERNAME=$POSTGRES_ADMIN_USER


psql -h $HOST -p $PORT -U $USERNAME -d $DB_NAME -f ./database-setup.sql
