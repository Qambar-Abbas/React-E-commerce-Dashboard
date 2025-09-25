

## E-commerce Dashboard

A lightweight, modular React dashboard scaffold for online stores that provides sales analytics, order management, and customer/product overviews. Built with Vite + React, it uses a mock API and separated hooks/services so UI components can be swapped or restyled independently.
Key features
Sales & revenue charts, category breakdowns, and KPIs (realtime-mock).
Paginated recent orders table with filters and CSV export.
Separated architecture: services (mock API), hooks (data logic), and components/ui (presentational components) for easy styling or design-system replacement.
Tech stack (scaffold)
React, Vite, Recharts, Framer Motion, plain CSS (CSS Modules-friendly).

## Project file tree

```
project-root/
├─ package.json
├─ vite.config.js
├─ index.html
├─ README.md
└─ src/
    ├─ main.jsx
    ├─ App.jsx
    ├─ index.css
    ├─ pages/
    │ └─ Dashboard.jsx
    ├─ services/
    │ └─ api.js
    ├─ hooks/
    │ ├─ useMetrics.js
    │ ├─ useOrders.js
    │ ├─ useProducts.js
    │ └─ useCustomers.js
    └─ components/
        └─ ui/
        ├─ Header.jsx
        ├─ Sidebar.jsx
        ├─ Card.jsx
        ├─ StatCard.jsx
        ├─ ChartCard.jsx
        ├─ Table.jsx
        ├─ TopProducts.jsx
        └─ RecentCustomers.jsx

```

## Screenshots

| Dashboard overview | Orders table |
|---:|:---|
| <a href="./screenshots/screen1-full.png"><img src="./screenshots/screen1.png" alt="Dashboard overview" width="420" /></a> | <a href="./screenshots/screen2-full.png"><img src="./screenshots/screen2.png" alt="Orders table" width="420" /></a> |
| *Figure 1 — Dashboard overview* | *Figure 2 — Orders table* |
