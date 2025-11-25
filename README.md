# Editkaro.in — Complete Website (Front-end)

This project contains a complete front-end website for **Editkaro.in**:
- `index.html` — Home (includes email collector)
- `portfolio.html` — Portfolio (filterable, 12 sample items)
- `about.html` — About page
- `contact.html` — Contact page (form)
- `styles.css` — Shared styles
- `script.js` — Interactivity (filtering, lightbox, forms)
- The project references an uploaded image present at `/mnt/data/Screenshot 2025-11-25 144917.png` as the logo.

## How to run locally

1. Download the project files to a folder.
2. Open `index.html` in a browser. For best results run a local server:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## How to connect forms to Google Sheets (quick guide)

1. Open Google Sheets and create a new sheet.
2. Tools → Script editor → Create an Apps Script with code that accepts POST JSON and writes to the sheet.
3. Deploy the Apps Script as a Web App (Give "Anyone, even anonymous" access if needed for testing).
4. Copy the Web App URL and replace `REPLACE_WITH_YOUR_WEBHOOK_URL` in `script.js` with that URL.
5. Submit the form — the script will receive the JSON and append it to the sheet.

Example Apps Script (paste into editor, replace SHEET_ID and sheet name as needed):

```javascript
function doPost(e){
  try{
    var ss = SpreadsheetApp.openById('INSERT_SPREADSHEET_ID_HERE');
    var sheet = ss.getSheetByName('Sheet1');
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.name || '', data.email || '', data.phone || '', data.message || '']);
    return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:'error', message: err})).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Deployment

- GitHub Pages (static)
- Netlify or Vercel (static)

## Notes

- Replace sample YouTube IDs in `portfolio.html` with your real video IDs.
- Replace webhook placeholder in `script.js` with your Google Apps Script Web App URL to enable form submissions.
