#!/bin/sh

echo "⏳ Rodando migrations com drizzle-kit..."
npx drizzle-kit generate

npx drizzle-kit push

echo "✅ Migrations aplicadas. Iniciando app..."
exec "$@"
