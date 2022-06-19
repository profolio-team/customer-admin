import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "../firebase";
import { fromBase64 } from "../utils/converter";

const docId = config.spreadsheet.doc_id;
const apiKey = config.spreadsheet.api_key;
const serviceAccountAuthCredentials = config.spreadsheet.credentials;

export async function getBackOfficeDocument(): Promise<GoogleSpreadsheet> {
  const doc = new GoogleSpreadsheet(docId);
  if (apiKey) {
    doc.useApiKey(apiKey);
  } else if (serviceAccountAuthCredentials) {
    const keys = JSON.parse(fromBase64(serviceAccountAuthCredentials));
    await doc.useServiceAccountAuth(keys);
  }
  return doc;
}
