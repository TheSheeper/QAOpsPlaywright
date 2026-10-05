const ExcelJs = require("exceljs");

export async function writeExcelTest(searchText: string, replaceValue: string, filePath: string) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");

  const location = { row: -1, col: -1 };

  await readExcel(searchText, worksheet, location);
  if (location.row !== -1 && location.col !== -1) {
    worksheet.getCell(location.row, location.col).value = replaceValue;
    await workbook.xlsx.writeFile(filePath);
  } else {
    console.log(`${searchText} not found`);
  }
}

async function readExcel(searchText: string, worksheet: any, location: { row: number, col: number }) {
  worksheet.eachRow((row: any, rowNumber: number) => {
    row.eachCell((cell: any, colNumber: number) => {
      if (cell.value === searchText) {
        console.log(rowNumber, colNumber, cell.value);
        location.row = rowNumber;
        location.col = colNumber;
      }
    });
  });
}
