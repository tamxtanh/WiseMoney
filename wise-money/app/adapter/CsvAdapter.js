import FileAdapter from "./adapter";
import * as FileSystem from "expo-file-system";

export default class CsvAdapter extends FileAdapter {
    async parseFile(fileUri) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const rows = fileContent.split("\n");
        const transactions = rows.map((row) => {
            const [category, name, amount, note, type] = row.split(",");
            return { category: parseInt(category.trim()), name: name ? name.trim() : null, amount: parseInt(amount.trim()), note: note ? note.trim() : null, type: type ? parseInt(type.trim()) : null };
        });
        return transactions;
    }
}