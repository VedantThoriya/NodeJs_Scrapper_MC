📊 MoneyControl SWOT Scraper

This Node.js project scrapes SWOT data (Strengths, Weaknesses, Opportunities, Threats) and MC Essentials Score for multiple companies from MoneyControl.com and stores the results in a local Excel spreadsheet.

✅ Features
Scrapes SWOT data count for each company

Extracts MC Essentials score

Automatically skips companies if page fails to load

Closes pop-ups automatically

Stores output in a clean Excel file (SWOT_Data.xlsx) with proper headings

📁 Output Format
The data is stored in an Excel sheet with the following structure:

Company	Strengths	Weaknesses	Opportunities	Threats	MCEssentials
TCS	11	5	8	3	76
Infosys	9	4	6	2	81
...	...	...	...	...	...

🚀 Getting Started
1. Clone the Repository

git clone https://github.com/your-username/swot-scraper.git
cd swot-scraper

3. Install Dependencies
   
npm install
4. Set Up Company URLs
   
Edit the ./utils/companies.js file and add your target companies:

module.exports = [
  { name: "TCS", url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS" },
  { name: "Infosys", url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/infosys/IT" }
];

4. Run the Scraper

node index.js
This will:

Launch Puppeteer in headless mode

Scrape SWOT + MC Essentials data

Save everything to SWOT_Data.xlsx in the root directory

🛠 Project Structure

├── index.js                 // Main script
├── utils/
│   ├── companies.js         // List of companies to scrape
│   ├── popupHandler.js      // Auto-close popups
│   └── excelWriter.js       // Writes to Excel instead of Google Sheets
├── SWOT_Data.xlsx           // Output file
├── package.json
└── README.md

📝 Notes
Make sure you have a stable internet connection; Puppeteer waits for the full page load before scraping.

Excel sheet headers are created only once. Data is appended on each run.

