#!/bin/bash

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to that directory
cd "$DIR"

# Kill any existing processes
killall -9 node 2>/dev/null

echo "🚀 Starting UNSUB ME..."
echo ""

# Start the app
npm run dev

# Keep terminal open on exit
read -p "Press any key to exit..."
