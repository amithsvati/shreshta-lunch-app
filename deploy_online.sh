#!/bin/bash

echo "🚀 Building your app..."
npm run build

echo "------------------------------------------------"
echo "🌐 Deploying to the Public Internet (Surge.sh)"
echo "------------------------------------------------"
echo "You will be asked to enter an EMAIL and a PASSWORD."
echo "If this is your first time, just enter your email and pick a new password."
echo "------------------------------------------------"

# Run surge with the suggested domain
npx surge ./dist --domain shreshta-lunch.surge.sh
