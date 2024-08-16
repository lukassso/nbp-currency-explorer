# NBP Currency Explorer

## Overview

NBP Currency Explorer is a web application that displays current exchange rates provided by the National Bank of Poland (NBP) and allows users to analyze historical exchange rate trends. The application is built using React, TypeScript, and Vite, with styling provided by Tailwind CSS and Shadcn/UI.

## Features

- **Currency Table**: Displays a list of currencies with their current exchange rates.
- **Currency Details**: Provides detailed historical data and trends for a selected currency.
- **Currency Conversion**: Convert amounts between PLN and selected currencies using the latest exchange rates.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that helps in developing robust applications.
- **Vite**: Fast development build tool for modern web projects.
- **Shadcn/UI**: UI components built on top of Tailwind CSS.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React Router**: Declarative routing for React applications.
- **Chart.js**: For creating charts to display currency data.

### Utility Libraries

- **Lodash**: Utility functions for data manipulation.
- **Date-fns**: For handling and manipulating dates.

### Testing

Testing has not been implemented yet. We plan to use **Jest**, **React Testing Library**, and **Playwright** for comprehensive testing, including unit, integration, and end-to-end tests. Contributions to set up and implement testing are welcome!

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nbp-currency-explorer
   ```

2. Install dependencies:

   ```bash
   pnpm i
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

## API Reference

The application uses the public [NBP API](https://api.nbp.pl/) to fetch exchange rate data. Below are some of the key endpoints:

- Latest Exchange Rates: /api/exchangerates/tables/A/
- Historical Exchange Rates: /api/exchangerates/rates/A/{code}/{startDate}/{endDate}/

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Deployment Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/e94f903a-9efc-48ba-a4d9-79cc331eaa70/deploy-status)](https://app.netlify.com/sites/nbp-currency-explorer/deploys)

<p align="center" style="padding-top: 50px;">Made with ❤️ for programming</p>
