const axios = require('axios');
const fs = require('fs');
const baseURL = 'http://127.0.0.1:8000/v1'

async function fetchData() {
  try {
    const response = await axios.get(`${baseURL}/permissions`, {
      headers: {
        'Authorization': `Bearer 67b4495c83ee226de106ea53|nRDQCmUoi1PdhlUuZb6n`
      }
    });
    const permissions = response.data.context.reduce((acc, item) => {
      acc[item.name] = item.name;
      return acc;
    }, {});
    const jsonData = JSON.stringify(permissions, null, 2);
    fs.writeFileSync('./src/components/PermissionLayout/permissions.json', jsonData);
    console.log('Data saved to ./src/components/PermissionLayout/permissions.json');
  } catch (error) {
    console.log(JSON.stringify(error))
    console.error('Error fetching data:', error.message);
  }
}

fetchData();
