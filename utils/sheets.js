const { google } = require('googleapis');
require('dotenv').config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'MoneyControl';

async function getSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
}

async function insertSheetData(companyName, result) {
    const sheets = await getSheetsClient();

    const now = new Date();
    const formattedDate = now.toLocaleString();

    const sheetRow = [
        formattedDate,
        companyName,
        result['Strengths'] || 0,
        result['Weaknesses'] || 0,
        result['Opportunities'] || 0,
        result['Threats'] || 0,
        result['MCEssentials'] || "N/A"
    ];

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:G`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [sheetRow]
        }
    });
}

module.exports = { insertSheetData }