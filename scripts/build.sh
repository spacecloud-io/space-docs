#!/bin/sh

set -e

npm run build
hugo

echo "Context value is: $CONTEXT"


if [ $CONTEXT = "production" ]
then
  echo "Deploying to Algolia"
  npm run algolia
  echo "Done deploying to algolia"
elif [ $CONTEXT = "deploy-preview" ]
then
  echo "Skipping deploy to algolia step"
fi

