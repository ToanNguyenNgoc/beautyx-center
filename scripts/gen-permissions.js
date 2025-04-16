import axios from "axios";
import fs from "fs";
import path from "path";

const baseURL = 'https://devapi.myspa.vn/v1';

async function fetchData() {
    try {
        const response = await axios.get(`${baseURL}/permissions`, {
            headers: {
                'Authorization': `Bearer`
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
