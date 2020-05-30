FROM python:3-slim-buster
RUN pip install -q fastapi uvicorn aitextgen
COPY . /
ENTRYPOINT ["python3", "app.py"]
