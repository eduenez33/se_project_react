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

This app interacts with a local JSON server running at http://localhost:3001. Below are the available endpoints and their usage.

| Endpoint            | Description                                 |
| :------------------ | :------------------------------------------ |
| `GET /items`        | Fetches all clothing items from the server. |
| `POST /items`       | Adds a new clothing item to the server.     |
| `DELETE /items/:id` | Deletes a clothing item by its unique \_id  |

#### Note:

All endpoints return standard HTTP status codes. The \_id field is used as the unique identifier for each clothing item.

## Screenshots

[![Homepage](https://i.postimg.cc/q7shZ1cx/wtwr-homepage.png)](https://postimg.cc/rdpwDCPD)

[![Item modal](https://i.postimg.cc/gJGX93NF/wtwr-item-modal.png)](https://postimg.cc/TyHYgLzC)

[![Add item modal](https://i.postimg.cc/s2dGckW2/wtwr-add-item-modal.png)](https://postimg.cc/xX5djFtr)

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
