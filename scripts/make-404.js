// scripts/make-404.js
import fs from "fs";

const indexPath = "docs/index.html";
const notFoundPath = "docs/404.html";

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log("404.html gerado a partir de index.html");
} else {
  console.error("index.html não encontrado em docs/");
}
