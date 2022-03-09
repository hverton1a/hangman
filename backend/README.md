#**Hangman Game**#

A game where you have to guess a hidden word.

API and Frontend, with connection via websocket.
_____

Check the API [HERE](https://horvat-projects.xyz).

And Play it [HERE](https://hangman-chi.vercel.app/).

_________

Words scraped from sites and apis , the webscraper was implemented accepting recipes, giving flexibility, making ease to aquire words from another sources, just add the recipe and the scrape will deal with it.


##Stack##

###BackEnd###

Deployed at CGP
* Docker, docker-compose.
* Python, FastAPI, SqlAlchemy, Alembic.
* Mysql server
* HTML, css, JS.

Reverse-Proxy and TSL
* Docker, docker-compose.
* NGINX and CertBot


###FrontEnd###
Deployed at Vercel
* ReactJS

Although it is with portuguese words, was implemented to manage all alphabetic languages. 
Store words with a many-to-one table for languages, and in two formats, sanitarized for playing and, original spelling to display.