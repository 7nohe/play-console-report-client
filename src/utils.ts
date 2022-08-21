import { Readable } from "stream";
import stripBomStream from "strip-bom-stream";
import csv from "csv-parser";

export const parseCSV = <T = any>(
  data: Buffer,
  encoding?: BufferEncoding
): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    try {
      const rows: T[] = [];
      const readable = Readable.from(data, { encoding });

      readable
        .pipe(stripBomStream())
        .pipe(csv())
        .once("error", (e) => {
          reject(e);
        })
        .once("end", () => {
          resolve(rows);
        })
        .on("data", (data) => {
          rows.push(data);
        });
    } catch (e) {
      reject(e);
    }
  });
};
