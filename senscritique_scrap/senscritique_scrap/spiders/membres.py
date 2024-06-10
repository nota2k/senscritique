import scrapy
import re

class MembresSpider(scrapy.Spider):
    name = "membres"
    allowed_domains = ["www.senscritique.com"]
    start_urls = ["https://www.senscritique.com/nota2k/contacts"]

    def parse(self, response):
        for membres in response.css('div.sc-74f141aa-0'):
            link = membres.css('a::attr(href)')[1].get()
            link_split = re.sub('/', '', link)
            
            yield {
                    'username': membres.css("::text").get(),
                    'link': link_split,
                    'thmb': membres.css('a::attr(data-srcname)').get(),
                    
            }
    