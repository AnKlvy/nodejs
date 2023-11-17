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

    res.writeHead(200, { 'Content-Type': 'text/plain;  charset=utf-8' });

  res.end('Привет, клиент!');

  fs.readFile('static_page.html', 'utf8', (err, data) => {
    if (err) {
      console.error(`Ошибка при чтении файла: ${err.message}`);
      res.end('Ошибка чтения файла');
    } else {
      // Отправка HTML-страницы в ответе
      res.end(data);
    }
  });
});

const path = require('path');

function readDirectory(path) {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Ошибка при чтении директории: ${err.message}`);
    } else {
      console.log(`Содержимое директории ${path}:`);

      files.forEach((file) => {
        if (file.isDirectory()) {
          console.log(`[Поддиректория] ${file.name}`);
        } else {
          console.log(`[Файл] ${file.name}`);
        }
      });
    }
  });
}

const directoryPath = __dirname; // Текущая директория
readDirectory(directoryPath);

function deleteFileOrDirectory(targetPath) {
  // Функция для удаления файла или директории
  const deleteRecursive = (currentPath) => {
    if (fs.existsSync(currentPath)) {
      if (fs.statSync(currentPath).isDirectory()) {
        fs.readdirSync(currentPath).forEach((file) => {
          const filePath = path.join(currentPath, file);
          deleteRecursive(filePath);
        });
        fs.rmdirSync(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    }
  };

  // Вызов функции для удаления файла или директории
  deleteRecursive(targetPath);
}

// Пример использования функции с указанием пути к файлу или директории
const targetPath = 'dir';

deleteFileOrDirectory(targetPath);

const port = 8080;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
