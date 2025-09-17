# WTWR (What to Wear): Weather-Based Clothing Recommendation App

This React application helps users decide what to wear based on the current weather in their city. It fetches real-time weather data, displays temperature and conditions, and allows users to add, view, and manage clothing items tagged by suitable weather. Features include a responsive UI, modal forms, and persistent storage via a local API server.

## Features

- **Weather-Based Recommendations**: Fetches real-time weather data to help users decide what to wear.
- **Clothing Item Management**: Users can add, view, and delete clothing items, each tagged with suitable weather conditions.
- **Temperature Unit Toggle Switch**: Switch between Fahrenheit and Celsius measurement units.
- **Modal Forms**: Clean modal interface for adding new clothing items.
- **React Router Integration**: Supports navigation between different pages or views.
- **Local API Server**: Uses `json-server` for local data persistence and testing.
- **Modern React Stack**: Built with React 18, Vite, and modern best practices.

## API Reference

This app interacts with an Express backend server running at http://localhost:3001. The backend provides both clothing item management and user authentication functionality.

### Authentication Endpoints

| Endpoint    | Method | Description                                | Auth Required |
| :---------- | :----- | :----------------------------------------- | :------------ |
| `/signup`   | POST   | Register a new user account                | No            |
| `/signin`   | POST   | Sign in an existing user                   | No            |
| `/users/me` | GET    | Get current user information               | Yes           |
| `/users/me` | PATCH  | Update current user profile (name, avatar) | Yes           |

### Clothing Items Endpoints

| Endpoint           | Method | Description                                | Auth Required |
| :----------------- | :----- | :----------------------------------------- | :------------ |
| `/items`           | GET    | Fetches all clothing items from the server | No            |
| `/items`           | POST   | Adds a new clothing item to the server     | Yes           |
| `/items/:id`       | DELETE | Deletes a clothing item by its unique \_id | Yes           |
| `/items/:id/likes` | PUT    | Like a clothing item                       | Yes           |
| `/items/:id/likes` | DELETE | Unlike a clothing item                     | Yes           |

#### Authentication Notes:

- Protected endpoints require a valid JWT token in the Authorization header: `Bearer <token>`
- Tokens are stored in localStorage after successful sign-in
- Users can only delete items they own

#### Setup Instructions:

1. Clone and run the Express backend: [se_project_express](https://github.com/eduenez33/se_project_express)
2. Start the backend server on port 3001
3. Start this React app on port 3000

## Screenshots

[![Homepage](https://i.postimg.cc/q7shZ1cx/wtwr-homepage.png)](https://postimg.cc/rdpwDCPD)

[![Item modal](https://i.postimg.cc/gJGX93NF/wtwr-item-modal.png)](https://postimg.cc/TyHYgLzC)

[![Add item modal](https://i.postimg.cc/s2dGckW2/wtwr-add-item-modal.png)](https://postimg.cc/xX5djFtr)

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
- [Express Backend](https://github.com/eduenez33/se_project_express)
