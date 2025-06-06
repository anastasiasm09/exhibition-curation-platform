# Exhibition Curation Platform

A modern web platform for browsing, filtering, and curating artworks into personalised exhibitions.  
Artworks are retrieved from two public APIs and displayed with features such as infinite scrolling, detailed views, keyword search, and exhibition management.

## Features

- Retrieves artworks from two APIs simultaneously
- Infinite scrolling with error handling
- Artwork detail view with extended information (date, dimensions)
- Filter by classification (e.g. Prints)
- Search by artist name, artwork title, or keywords
- Create, rename, and delete exhibitions
- Add artworks to exhibitions
- Responsive design with mobile support

## Tech Stack

* **React + Vite**
* **Chakra UI**
* **React Router**
* **React Query**

## Getting Started

Follow the steps below to set up and run the project locally.

```bash

1. Clone the repository:

git clone https://github.com/anastasiasm09/exhibition-curation-platform
cd exhibition-curation-platform

2. Configure environment variables
Create a .env file in the root directory and add the following:

VITE_HAM_API_KEY=example-api1

Replace the value with your actual API key or endpoint if required.

3. Install dependencies

npm install
# or
yarn install

4. Start the development server

npm run dev
# or
yarn dev
Open http://localhost:5173 in your browser to view the app.