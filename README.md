**Git Repository Organization**:

-   My Git repository is organized with separate directories for the client-side (Angular) and server-side (Node.js and Express).
-   The client-side code is in the src directory within the Angular project.
-   The server-side code is organized into various modules, including user authentication, room management, and chat functionality.
-   I've maintained a clear commit history to track changes during development.

**Data Structures**:

-   In the server, I use data structures like arrays and objects to manage users, rooms, and messages.
-   Users are represented by objects with attributes like username and socket ID.
-   Rooms and channels are managed with arrays containing room details.
-   Messages are structured with sender information, message content, and room association.

**Responsibilities**:

-   The server-side handles user authentication, chat communication, files uploading, group, room and user CRUD functionality
-   The server implements REST API for user, group and room.
-   The server serves static files for the Angular client application.
-   The client-side (Angular) is responsible for rendering the user interface, handling user input, and interacting with the server via WebSocket for real-time chat updates and connection to the rest of the apis (group, room, user).

**Routes**:

**Auth Routes**:

1.  **Register (POST /auth/register)**:

-   **Parameters**: username, email, password, selectedRole (from request body)
-   **Functionality**: Registers a new user.

-   **Returns**:

-   If successful: 201 Created with the registered user details.

-   If email is already in use: 400 Bad Request with an error message.
-   **Description**: Creates a new user, checks email uniqueness, and saves user data to data.json.

1.  **Login (POST /auth/login)**:

-   **Parameters**: email, pwd (from request body)
-   **Functionality**: Logs in a user and returns user details.

-   **Returns**:

-   If successful: 200 OK with user details.

-   If login fails: 401 Unauthorized with an error message.

**Users Routes**:

1.  **Create User (PUT /users/create)**:

-   **Parameters**: None.
-   **Functionality**: Creates a new user.
-   **Expects**: JSON request body containing user information (email, username, role, and password).

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get List of Users (GET /users/list)**:

-   **Parameters**: None.
-   **Functionality**: Retrieves a list of all users.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the list of users.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get User by ID (GET /users/:id)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Retrieves a user by their unique ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the user's information.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Delete User by ID (DELETE /users/:id)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Deletes a user by their unique ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Assign Role to User (POST /users/:id/assign/:roleType)**:

-   **Parameters**: id and roleType (from URL).
-   **Functionality**: Assigns a role to a user by their ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the updated user information.

-   If unsuccessful: 400 Bad Request with an error message.

**Groups Routes**:

1.  **Create Group (PUT /groups/create)**:

-   **Parameters**: None.
-   **Functionality**: Creates a new group.
-   **Expects**: JSON request body with group information (name and memberUserIds).

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get List of Groups (GET /groups/list)**:

-   **Parameters**: None.
-   **Functionality**: Retrieves a list of all groups.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the list of groups.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get Group by ID (GET /groups/:id)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Retrieves a group by its unique ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the group's information.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Delete Group by ID (DELETE /groups/:id)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Deletes a group by its unique ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get Rooms in a Group (GET /groups/:id/rooms)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Retrieves rooms within a group by group ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing room information.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Add Users to a Room in a Group (POST /groups/:id/rooms/:roomId/users)**:

-   **Parameters**: id and roomId (from URL), users (from request body).
-   **Functionality**: Adds users to a room within a group.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Promote User to Group Admin (POST /groups/promote/:userId)**:

-   **Parameters**: userId (from URL).
-   **Functionality**: Promotes a user to a group admin role.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Join a Group (POST /groups/:id/join)**:

-   **Parameters**: id (from URL), userId (from request body).
-   **Functionality**: Allows a user to join a group.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Leave a Group (POST /groups/leave/:groupId)**:

-   **Parameters**: groupId (from URL), userId (from request body).
-   **Functionality**: Allows a user to leave a group.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get Group Members (GET /groups/:groupId/members)**:

-   **Parameters**: groupId (from URL).
-   **Functionality**: Retrieves all members of a group.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing member information.

-   If unsuccessful: 400 Bad Request with an error message.

**Room Routes**:

1.  **Create a New Room (POST /rooms/create/:groupId)**:

-   **Parameters**: groupId (from URL).
-   **Functionality**: Creates a new room associated with a specific group.
-   **Expects**: JSON request body with room information (name and initial users).

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get List of Rooms (GET /rooms/list)**:

-   **Parameters**: None.
-   **Functionality**: Retrieves a list of all rooms.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the list of rooms.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Get Room by ID (GET /rooms/:id)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Retrieves a room by its unique ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object containing the room's information.

-   If unsuccessful: 400 Bad Request with an error message.

1.  **Delete Room by ID (DELETE /rooms/:id)**:

-   **Parameters**: id (from URL).
-   **Functionality**: Deletes a room by its unique ID.

-   **Returns**:

-   If successful: 200 OK with a JSON object indicating success.

-   If unsuccessful: 400 Bad Request with an error message.

**Client Routes:**

The client contains services that are in charge of connecting to the backend. For this project, I have added one file called HttpService which contains the base url and the CRUD operations. I am calling this service to perform all the endpoint calls.

**Server Architecture**:

For the server architecture, I am using MRC (Model-Route-Controller). To assist with this structure I have implemented Mongoose. This architecture allowed me to separate concerns cleary and minimise the size of my server.js file.

**Angular Architecture**:

-   The Angular application consists of components, services, models, and routes.
-   Components include the main chat interface, user authentication and profile.
-   Services handle WebSocket communication, user authentication, and API requests.
-   Models define the data structures used for messages and user information. For the models I have user Interfaces.
-   Routes manage navigation between different chat rooms and user authentication pages.

**Interaction Between Client and Server**:

-   Client-Server interaction is primarily through HTTP REST APIs for user authentication and data retrieval.
-   WebSocket communication allows for real-time chat updates:

-   When a client sends a message, the server broadcasts it to the appropriate room.
-   Clients subscribe to WebSocket events to receive new messages in real time.

-   The server maintains WebSocket connections for each client to facilitate real-time messaging.
-   Angular components update their views when new messages arrive via WebSocket events
