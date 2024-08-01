import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const codeSnippet = `
  const sheetName = 'Sheet1' // Name of the sheet
  const scriptProp = PropertiesService.getScriptProperties()

  function intialSetup() {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    scriptProp.setProperty('key', activeSpreadsheet.getId())
  }

  function doPost(e) {
    const lock = LockService.getScriptLock()
    lock.tryLock(10000)

    try {
      const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
      const sheet = doc.getSheetByName(sheetName)

      const headers = sheet.getRange(1, 1,
        1, sheet.getLastColumn()).getValues()[0]
      const nextRow = sheet.getLastRow() + 1

      const newRow = headers.map(function (header) {
        return header === 'Date' ? new Date() : e.parameter[header]
      })

      sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

      return ContentService.createTextOutput(JSON.stringify({
        'result': 'success',
        'row': nextRow
      })).setMimeType(ContentService.MimeType.JSON)
    }

    catch (e) {
      return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e })).setMimeType(ContentService.MimeType.JSON)
    }
    finally {
      lock.releaseLock()
    }
  }
`;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-xl text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Google Sheets integration code</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-scroll h-[70vh] w-[60vw]">
          <code>{codeSnippet}</code>
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(codeSnippet)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default Modal;

