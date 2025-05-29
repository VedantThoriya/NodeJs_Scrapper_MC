# NodeJs_Scrapper_MC

# Project Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create your Google Cloud Service Account and download `credentials.json`
4. Place the `credentials.json` file in the root of the project (this file is ignored by git)
5. Add your Google Sheet ID in `scripts/sheetsClient.js` or use environment variables
6. Run the scraper with `node scripts/scraper.js`
