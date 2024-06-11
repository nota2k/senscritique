FROM python:3

WORKDIR /senscritique_app/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./senscritique_scrap ./

CMD [ "scrapy","crawl","senscritique" ]
