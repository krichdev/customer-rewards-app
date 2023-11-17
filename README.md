# Customer Rewards App

This project is a React-based web application designed to calculate and display customer reward points for a retailer. It showcases a rewards program where customers earn points based on their transaction amounts. The application displays the points earned for each customer per month and the total points over a three-month period.
![Screenshot 2023-11-16 at 2 26 16 PM](https://github.com/krichdev/customer-rewards-app/assets/24707689/af27b595-8c2f-4b6d-bf2c-160b13eb624e)

## Features

- React 18 for building the user interface.
- Tailwind CSS for styling components.
- Custom utility functions to calculate rewards points.
- Displaying data in a table-like structure using Tailwind CSS.
- Simulating asynchronous API calls to fetch transaction data.

## Getting Started

### Prerequisites

- Node.js installed on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/customer-rewards-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd customer-rewards-app
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints and checks for code quality.
- `npm run preview`: Preview the production build.

### Viewing the Application

After running `npm run dev`, open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

## Project Structure

- `src`: Contains the source code for the application.
- `customer_transactions.json`: Contains transaction data

## Coding Challenge Details

This application was built as a response to a coding challenge with the following requirements:

- A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
- Points are earned as follows:
  - 2 points for every dollar spent over $100 in each transaction.
  - 1 point for every dollar spent between $50 and $100 in each transaction.
- The application should calculate reward points earned for each customer per month and the total combined points.

## Contact

Kyle Richardson - [kgrichardson2@gmail.com](mailto:kgrichardson2@gmail.com)

Project Link: [https://github.com/krichdev/customer-rewards-app/](https://github.com/krichdev/customer-rewards-app/)
