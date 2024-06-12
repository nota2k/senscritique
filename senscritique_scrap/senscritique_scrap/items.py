# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field

class SenscritiqueScrapItem(Item):
    # define the fields for your item here like:
    id = Field(),
    contributor = Field(),
    title = Field(),
    year = Field(),
    creator = Field(),
    link = Field(),
    cover = Field(),
    
    pass
