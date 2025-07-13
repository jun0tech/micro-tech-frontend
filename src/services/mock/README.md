# Mock Data System

This directory contains mock data and services for demo purposes when real APIs are not available.

## Setup

To enable mock data, create a `.env` file in the project root with:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Mock Data Toggle
# Set to "true" to use mock data for demo purposes when APIs are not available
# Set to "false" to use real API endpoints
VITE_USE_MOCK_DATA=true
```

## Features

- **Automatic Fallback**: Services automatically fall back to mock data if the real API fails
- **Realistic Data**: Mock data includes realistic business scenarios with proper relationships
- **Network Simulation**: Mock services include realistic network delays
- **Easy Toggle**: Switch between mock and real APIs with a single environment variable

## Available Mock Services

### Suppliers
- Complete CRUD operations
- Filtering by category and status
- Realistic supplier data with contact information

### Purchase Orders
- Full purchase order lifecycle
- Multiple items per order
- Different statuses (pending, approved, delivered, etc.)
- Realistic pricing and supplier relationships

### Dashboard
- Summary statistics
- Recent activity feed
- Static project and inventory metrics (since those APIs are available)

### Notifications
- System notifications
- Category filtering
- Read/unread status management

**Note**: Project and Inventory APIs are available, so mock services are not needed for those features.

## Usage

Services automatically detect the environment variable and use mock data when `VITE_USE_MOCK_DATA=true`. If the API fails, services gracefully fall back to mock data and log a warning.

## Demo Credentials

For mock authentication, use:
- Email: `admin@microtech.com`
- Password: `admin` 