import axios from "axios";

const API_KEY = 'AIzaSyBNIDPa1tihLwHoauvPSfkOh9BGfTzPcgg';
const SPREADSHEET_ID = '1bT6TDPK6LhrrnGc4Fb2MfKScd3nZnQlS9ur9TQwiqyQ';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${API_KEY}`;

async function fetchSheetData() {
  try {
    const response = await axios.get('https://docs.google.com/spreadsheets/d/1bT6TDPK6LhrrnGc4Fb2MfKScd3nZnQlS9ur9TQwiqyQ/edit?gid=0#gid=0');
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error('Lỗi khi gọi Google Sheets API:', error);
  }
}

fetchSheetData();