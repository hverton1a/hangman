FROM python:3.8

WORKDIR /app

Run echo "Hello, preparing Python 3.8 image."

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000:5000

# VOLUME /mnt/m/www/python/projects/hangman/backend:/app

CMD tail -f /dev/null
