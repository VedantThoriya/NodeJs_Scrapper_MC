# 📊 MoneyControl SWOT Scraper

[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)](https://nodejs.org/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-HeadlessChrome-blue)](https://pptr.dev/)
[![ExcelJS](https://img.shields.io/badge/ExcelJS-Export-green)](https://www.npmjs.com/package/exceljs)

A Node.js-based web scraper that fetches **SWOT Analysis data** (Strengths, Weaknesses, Opportunities, Threats) and **MC Essentials Score** from [MoneyControl](https://www.moneycontrol.com) for a list of companies, and saves it in a structured **Excel file**.

---

## 🚀 Features

- ✅ Extracts count of SWOT categories
- ✅ Gets MC Essentials Score
- ✅ Automatically handles page popups
- ✅ Saves clean data to Excel (`SWOT_Data.xlsx`)
- ✅ Reusable & customizable list of companies

---

## 🧩 Technologies Used

- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/)
- [ExcelJS](https://www.npmjs.com/package/exceljs)

---

## 📁 Excel Output Format

Saved as `SWOT_Data.xlsx` in the project root:

| Company   | Strengths | Weaknesses | Opportunities | Threats | MCEssentials |
|-----------|-----------|------------|----------------|---------|--------------|
| TCS       | 11        | 4          | 6              | 2       | 81           |
| Infosys   | 9         | 3          | 7              | 1       | 78           |

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/moneycontrol-swot-scraper.git
cd moneycontrol-swot-scraper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Target Companies

Edit the file `./utils/companies.js` to define which companies you want to scrape:

```js
module.exports = [
  {
    name: "TCS",
    url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS"
  },
  {
    name: "Infosys",
    url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/infosys/IT"
  }
];
```

### 4. Run the Scraper

```bash
node index.js
```

The script will:
- Launch a headless browser
- Scrape SWOT and score data
- Save to an Excel file `SWOT_Data.xlsx`

---

## 📂 Project Structure

```
moneycontrol-swot-scraper/
├── index.js               # Main scraping logic
├── utils/
│   ├── companies.js       # Company name & URL list
│   ├── popupHandler.js    # Popup handler logic
│   └── excelWriter.js     # Excel file writer logic
├── SWOT_Data.xlsx         # Output file (created on first run)
├── package.json
└── README.md              # This file
```

---

## 📌 Notes

- This project no longer uses Google Sheets. All data is saved locally in Excel format.
- Popups on MoneyControl are automatically closed using Puppeteer logic.
- Excel file headers are generated only once. Each new run appends new company data below.

---

## 📃 License

MIT License © [Your Name](https://github.com/your-username)