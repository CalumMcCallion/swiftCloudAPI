# SwiftCloud API

SwiftCloud is an API designed for Taylor Swift fans to explore and analyze their music listening trends. It provides various endpoints to query Taylor Swift's music data, such as songs by year, popular songs by month, and custom searches.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

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

4. **Access the API**:
   - The API will be running on `http://localhost:3000`.

## API Endpoints

1. **Get All Songs**

   - **Endpoint**: `/songs`
   - **Method**: `GET`
   - **Description**: Retrieves all songs from the database.
   - **Example Request**:
     ```
     curl -X GET http://localhost:3000/songs
     ```

2. **Get Songs by Year**

   - **Endpoint**: `/songs/:year`
   - **Method**: `GET`
   - **Description**: Retrieves all songs released in the specified year.
   - **URL Parameter**: `:year` (e.g., 2020)
   - **Example Request**:
     ```
     curl -X GET http://localhost:3000/songs/2020
     ```

3. **Get Popular Songs by Month**

   - **Endpoint**: `/popular/songs`
   - **Method**: `GET`
   - **Description**: Retrieves all songs sorted by their play counts in the specified month.
   - **Query Parameter**: `month` (values: `june`, `july`, `august`)
   - **Example Request**:
     ```
     curl -X GET "http://localhost:3000/popular/songs?month=july"
     ```

4. **Search for Songs**
   - **Endpoint**: `/search`
   - **Method**: `GET`
   - **Description**: Searches for songs based on partial matches for song title, artist, writer, and album.
   - **Query Parameters**:
     - `song` (optional): Part of the song title to search for.
     - `artist` (optional): Part of the artist name to search for.
     - `writer` (optional): Part of the writer name to search for.
     - `album` (optional): Part of the album name to search for.
   - **Example Request**:
     ```
     curl -X GET "http://localhost:3000/search?song=Love&artist=Taylor"
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
