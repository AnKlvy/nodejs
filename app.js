console.log("Hello, Node.js!");

const fs = require('fs');

function readAndPrintFileContent(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Ошибка при чтении файла: ${err.message}`);
    } else {
      console.log('Содержимое файла:');
      console.log(data);
    }
  });
}

function writeToFile(filePath, content) {
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      console.error(`Ошибка при записи в файл: ${err.message}`);
    } else {
      console.log('Данные успешно записаны в файл:', content);
    }
  });
}

filePath='file.txt'
readAndPrintFileContent(filePath);

const newData = 'Новые данные для файла';
writeToFile(filePath, newData);

const http = require('http');

const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.end('Привет, клиент!');
});

const port = 8080;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
