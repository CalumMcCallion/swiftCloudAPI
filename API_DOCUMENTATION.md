# SwiftCloud API Documentation

1. **Access the API**:
   - The API will be available at `http://localhost:3000`.

## API Endpoints

### 1. Get All Songs

- **Endpoint**: `/songs`
- **Method**: `GET`
- **Description**: Retrieves all songs from the database.
- **Example Request**:

  ```
  curl -X GET http://localhost:3000/songs
  ```

### 2. Get Songs by Year

- **Endpoint**: `/songs/:year`
- **Method**: `GET`
- **Description**: Retrieves all songs released in the specified year.
- **URL Parameter**: `:year` (e.g., 2020)
- **Example Request**:

  ```
  curl -X GET http://localhost:3000/songs/2020
  ```

### 3. Get Popular Songs by Month

- **Endpoint**: `/popular/songs`
- **Method**: `GET`
- **Description**: Retrieves all songs sorted by their play counts in the specified month.
- **Query Parameter**: `month` (values: `june`, `july`, `august`)
- **Example Request**:

  ```
  curl -X GET "http://localhost:3000/popular/songs?month=july"
  ```

### 4. Search for Songs

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

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request:

- `200 OK`: The request was successful, and the data is returned in the response.
- `400 Bad Request`: The request was invalid or cannot be otherwise served.
- `500 Internal Server Error`: The server encountered an error and could not complete the request.
