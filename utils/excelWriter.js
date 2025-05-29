// utils/excelWriter.js
const XLSX = require('xlsx');
const fs = require('fs');

const filePath = './SWOT_Data.xlsx';

function insertExcelData(companyName, result) {
  let workbook;
  let worksheet;

  // Load existing workbook if it exists
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([['Company', 'Strengths', 'Weaknesses', 'Opportunities', 'Threats', 'MCEssentials']]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SWOT Data');
  }

  const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const newRow = [
    companyName,
    result["Strengths"] ?? '',
    result["Weaknesses"] ?? '',
    result["Opportunities"] ?? '',
    result["Threats"] ?? '',
    result["MCEssentials"] ?? '',
  ];

  sheetData.push(newRow);

  const newSheet = XLSX.utils.aoa_to_sheet(sheetData);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, filePath);
}

module.exports = { insertExcelData };
