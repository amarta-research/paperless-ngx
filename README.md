# Start Generation Here
docker-compose -f docker-compose.postgres-tika.yml up -d
# End Generation Here


# Start of Selection
docker-compose -f docker-compose.postgres-tika.yml down
# End of Selection

brew install gnupg
brew install libmagic
brew install mysql-client


## Start Development Server Locally
folder src/

```python
python3 manage.py runserver && python3 manage.py document_consumer && celery --app paperless worker -l DEBUG
```

## Start Celery Worker Locally
folder src/

```python
celery -A paperless worker -l info
``` 