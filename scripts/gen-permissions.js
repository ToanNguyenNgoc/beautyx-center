import axios from "axios";
import fs from "fs";
import path from "path";

const baseURL = 'http://127.0.0.1:8000/v1';

async function fetchData() {
    try {
        const response = await axios.get(`${baseURL}/permissions`, {
            headers: {
                'Authorization': `Bearer 67c916b5f876254a020a9b86|LSgWez2O3KykY6c0ylk2`
            }
        });

        const permissions = response.data.context.reduce((acc, item) => {
            acc[item.name] = item.name;
            return acc;
        }, {});

        const jsonData = JSON.stringify(permissions, null, 2);
        const filePath = path.resolve('../beautyx-center/src/app/components/PermissionLayout/permissions.json');
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(filePath, jsonData);
        console.log(`Saved: ${filePath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchData();
