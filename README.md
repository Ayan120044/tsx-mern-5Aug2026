# Star Wars Character App

A responsive React application that displays Star Wars characters using the SWAPI API. Users can browse characters, view their details in a modal, and explore homeworld information.

## Tech Stack

- React
- TypeScript / JavaScript
- Vite
- Tailwind CSS
- Axios

## Features

- Fetches Star Wars characters from the SWAPI API
- Displays characters in responsive cards
- Uses random images from Picsum Photos
- Color-coded cards based on species
- Smooth hover animations
- Character details modal
- Displays:
  - Name
  - Height
  - Mass
  - Birth Year
  - Number of Films
  - Homeworld Information
- Loading state while fetching data
- Error handling with retry option
- Responsive design for mobile, tablet, and desktop

## API Used

- Characters: https://swapi.info/api/people
- Homeworld: Fetched dynamically using the homeworld URL returned by the Characters API.

## Project Structure

```text
src/
│
├── components/
│   ├── CharacterCard
│   ├── CharacterModal
│   ├── Loader
│
├── services/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Go to the project directory.

```bash
cd star-wars-character-app
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Build the project.

```bash
npm run build
```

Preview the production build.

```bash
npm run preview
```

## Screenshots

### Home Page

> Add a screenshot here.

```
assets/screenshots/home.png
```

### Character Details Modal

> Add a screenshot here.

```
assets/screenshots/modal.png
```

## Error Handling

- Handles API request failures gracefully.
- Displays a loading indicator while data is being fetched.
- Shows an error message with a retry button if an API request fails.
- Prevents the application from crashing due to failed requests.

## Coding Practices

This project follows modern React development practices:

- Clean and reusable components
- Separation of concerns
- Reusable API logic
- Proper folder structure
- Readable and maintainable code
- Responsive UI
- Minimal and consistent styling
- Scalable project architecture

## Future Improvements

- Search functionality
- Filtering by species
- Pagination
- Dark/Light theme
- Unit and integration tests

## Author

Muhammad Ayan Alam
