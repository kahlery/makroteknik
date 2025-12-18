docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email berkay.aslan.dev@gmail.com \
  --agree-tos \
  --no-eff-email \
  -d makroteknik.co.uk
