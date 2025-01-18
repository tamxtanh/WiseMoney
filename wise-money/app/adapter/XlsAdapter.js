import FileAdapter from "./adapter";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";

export default class XlsAdapter extends FileAdapter {
    async parseFile(fileUri) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
        const workbook = XLSX.read(fileContent, { type: "base64" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        const transactions = data.map((row) => ({
            category: parseInt(row.category),
            name: row.name ? row.name : null,
            amount: parseInt(row.amount),
            note: row.note ? row.note : null,
            type: row.type ? parseInt(row.type) : null,
            date: row.date
        }));
        return transactions;
    }
}