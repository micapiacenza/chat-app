# ChatApp - repo:

https://github.com/micapiacenza/chat-app

## Running the app

Run `ng serve` for a frontend and node server.js under the server dir for the backend.

## Version Control
This app uses github. Contains a main branch where all the development was done. 
For this project no branching approach was adopted. Instead all commites went to main branch. 
Commits and pushes were made often and ONLY when the app was in a working state.

## Data Structure
User:\
Represents a user of your chat application.\
Properties:\
id: A unique identifier for the user.\
username: The username of the user.\
email: The email address of the user.\
password: The password of the user (it's advisable to store a hashed version of the password for security).\
roles: An array of roles assigned to the user (e.g., SuperAdmin, GroupAdmin, User).

Group:\
Represents a chat group within your application.\
Properties:\
id: A unique identifier for the group.\
name: The name of the group.\
admins: An array of users who are administrators of the group.\
channels: An array of channels within the group.\
members: An array of users who are members of the group.\
pendingMembers: An array of users who have requested to join the group but are pending approval.

Channel:\
Represents a chat channel within a group.\
Properties:\
id: A unique identifier for the channel.\
name: The name of the channel.\
groupId: The ID of the group to which this channel belongs.

## REST APIs
To create all the apis I followed a CRUD approach. This allowed me to make sure I was not forgetting any operation
All my apis talk to a json file where I store my data.

Auth Routes:

1.  POST `/api/register`

  -   Parameters: `username`, `email`, `password`, `selectedRole` (from request body)
  -   Functionality: Registers a new user.
  -   Returns:
    -   If successful: `201 Created` with the registered user details.
    -   If email is already in use: `400 Bad Request` with an error message.
  -   Creates a new user, checks email uniqueness, and saves user data to `data.json`.
2.  POST `/api/login`

  -   Parameters: `email`, `pwd` (from request body)
  -   Functionality: Logs in a user and returns user details.
  -   Returns:
    -   If successful: `200 OK` with user details.
    -   If login fails: `401 Unauthorized` with an error message.

Users Routes:

1.  POST `/api/create-user`

  -   Parameters: User object (from request body)
  -   Functionality: Creates a new user.
  -   Returns:
    -   If successful: `200 OK` with the created user details.
    -   If username is already taken: `400 Bad Request` with an error message.
2.  GET `/api/users`

  -   Functionality: Retrieves a list of all users.
  -   Returns: `200 OK` with an array of user details.
3.  GET `/api/users/:id`

  -   Parameters: `id` (user ID)
  -   Functionality: Retrieves a specific user by their ID.
  -   Returns:
    -   If user found: `200 OK` with user details.
    -   If user not found: `404 Not Found` with an error message.
4.  PUT `/api/users/:id`

  -   Parameters: `id` (user ID), updated user object (from request body)
  -   Functionality: Updates a specific user by their ID.
  -   Returns:
    -   If user found and updated: `200 OK` with updated user details.
    -   If user not found: `404 Not Found` with an error message.
5.  DELETE `/api/users/:id`

  -   Parameters: `id` (user ID)
  -   Functionality: Deletes a specific user by their ID.
  -   Returns:
    -   If user found and deleted: `200 OK` with the deleted user details.
    -   If user not found: `404 Not Found` with an error message.

Groups Routes:

1.  POST `/api/create-group`

  -   Parameters: `name`, `admins`, `channels`, `members` (from request body)
  -   Functionality: Creates a new group.
  -   Returns:
    -   If successful: `200 OK` with the created group details.
    -   If group name is already taken: `400 Bad Request` with an error message.
2.  GET `/api/groups`

  -   Functionality: Retrieves a list of all groups.
  -   Returns: `200 OK` with an array of group details.
3.  GET `/api/groups/:groupId`

  -   Parameters: `groupId` (group ID)
  -   Functionality: Retrieves a specific group by its ID.
  -   Returns:
    -   If group found: `200 OK` with group details.
    -   If group not found: `404 Not Found` with an error message.
4.  PUT `/api/groups/:groupId`

  -   Parameters: `groupId` (group ID), updated group object (from request body)
  -   Functionality: Updates a specific group by its ID.
  -   Returns:
    -   If group found and updated: `200 OK` with updated group details.
    -   If group not found: `404 Not Found` with an error message.
5.  DELETE `/api/groups/:groupId`

  -   Parameters: `groupId` (group ID)
  -   Functionality: Deletes a specific group by its ID.
  -   Returns:
    -   If group found and deleted: `200 OK` with the deleted group details.
    -   If group not found: `404 Not Found` with an error message.

Channels Routes:

1.  POST `/api/create-channel`

  -   Parameters: `name`, `groups` (from request body)
  -   Functionality: Creates a new channel.
  -   Returns:
    -   If successful: `200 OK` with the created channel details.
2.  GET `/api/channels`

  -   Functionality: Retrieves a list of all channels.
  -   Returns: `200 OK` with an array of channel details.
3.  PUT `/api/update-channel/:id`

  -   Parameters: `id` (channel ID), updated channel object (from request body)
  -   Functionality: Updates a specific channel by its ID.
  -   Returns:
    -   If channel found and updated: `200 OK` with updated channel details.
    -   If channel not found: `404 Not Found` with an error message.
4.  DELETE `/api/delete-channel/:id`

  -   Parameters: `id` (channel ID)
  -   Functionality: Deletes a specific channel by its ID.
  -   Returns:
    -   If channel found and deleted: `200 OK` with a success message.
    -   If channel not found: `404 Not Found` with an error message.

## Angular Architecture
The angular architectures aims to follow the MVC pattern.
For this project, the MVC pattern is often adapted as follows:

-   The model aspect is represented by classes such as User, Group, and Channel in the provided structure. These classes define the data structures used in the application, constituting a typical representation of the Model in MVC.

-   The view aspect is distributed across various components within the common/components and views folders. Each component, like app-bar.component representing the top app bar or create-account.component for the create account page, assumes responsibility for rendering the UI and handling user interactions.

-   The controller aspect is typically implemented within the components themselves, primarily residing in the component classes (files with the *.component.ts extension). These classes encompass methods and logic for managing user input, making API requests, and updating the data model. For instance, the logic for tasks such as user registration, login, and CRUD operations for users, groups, and channels is commonly implemented within their respective component classes.

-   Services play a crucial role in encapsulating business logic that might not belong directly in the components. In the MVC pattern, these services can be considered part of the Controller layer. In the provided structure, the services directory houses various services, including auth.service.ts, channels.service.ts, group.service.ts, and user.service.ts. These services likely contain logic associated with API calls, data manipulation, and business rules, serving as an integral part of the Controller.

-   Angular's routing module, defined in app-routing.module.ts, assumes a pivotal role in mapping views (components) to different URLs within the application. This module facilitates navigation and governs which components are displayed when different URLs are accessed.

## Server File structure
```plaintext
.
├── server.js
├── data.json
├── groups.json
└── channels.json

```

## Frontend File structure
```plaintext
.
├── app-routing.module.ts
├── app.component.css
├── app.component.html
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
├── common
│   ├── components
│   │   └── app-bar
│   │       ├── app-bar.component.css
│   │       ├── app-bar.component.html
│   │       ├── app-bar.component.spec.ts
│   │       ├── app-bar.component.ts
│   │       └── app-bar.module.ts
│   ├── enums
│   │   └── user-role.enum.ts
│   ├── interfaces
│   │   ├── channel.interface.ts
│   │   ├── group.interface.ts
│   │   └── user.interface.ts
│   └── services
│       ├── auth
│       │   └── auth.service.ts
│       ├── business-logic
│       │   ├── channels.service.spec.ts
│       │   ├── channels.service.ts
│       │   ├── group.service.spec.ts
│       │   ├── group.service.ts
│       │   ├── user.service.spec.ts
│       │   └── user.service.ts
│       └── storage
│           └── storage.service.ts
└── views
├── create-account
│   ├── create-account.component.css
│   ├── create-account.component.html
│   ├── create-account.component.spec.ts
│   ├── create-account.component.ts
│   └── create-account.module.ts
├── documentation
│   └── documentation
│       ├── documentation.component.html
│       ├── documentation.component.scss
│       ├── documentation.component.spec.ts
│       └── documentation.component.ts
├── home
│   ├── home.component.css
│   ├── home.component.html
│   ├── home.component.spec.ts
│   ├── home.component.ts
│   └── home.module.ts
├── login
│   ├── login.component.css
│   ├── login.component.html
│   ├── login.component.spec.ts
│   ├── login.component.ts
│   └── login.module.ts
├── main-chat
│   ├── common
│   │   └── components
│   │       └── expandable-group-card
│   │           ├── expandable-group-card.component.css
│   │           ├── expandable-group-card.component.html
│   │           ├── expandable-group-card.component.spec.ts
│   │           └── expandable-group-card.component.ts
│   ├── main-chat.component.css
│   ├── main-chat.component.html
│   ├── main-chat.component.spec.ts
│   ├── main-chat.component.ts
│   └── main-chat.module.ts
└── profile
├── common
│   └── components
│       └── profile-settings
│           ├── profile-settings.component.css
│           ├── profile-settings.component.html
│           ├── profile-settings.component.spec.ts
│           └── profile-settings.component.ts
├── profile.component.css
├── profile.component.html
├── profile.component.spec.ts
├── profile.component.ts
├── profile.module.ts
└── views
├── create-channel
│   ├── create-channel.component.css
│   ├── create-channel.component.html
│   ├── create-channel.component.spec.ts
│   └── create-channel.component.ts
├── create-group
│   ├── create-group.component.css
│   ├── create-group.component.html
│   ├── create-group.component.spec.ts
│   └── create-group.component.ts
├── create-user
│   └── create-user
│       ├── create-user.component.html
│       ├── create-user.component.scss
│       ├── create-user.component.spec.ts
│       └── create-user.component.ts
├── group-channel-tab-content
│   ├── group-channel-tab-content.component.css
│   ├── group-channel-tab-content.component.html
│   ├── group-channel-tab-content.component.spec.ts
│   └── group-channel-tab-content.component.ts
└── users-tab-content
├── users-tab-content.component.css
├── users-tab-content.component.html
├── users-tab-content.component.spec.ts
└── users-tab-content.component.ts
```

