import * as functions from "firebase-functions";
import { getBackOfficeDocument } from "../spreadsheet/getBackOfficeDocument";
import { readDocumentSheetData } from "../spreadsheet/readDocumentSheetData";

export const getDataFromSheet = functions.https.onRequest(async (req, res) => {
  try {
    const backOfficeDocument = await getBackOfficeDocument();
    const firstListData = await readDocumentSheetData({
      doc: backOfficeDocument,
      sheetIndex: 1,
      startColumnIndex: 0,
      startRowIndex: 0,
      endColumnIndex: 12,
      endRowIndex: 3,
    });

    res.send(firstListData);
  } catch (e) {
    console.log(e);

    res.send("Failed");
  }
});
