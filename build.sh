#!/bin/sh
if [$CONTEXT == "branch-deploy"] ;
  then export NEXTAUTH_URL=$STAGING_URL
else if [$CONTEXT == "production"] ; 
  then export NEXTAUTH_URL=$PRODUCTION_URL
fi
# npm is setup to always use $MY_CONTEXT_VAR, and assumes you have it set before you start!
yarn build