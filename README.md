# notes-crud-google-sheets

Create a notes crud app besed on following: 

- google sheets deployed at https://script.google.com/macros/s/AKfycbzOURGfpPDgS0kNzOATJUzKzYQ-I0Lv87bgEBaDbDvgeaZwIUT1gHbinHoYCtMmHHoe/exec using the spreadapi google apps script. 

Here is some info on its usage: 

API design
SpreadAPI has to deal with limitations imposed by the Google Apps Script engine. There are two limitations that make running a state-of-art REST API impossible in this environment:

Each script can respond only on one hardcoded URL. It can't handle request comming at subpaths like /users or /transactions/15.

Only GET and POST methods are supported.

Due to the these limitations the SpreadAPI script handles only POST requests on a single URL. The actual HTTP method and resource path are provided in request body as shown in the example below:

Copy
{
    "method": "GET",
    "sheet": "users"
}
Other parameters (like payload for POST and PUT  requests) are provided as additional fields in the request body:

Copy
{
    "method": "PUT",
    "sheet": "users",
    "id": "2",
    "payload": {
        "firstname": "John",
        "lastname": "Smith"
    }
}

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/notes-crud-google-sheets.git
cd notes-crud-google-sheets
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
