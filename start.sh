#!/bin/bash

# RevTrack - Production Start Script
# This script starts the production environment

echo "🚀 Starting RevTrack Production Environment"
echo "==========================================="

# Set environment
export NODE_ENV=production

# Start the production server
echo "🌐 Starting Next.js production server..."
echo "   Server starting on port $PORT or 3000"
echo ""

# Check if we have a built application
if [ -f "server.js" ]; then
    node server.js
elif [ -d ".next" ]; then
    npm start
else
    echo "❌ No built application found. Building first..."
    npm run build
    npm start
fi
