# NLP Article Analyzer

## Overview

NLP Article Analyzer is a single-page application. The project enables users to input a valid URL and obtain an evaluation of the article's sentiment.

## Technologies Used

- **Web Server**: Node.js
  - Handles backend server operations and request processing.

- **Web Framework**: Express
  - Manages routing and API handling on the backend.

- **Build Tool**: [Webpack](https://webpack.js.org/)
  - **Development Mode**:
    - Includes Hot Module Replacement (HMR) for real-time updates.
    - Utilizes source maps to simplify debugging.
  - **Production Mode**:
    - Minifies code and optimizes assets for performance.
    - Supports code splitting for faster load times.
    - Integrates service workers for enhanced offline functionality.

- **Service Worker**: 
  - Adds offline capabilities and caching to improve performance.

- **External API**: [MeaningCloud](https://www.meaningcloud.com/)
  - Analyzes and interprets news articles sentiment.

## Getting Started

### Install Dependencies

Navigate to the project directory and install the required npm packages:

```bash
npm install
```

## Scripts

You can use the following npm scripts to manage the project:

- **Start the Server**

  ```bash
  npm run start
  ```

- **Start the Development Server**

  ```bash
  npm run build-dev
  ```

- **Build for Production**

  ```bash
  npm run build-prod
  ```

- **Run Tests**

  ```bash
  npm run test
  ```


## Additional Resources

- [Webpack Documentation](https://webpack.js.org/)
- [MeaningCloud API Documentation](https://www.meaningcloud.com/developer/sentiment-analysis)
