# JSON-Tree-Visualizer
An interactive JSON Tree Visualizer web app that displays JSON data in a hierarchical tree structure with search and highlight functionality

## Follows Container-Presentational Design Pattern

## Component Responsibilities:-

### 1. FlowComponent.jsx
**Type:** Entry Point
**Responsibility:** Simple wrapper that initializes the container

### 2. FlowContainer.jsx
**Type:** Container
**Responsibility:**
- Manages ALL state and business logic
- Passes data and handlers to presentational components

### 3. FlowPresentation.jsx
**Type:** Presentational Component
**Responsibility:**
- Renders the UI structure


### 4. TreeVisualization.jsx
**Type:** Presentational Component
**Responsibility:**
- Renders the ReactFlow tree


## File Structure

```
frontend/src/components/
├── FlowComponent.jsx          # Entry point
├── FlowContainer.jsx          # Container with logic
├── FlowPresentation.jsx       # Presentational UI 
├── TreeVisualization.jsx      # Tree display component
├── JsonInputPanel.jsx      
├── SearchBar.jsx             
```
## Technologies Used

- React - UI framework
- Vite - Build tool and dev server
- React Flow - Tree visualization library
- Tailwind CSS - Styling framework
- html-to-image - Image export functionality

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm 

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timper
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

### Running the Project

To start the development server:
```bash
npm run dev
```

The application will start on `http://localhost:5173` (default Vite port)

### Building the Project

To create a production build:
```bash
npm run build
```
## Features

### Core Features
- **JSON Input & Validation**: Paste or type JSON data with real-time validation
- **Tree Visualization**: Hierarchical node tree with color-coded nodes:
- **Click to Copy Path**: Click any node to instantly copy its JSON path to clipboard
- **Search Functionality**: Search by JSON path
  - Highlights matching nodes in red
  - Shows match count or "No match found" message
- **Download as Image**: Export the tree visualization as a PNG image
- **Clear Functions**:
  - Clear JSON input
  - Clear tree visualization
- **Interactive Controls**:
  - Zoom in/out
  - Pan/drag canvas
  - Fit view
