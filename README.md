# Valorant Statistics Website

A modern, responsive web application that provides detailed statistics and insights about Valorant esports tournaments, teams, agents, and maps.

## Features

### Landing Page
- **Overview Statistics**
  - Total matches played
  - Total teams participating
  - Total agents used
  - Total maps played

- **Top Agent Statistics**
  - Most Picked Agent with detailed stats
  - Most Banned Agent with detailed stats
  - Top 5 Most Picked Agents with team preferences
  - Top 5 Most Banned Agents with team preferences
  - Interactive agent cards showing pick/ban rates and win rates

- **Map Statistics**
  - Most Played Map with detailed stats
  - Map win rates and pick rates
  - Interactive map cards showing match counts and win rates

### Agents Page
- **Comprehensive Agent Statistics**
  - Individual agent cards showing:
    - Total picks and bans
    - Pick and ban rates
    - Win rate
    - Team preferences
  - Role-based filtering
  - Search functionality
  - Sort by various statistics

- **Agent Details Page**
  - Detailed agent statistics
  - Role distribution visualization
  - Team preferences
  - Match history
  - Interactive graphs and charts

### Maps Page
- **Map Statistics Overview**
  - Map cards showing:
    - Total matches played
    - Win rates
    - Pick rates
    - Team preferences
  - Sort by various statistics
  - Search functionality

- **Map Details Page**
  - Detailed map statistics
  - Team performance
  - Agent composition
  - Match history
  - Interactive visualizations

### Teams Page
- **Team Statistics**
  - Team cards showing:
    - Total matches played
    - Win rate
    - Favorite agents
    - Map preferences
  - Pagination
  - Search functionality
  - Sort by various statistics

- **Team Details Page**
  - Detailed team statistics
  - Agent preferences
  - Map performance
  - Match history
  - Interactive graphs and charts

## Navigation

### Main Navigation
- **Home**: Access the landing page with overview statistics
- **Agents**: View all agent statistics and details
- **Maps**: View all map statistics and details
- **Teams**: View all team statistics and details

### Page Navigation
- **Back Button**: Available on all sub-pages to return to the previous page
- **Search**: Available on Agents, Maps, and Teams pages
- **Filters**: Available on Agents page for role-based filtering
- **Sorting**: Available on all list pages to sort by various statistics
- **Pagination**: Available on Teams page for browsing through all teams

### Interactive Elements
- **Cards**: Click on any agent, map, or team card to view detailed statistics
- **Graphs**: Interactive graphs with tooltips for detailed information
- **Filters**: Use role filters on the Agents page to view specific agent types
- **Search**: Use the search bar to find specific agents, maps, or teams

## Technical Features
- Responsive design for all screen sizes
- Mobile-optimized visualizations
- Interactive data visualizations
- Real-time statistics updates
- Modern UI with consistent styling
- Efficient data loading and caching
- Smooth navigation between pages

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion

## Project Structure

- `src/app`: Next.js app router pages and layouts
- `src/components`: Reusable React components
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions and helpers
- `src/hooks`: Custom React hooks
- `src/lib`: Configuration and third-party integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
