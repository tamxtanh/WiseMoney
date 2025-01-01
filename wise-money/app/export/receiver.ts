import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export class ExportReceiver {
    async exportToXLSX(data: any[]) {
        const formattedData = data.map((item) => ({
            Date: item.date,
            Category: item.category_name,
            Name: item.item_name,
            Amount: item.amount,
            Note: item.note,
            "Money Type": item.type_name,
            Contact: item.contact_name,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
        const uri = FileSystem.documentDirectory + "data.xlsx";

        await FileSystem.writeAsStringAsync(uri, wbout, {
            encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(uri);
    }
}
