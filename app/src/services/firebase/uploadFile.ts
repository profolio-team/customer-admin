import { storage } from "./index";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadFile(path: string, fileToUpdate: File) {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytes(storageRef, fileToUpdate);
  return await getDownloadURL(uploadTask.ref);
}
