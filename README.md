# Fotoon API

API sukurtas „Fotoon“ nuotraukų bendrinimo tinklui.


## Naudojami įrankiai ir bibliotekos
Programavimo kalba:
 - [Node.js 16.0.0](https://nodejs.org/en/about/)
  
Bibliotekų valdymo sistema:
 - [NPM 7.10.0](https://docs.npmjs.com/about-npm)
  
Bibliotekos („child“ bibliotekos nepateiktos šiame sąraše):
 - [cookie-parser 1.4.6](https://www.npmjs.com/package/cookie-parser)
 - [date-and-time 2.0.1](https://www.npmjs.com/package/date-and-time)
 - [dotenv 10.0.0](https://www.npmjs.com/package/dotenv)
 - [ejs 3.1.6](https://www.npmjs.com/package/ejs)
 - [express 4.17.2](https://www.npmjs.com/package/express)
 - [express-ejs-layouts 2.5.1](https://www.npmjs.com/package/express-ejs-layouts)
 - [jsonwebtoken 8.5.1](https://www.npmjs.com/package/jsonwebtoken)
 - [node-fetch 3.1.0](https://www.npmjs.com/package/node-fetch)
  
Papildomos bibliotekos:
 - [@fortawesome/fontawesome-free 5.15.4](https://fontawesome.com/v5.15/how-to-use/on-the-web/setup/using-package-managers)
 - [bulma 0.9.3](https://www.npmjs.com/package/bulma)
 - [node-sass 7.0.0](https://www.npmjs.com/package/node-fetch)
 - [nodemon 2.0.15](https://www.npmjs.com/package/nodemon)
  
Atsisiųsti bibliotekoms, šio projekto aplanko direktorijoje per terminalą suveskite `npm install` (būtina turėti NPM bibliotekos valdymo sistemą).

## Environmental Variables
Šis projektas turi turėti `.env` failą savo aplanke, kuris yra reikalingas serverio tipui nustatyti (http/https) - `DEV_MODE`, duomenų bazės prisijungimui - `MONGO_SRV` ir sesijos kurimui ir patvritinimui - `JWT_SECRET`

```bash
  DEV_MODE=<true/false>
  JWT_SECRET=<random string without ambiguous characters>
```
Jei buvo nurodyta, kad `DEV_MODE=false`, tada taip pat turi būti nurodyti šie parametrai:
```bash
  SSL_PRIVATE_KEY=<path to SSL private key>
  SSL_CERTIFICATE=<path to SSL certificate>
  SSL_CHAIN=<path to SSL chain>
```
    
## Serverio paleidimas

Šis kodas turi tris paleidimo pasirinkimus:
  

Paleisti įprastai `node server.js`:
```bash
  npm run start
```
Paleisti naudojant [nodemon](https://www.npmjs.com/package/nodemon) biblioteką `nodemon server.js`:
```bash
  npm run dev
```
Sukompiliuoti pagrindinį `.css` „Bulma“ failą iš `.scss` failo:
```bash
  npm run sass-build
```
Sukurti [Docker](https://www.docker.com/resources/what-container) konteinerį:
```bash
  npm run docker-build
```

## Autoriai

- [@augustinavicius](https://github.com/augustinavicius) | Ignas Augustinavičius

## Papildoma informacija

Sukurta 2021/2022 VU kompiuterių architektūros grupiniam projektui.