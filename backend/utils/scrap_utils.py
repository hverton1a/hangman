# Default Scrap Recipe Template
class Recipe_Base:
    def __init__(self, url, lang):
        self.url = url
        self.lang = lang

    def apply_to(self, html_parser):
        pass