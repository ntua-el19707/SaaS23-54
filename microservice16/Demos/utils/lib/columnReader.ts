import { readFileSync, unlinkSync } from "fs";

/**
 * function readCsv
 * @param FileName String
 * @returns file context
 */
function readCsv(FileName: string): string {
  const path = `${FileName}`;

  const data = readFileSync(path, { encoding: "utf8", flag: "r" });
  return data;
}

function csvTablesC(csv: string): { data: string[][]; columnCount: number } {
  const lines = csv.split("\n");
  let max = 0;
  let rsp: string[][] = [];
  for (let i = 0; i < lines.length; i++) {
    let row = spliter(lines[i]);
    rsp.push(row);
    if (row.length > max) {
      max = row.length;
    }
  }
  for (let i = 0; i < rsp.length; i++) {
    while (rsp[i].length < max) {
      rsp[i].push("");
    }
  }

  return { data: rsp, columnCount: max };
}

/**
 * spliter - split a line and get context
 * @param {string} line
 * @returns {string[]} array of strings
 */
function spliter(line: string): string[] {
  let fields: string[] = [];
  let field = "";
  let isInQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      isInQuotes = !isInQuotes;
    } else if (char === "," && !isInQuotes) {
      fields.push(field);
      field = "";
    } else {
      field += char;
    }
  }

  fields.push(field); // Add the last field

  return fields;
}

export { csvTablesC };
