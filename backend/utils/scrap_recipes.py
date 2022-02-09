from utils.scrap_utils import Recipe_Base
from config.settings import scraper_cfg

class Dicio(Recipe_Base):
    def __init__(self):
        Recipe_Base.__init__(self,
                        url=scraper_cfg.DEFAULT_URL,
                        lang=scraper_cfg.DEFAULT_LANGUAGE)

    def apply_to(self, html_parser):
        scraped_word_links = html_parser.html.body.findAll("p",
                                                            "words-list--links")
        return [word.contents[0]
                for word_link in scraped_word_links
                for word in word_link.findAll("a")
                if " " not in word.strip() ]


recipe_list = [Dicio]


class Recipes:
    def __init__(self, recipe_list):
        self.recipe_list = recipe_list
        self.catalog = self.get_sources()

    def get_sources(self) -> dict:
        catalog = dict()

        for recipe in recipe_list:
            catalog[recipe.__name__] = recipe
            return catalog

recipes = Recipes(recipe_list)
catalog = recipes.catalog