# Admin Directory

This directory contains all admin-related routes, components, pages, and logic, completely separated from the main application.

## 📁 Directory Structure

```
admin/
├── components/          # Admin-specific components
│   ├── AdminLayout.tsx  # Main layout wrapper with sidebar and header
│   ├── AdminHeader.tsx  # Top navigation header
│   └── AdminSidebar.tsx # Sidebar navigation menu
├── pages/              # Admin page components
│   └── AdminDashboard.tsx # Main dashboard page
├── routes/             # Admin routing configuration
│   └── AdminRouter.tsx # Admin routes definition
├── types/              # TypeScript types and interfaces
│   └── index.ts        # Admin type definitions
└── README.md           # This file
```

## 🗺️ Routes

All admin routes are prefixed with `/admin`:

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin` | `AdminDashboard` | Main dashboard with stats and recent bookings |
| `/admin/hotels` | Hotels Management | All hotels listing |
| `/admin/hotels/new` | Add Hotel | Form to add new hotel |
| `/admin/hotels/rooms` | Rooms Management | Manage hotel rooms |
| `/admin/bookings` | Bookings | Booking management |
| `/admin/users` | Users | User management |
| `/admin/payments` | Payments | Payment tracking |
| `/admin/reports` | Reports | Analytics and reports |
| `/admin/content` | Content Management | Manage website content |
| `/admin/settings` | Settings | Admin settings |

## 🧩 Components

### AdminLayout
Main layout component that wraps all admin pages. Includes:
- Sidebar navigation
- Top header with search and user menu
- Responsive design

### AdminHeader
Top navigation bar with:
- Logo and branding
- Search functionality
- Notifications
- User profile dropdown

### AdminSidebar
Left sidebar navigation with:
- Menu items with icons
- Expandable sub-menus
- Active route highlighting
- Responsive (hidden on mobile)

## 📄 Pages

### AdminDashboard
Main dashboard page featuring:
- Statistics cards (Bookings, Revenue, Hotels, Users)
- Recent bookings table
- Quick access to key features

## 🔧 Usage

The admin routes are integrated into the main `AppRouter`:

```tsx
<Route path="/admin/*" element={<AdminRouter />} />
```

All admin routes are nested under `/admin` and use the `AdminLayout` wrapper.

## 🎨 Styling

Admin components use:
- Tailwind CSS for styling
- Brand color: `#4B9CD3` (blue)
- Consistent spacing and typography
- Responsive design patterns

## 🚀 Adding New Admin Pages

1. Create a new page component in `admin/pages/`
2. Add the route to `admin/routes/AdminRouter.tsx`
3. Add menu item to `AdminSidebar.tsx` if needed
4. Follow existing component patterns and TypeScript types

## 📝 TypeScript Types

Types are defined in `admin/types/index.ts`:
- `AdminUser` - Admin user interface
- `AdminMenuItem` - Menu item structure
- `AdminStats` - Dashboard statistics

## 🔐 Future: Authentication

When implementing authentication:
1. Create `admin/pages/AdminLogin.tsx`
2. Add protected route wrapper
3. Implement auth context/provider
4. Add auth checks to `AdminRouter`



