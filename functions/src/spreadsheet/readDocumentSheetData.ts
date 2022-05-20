import { GoogleSpreadsheet } from "google-spreadsheet";

function columnToLetter(columnIndex: number): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetLength = alphabet.length;
  if (columnIndex < alphabetLength) {
    return alphabet[columnIndex];
  }

  return (
    columnToLetter(Math.floor((columnIndex - 1) / alphabetLength)) +
    columnToLetter(columnIndex % alphabetLength)
  );
}

const getA1Address = (columnIndex: number, rowIndex: number) => {
  const googleSheetRowIndex = `${rowIndex + 1}`;
  const googleSheetColumnIndex = columnToLetter(columnIndex);

  return `${googleSheetColumnIndex}${googleSheetRowIndex}`;
};

interface ReadSheetProps {
  doc: GoogleSpreadsheet;
  sheetIndex: number;
  startColumnIndex: number;
  endColumnIndex: number;
  startRowIndex: number;
  endRowIndex: number;
}

export async function readDocumentSheetData({
  doc,
  sheetIndex,
  startColumnIndex,
  startRowIndex,
  endColumnIndex,
  endRowIndex,
}: ReadSheetProps): Promise<string[][]> {
  const dataMatrix: string[][] = [];

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];

  const startCellAddress = getA1Address(startColumnIndex, startRowIndex);
  const endCellAddress = getA1Address(endColumnIndex, endRowIndex);

  const range = `${startCellAddress}:${endCellAddress}`;

  await sheet.loadCells(range);
  for (let rowIndex = startRowIndex; rowIndex < endRowIndex; rowIndex++) {
    const row = [];
    for (let columnIndex = startColumnIndex; columnIndex <= endColumnIndex; columnIndex++) {
      const cell = sheet.getCell(rowIndex, columnIndex);
      const cellValue = `${cell.value || ""}`;
      row.push(cellValue);
    }
    dataMatrix.push(row);
  }

  return dataMatrix;
}
