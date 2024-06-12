# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field

class SenscritiqueScrapItem(Item):
    # define the fields for your item here like:
    id = Field(),
    membre = Field(),
    title = Field(),
    year = Field(),
    creator = Field(),
    link = Field(),
    cover = Field(),

    pass

class MembresScrapItem(Item):
    # define the fields for your item here like:
    username = Field(),
    link = Field(),
    thmb = Field()
    
    pass
