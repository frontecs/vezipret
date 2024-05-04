# vezipret

### 🇺🇸 (en)

vezipret is a project aiming to make it easier to spot sales by showing the price history of products.
The project itself is crowdsourced, as users who would like to contribute have to install a chrome extension which automatically uploads the price to the project's database.

### 🇷🇴 (ro)

vezipreț este un proiect ce are ca obiectiv să facă mai ușor să observi tendințele de preț, afișând istoricul prețurilor produselor.
Proiectul în sine își ia datele prin crowdsourcing, utilizatorii care doresc să contribuie trebuie să instaleze o extensie Chrome care încarcă automat prețul produsului în baza de date a proiectului.

## Development

First, clone the repository to your machine:

```
git clone https://github.com/frontecs/vezipret.git
```

Set up the .env variables in the .env.EXAMPLE file, and rename it to .env afterwards.
Next, `cd` into the backend, install the dependencies and run the server:

```
cd vezipret/backend && npm i && node .
```

After running the backend server, open another terminal instance in the root directory (vezipret), install its dependencies and start the frontend:

```
cd frontend && npm i && npm run dev
```

Both servers should now be running just fine, and all that is left to do is install the Chrome extension on a compatible browser (e.g. Chrome, Chromium, Arc, Brave, Opera GX)

Open chrome://extensions in a new tab, toggle developer mode ON in the top-right corner of the screen, click the _load unpacked_ button and select the _extension_ folder.
