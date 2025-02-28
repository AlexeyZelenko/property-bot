#!/bin/bash

# Exit on any error
set -e

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if PROJECT_ID is set
if [ -z "$PROJECT_ID" ]; then
  echo "Error: PROJECT_ID is not set. Please set it in .env file"
  exit 1
fi

# Check if TELEGRAM_TOKEN is set
if [ -z "$TELEGRAM_TOKEN" ]; then
  echo "Error: TELEGRAM_TOKEN is not set. Please set it in .env file"
  exit 1
fi

echo "🚀 Starting deployment to Google Cloud Run..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t gcr.io/${PROJECT_ID}/telegram-bot .

# Push to Google Container Registry
echo "⬆️ Pushing to Container Registry..."
docker push gcr.io/${PROJECT_ID}/telegram-bot

# Deploy to Cloud Run
echo "🔄 Deploying to Cloud Run..."
gcloud run deploy telegram-bot \
  --image gcr.io/${PROJECT_ID}/telegram-bot \
  --platform managed \
  --allow-unauthenticated \
  --region us-central1 \
  --set-env-vars "TELEGRAM_TOKEN=${TELEGRAM_TOKEN},NODE_ENV=production"

echo "✅ Deployment completed successfully!"
echo "📝 Streaming logs (Ctrl+C to exit)..."
gcloud logging tail "resource.type=cloud_run_revision AND resource.labels.service_name=telegram-bot"

read -p "Press Enter to exit..."