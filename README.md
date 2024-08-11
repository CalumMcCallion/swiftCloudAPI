# SwiftCloud API

SwiftCloud is an API designed for Taylor Swift fans to explore and analyze their music listening trends. It provides various endpoints to query Taylor Swift's music data, such as songs by year, popular songs by month, and custom searches.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Testing](#testing)

## Features

- Retrieve all songs by Taylor Swift.
- Filter songs based on the year they were written.
- Discover the most popular songs by month.
- Search songs based on different criteria such as title, artist, writer, and album.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) and npm (Node Package Manager)

### Installation

1. **Clone the Repository**:

   ```
   git clone https://github.com/CalumMcCallion/swiftCloudAPI.git
   cd SwiftCloud
   ```

2. **Install Dependencies**:

   ```
   npm install
   ```

3. **Run the Server**:

   ```
   node index.js
   ```

   Alternatively, you can use Nodemon for automatic restarts:

   ```
   npx nodemon index.js
   ```

## Testing

This project uses Jest and Supertest for testing the API endpoints.

### Running Tests

1. **Ensure your server is running**:

   - Start the server in a separate terminal window.
     ```
     node index.js
     ```

2. **Run the tests**:

   - Execute the test suite with the following command:
     ```
     npm test
     ```

3. **Test Results**:
   - The results of the tests will be displayed in the terminal, showing passed and failed tests.
