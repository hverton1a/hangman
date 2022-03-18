#**Hangman Game**#

A hidden word guessing game.

API and Frontend, with connection via websocket.
_____

Check the [ API Page HERE ](https://horvat-projects.xyz).

And Play it [HERE](https://hangman-chi.vercel.app/).

_________

Word scraped from sites and apis , implemented with recipes, giving flexibility, making ease to aquire and update words from another sources, just add the recipe and the scraper will deal with it.
Designed to be multi-language, storing words in a original and sanitarized form, only dependant to be alphabetical.
The workflow was dockerized, coded remotely inside the container.
_________
_________

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

![Diagram](https://github.com/hverton1a/hangman/blob/production/backend/assets/diagram.png)