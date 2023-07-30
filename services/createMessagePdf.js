const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");

// Завантаження шрифту
// const fontPath = path.join("./", "fonts", "e-Ukraine", "e-Ukraine-Regular.otf");

// console.log(fontPath);

// const fontData = fs.readFileSync(fontPath);
// const customFont = {
//   type: "truetype",
//   data: fontData,
// };

const createMessagePdf = async (messageData) => {
  const {
    senderName,
    senderEmail,
    recieverLevel,
    recieverDistrict,
    recieverHromada,
    title,
    text,
  } = messageData;

  // Створення нового PDF документу і встановлення шрифту
  const doc = new jsPDF();
  // doc.addFont(customFont.data, "e-Ukraine", "regular");
  // doc.setFont("e-Ukraine"); // Встановлення шрифту "arialunicid0"

  // Додавання інформації до PDF файлу
  doc.setFontSize(14);
  doc.text(`Sender Name: ${senderName}`, 20, 20);
  doc.text(`Sender Email: ${senderEmail}`, 20, 30);
  doc.text(`Receiver Level: ${recieverLevel}`, 20, 40);

  if (recieverDistrict) {
    doc.text(`Receiver District: ${recieverDistrict}`, 20, 50);
  }

  if (recieverHromada) {
    doc.text(`Receiver Hromada: ${recieverHromada}`, 20, 60);
  }

  console.log("here");
  // Додавання тексту "Звернення" перед полем title
  doc.text("Звернення", 20, 70);
  doc.text(`Title: ${title}`, 20, 80);

  doc.text(`Text: ${text}`, 20, 90);

  // Збереження PDF файлу
  const filePath = path.join(__dirname, "e-message.pdf");
  doc.save(filePath);

  return filePath;
};

module.exports = { createMessagePdf };
