#**Hangman Game**#

A game where you have to guess a hidden word.

API and Frontend, with connection via websocket.
_____

Check the API [HERE](https://horvat-projects.xyz).

And Play it [HERE](https://hangman-chi.vercel.app/).

_________

Word scraped from sites and apis , implemented with recipes, giving flexibility, making ease to aquire words from another sources, just add the recipe and the scrape will deal with it.


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
Store the words with a table for the languages and another for the words. The word are stored in a sanitarized for playing and original writing to display.