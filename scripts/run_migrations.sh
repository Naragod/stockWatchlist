
PG_CONNECTION="postgresql://postgres:postgres@localhost/postgres"

for file in */migrations/*; do
    FILENAME=$(basename "${file}")
    psql "${PG_CONNECTION}" -f ./"${file}"
    psql "${PG_CONNECTION}" -q -c "INSERT INTO casestudy_migrations (file_name) VALUES('$FILENAME')"
    echo "File: $FILENAME successfully migrated"
done