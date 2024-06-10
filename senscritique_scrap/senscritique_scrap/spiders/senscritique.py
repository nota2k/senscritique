import scrapy

class SenscritiqueSpider(scrapy.Spider):
    name = "senscritique"
    allowed_domains = ["www.senscritique.com"]
    start_urls = ["https://www.senscritique.com/nota2k/collection?action=WISH"]
    def parse(self, response):
        for index, film in enumerate(response.css('div.sc-7d656c84-1')):
            title = film.css("::text")[1].get()
            title = title.split('(')[0].strip()

            link = film.css('a::attr(href)').get()
            link = response.urljoin(link)

            yield {
                    'id': str(index),
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
