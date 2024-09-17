# Carpool Frontend

Dette er Carpool Frontend

Carpool er et website, der giver et overblik over samkørselsture. Her kan brugere nemt oprette og administrere kørseler.

Det er et dynamisk website, hvor brugervenlighed er i centrum. Hjemmesiden er designet til at være responsive, hvilket betyder, at den automatisk tilpasser sig enhver skærmstørrelse, fra desktop til mobile enheder.

## Funktioner

- **Oprette Kørere:** Opret Kørere
- **Oprette Kørsler:** Opret Kørsler
- **Redigere Kørere:** Rediger dine Kørere
- **Redigere Kørsler:** Rediger dine Kørsler
- **Se Statistikker:** Se dine, andres og totale Statistikker

## Teknologi

- **Frontend**: Next.js
- **Backend**: C# .NET
- **Database**: MsSQL
- **Deployment**: Docker

## Projekt Opsætning

### Lokalt

1. **Klon Repositoriet**

    ```
    git clone https://github.com/emilstorgaard/carpool-frontend.git
    ```

2. change directory to the project folder

    ```
    cd carpool-frontend
    ```

3. **Installer Dependencies**

    ```
    npm install
    ```

4. **Køre Portfolio Tracker API**

    <https://github.com/emilstorgaard/CarpoolAPI>

5. **Starte Projektet Lokalt**

    ```
    npm run dev
    ```

### Docker

For at bygge og køre projektet ved hjælp af Docker, følg disse trin:

1. **Byg Docker Image**

    ```
    docker build -t carpool_frontend .
    ```

2. **Kør Containeren**

    ```
    docker run -p 8888:3000 carpool_frontend
    ```

    Herefter er applikationen tilgængelig på `localhost:8888`.

© Emil Storgaard Andersen, 2024.