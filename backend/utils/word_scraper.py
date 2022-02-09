import requests
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session
from utils.scrap_recipes import catalog, Recipe_Base
from schemas.word_schema import Word_IN
from typing import List


class Word_Scraper:
    def __init__(self, recipe:Recipe_Base, html_parser):
        self.recipe = recipe()
        self.html_parser = html_parser

    def scrap_words(self) -> List[Word_IN]:
        page_html = requests.get(self.recipe.url).text
        soup = self.html_parser(page_html, "lxml")
        result = self.recipe.apply_to(soup)
        result = [self.word_model_parse(word) for word in result]

        return result

    def store_words(self, word_list:list, db:Session=None) -> list:
        result = []
        for word in word_list:
            result.append(self.word_model_parse(word=word))
        return result

    def word_model_parse(self, word:str) -> Word_IN:
        result = {"word":word, "lang":self.recipe.lang}
        return Word_IN(**result)


if __name__ == "__main__":
    scraper = Word_Scraper(catalog['Dicio'], BeautifulSoup)

    result = scraper.scrap_words()
    print(result[:50])