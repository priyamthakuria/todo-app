# React Todo App

A simple, clean, and responsive Todo application built with React and TypeScript.

## Features

- Add, toggle, and delete todos
- Clear completed todos
- Persistent storage using localStorage
- Responsive design
- Accessible UI with proper ARIA attributes

## Technologies Used

- React
- TypeScript
- CSS Variables for theming
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
src/
├── components/       # React components
│   ├── TodoForm.tsx  # Form for adding new todos
│   ├── TodoItem.tsx  # Individual todo item
│   └── TodoList.tsx  # Main component that manages todos
├── styles/           # CSS styles
│   ├── global.css    # Global styles and CSS variables
│   └── components.css # Component-specific styles
├── App.tsx           # Main App component
└── index.tsx         # Entry point
```

## Build for Production

To build the app for production, run:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` folder.

## License

MIT
