FROM python:3.7-slim-buster

WORKDIR /usr/src/ai-models

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

# To use flask run instead of python main.py
ENV FLASK_APP=main.py

CMD ["flask", "run", "--host", "0.0.0.0"]
