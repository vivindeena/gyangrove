#!/bin/bash

# Call the building image for the app
docker build -t app-image ../app

# Check the exit status of the image-builder script
if [ $? -eq 0 ]; then
  echo "Image build successful. Starting Docker Compose..."
  docker-compose up
  
else
  echo "Image build failed. Exiting..."
fi