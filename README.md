# Real Estate Telegram Bot

## Available Commands

### Basic Commands
- `/start` - Starts the bot and shows the main property type selection menu
- `/menu` - Opens the main menu with quick access buttons

### Main Menu Options
1. **Property Search**
    - "Пошук нерухомості" (Search Properties)
    - Shows property type selection:
        - Квартири (Apartments)
        - Будинки (Houses)
        - Комерційна нерухомість (Commercial)

2. **Favorites**
    - "Мої улюблені" (My Favorites)
    - Shows saved properties

3. **Latest Listings**
    - "Останні пропозиції" (Latest Offers)
    - Shows recently added properties

4. **Contact**
    - "Зв'язатися з менеджером" (Contact Manager)
    - Opens contact options

### Property Type Submenus

#### Apartments (Квартири)
- 1-кімнатні (1 Room)
- 2-кімнатні (2 Rooms)
- 3+ кімнатні (3+ Rooms)

#### Houses (Будинки)
- Приватні будинки (Private Houses)
- Таунхауси (Townhouses)
- Дачі (Country Houses)

#### Commercial (Комерційна нерухомість)
- Офіси (Offices)
- Магазини (Stores)
- Склади (Warehouses)

### Navigation
- "← Назад" (Back) - Returns to the previous menu

## Development Commands

To run the bot locally:
```bash
# Install dependencies
npm install

# Start the bot in development mode
npm run dev

# Start the bot in production mode
npm start
```

## Docker Commands

```bash
# Build the Docker image
docker build -t telegram-bot .

# Run the container
docker run -d \
  --name telegram-bot \
  -p 8080:8080 \
  --env-file .env \
  telegram-bot

# View logs
docker logs telegram-bot

# Stop the container
docker stop telegram-bot

# Remove the container
docker rm telegram-bot
```