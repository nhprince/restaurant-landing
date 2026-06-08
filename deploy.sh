#!/bin/bash
set -e

CF_API_TOKEN="cfut..."
CF_ACCOUNT_ID="89f7e2d36d8ec57f55770ee400685f53"
PROJECT_NAME="restaurant-landing"

echo "=== Creating Pages Project ==="
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$PROJECT_NAME\",\"production_branch\":\"main\"}" \
  > /tmp/cf_create.json

cat /tmp/cf_create.json | python3 -c "import sys,json; d=json.load(sys.stdin); print('Success:', d.get('success')); print(json.dumps(d, indent=2))" 2>&1

echo ""
echo "=== Uploading files ==="
cd /home/nhprince/restaurant-landing/frontend

# Use wrangler pages deploy
export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
export CLOUDFLARE_ACCOUNT_ID="$CF_ACCOUNT_ID"

~/.hermes/node/bin/wrangler pages deploy out \
  --project-name="$PROJECT_NAME" \
  --branch=main \
  --commit-dirty=true 2>&1

echo ""
echo "=== Done ==="
echo "Site should be live at: https://$PROJECT_NAME.pages.dev"
