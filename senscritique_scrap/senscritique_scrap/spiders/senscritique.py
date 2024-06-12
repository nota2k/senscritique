from twisted.internet import reactor
import scrapy
import re
from scrapy.spiders import CrawlSpider, Rule
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

class MembresSpider(scrapy.Spider):
    name = "membres"
    allowed_domains = ["www.senscritique.com"]
    start_urls = ["https://www.senscritique.com/nota2k/contacts"]
    
    def parse(self, response):
        for membres in response.css('div.sc-74f141aa-0'):
            link = membres.css('a::attr(href)')[1].get()
            link_split = re.sub('/', '', link)
            user = link_split
            
            yield {
                    'username': membres.css("::text").get(),
                    'link': user,
                    'thmb': membres.css('a::attr(data-srcname)').get(),
                    
            }

class SenscritiqueSpider(scrapy.Spider):
    name = "senscritique"

    def start_requests(self):
        url = "https://www.senscritique.com/nota2k/contacts"
        yield scrapy.Request(url, self.parse_users)

    def parse_users(self, response):
        users = []
        for membres in response.css('div.sc-74f141aa-0'):
            link = membres.css('a::attr(href)')[1].get()
            link_split = re.sub('/', '', link)
            users.append(link_split)

        for user in users:
            yield scrapy.Request(f"https://www.senscritique.com/{user}/collection?action=WISH", self.parse)
    
    def parse(self, response):
        for index, film in enumerate(response.css('div.sc-7d656c84-1')):
            title = film.css("::text")[1].get()
            title = title.split('(')[0].strip()

            link = film.css('a::attr(href)').get()
            link = response.urljoin(link)

            current_url = response.url
            membre = current_url.split('/')[-2]

            yield {
                    'id': str(index),
                    'membre': membre,
                    'title': title,
                    'year': film.css('::text').re(r'\((\d{4})\)'),
                    'creator': film.css('p.ccvcgV a span::text').get(),
                    'link': link,
                    'cover': film.css('span::attr(data-srcname)').get(),
                    
            }
        next_page = response.css("nav span::text")[1].get()
        last_page = response.css("nav > span:last-child::text").get()
        next_page = int(next_page) + 1

        if next_page is not None:
            while next_page <= int(last_page):
                pagination = 'https://www.senscritique.com/nota2k/collection?action=WISH&page=' + str(next_page)
                yield response.follow(pagination, callback=self.parse)
                next_page += 1


settings = get_project_settings()
process = CrawlerProcess(settings)


# #     process.crawl(spider_name)
# # if __name__ == '__main__':
process.crawl(SenscritiqueSpider)
process.crawl(MembresSpider)
process.start()