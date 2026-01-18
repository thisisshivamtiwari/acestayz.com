# Admin Panel Routes

## Public Routes
- `/admin/login` - Admin Login Page

## Protected Routes (Requires Authentication)
- `/admin` - Dashboard (Overview with statistics and charts)
- `/admin/hotels` - View All Hotels
- `/admin/hotels/manage` - Manage Hotels (Create, Edit, Delete with full details)
- `/admin/bookings` - Bookings Management
- `/admin/users` - Users Management (Create, Edit, Delete)
- `/admin/content/navigation` - Navigation & Cities Management
- `/admin/content/page-builder` - Page Builder (Create custom pages with components)
- `/admin/settings` - Settings (General, Email, Notifications, Payment, Security, Appearance, Maintenance)

## Features by Route

### Dashboard (`/admin`)
- Revenue statistics
- Occupancy rates
- Booking trends
- Property performance
- Recent bookings table
- Interactive charts

### Hotels Management (`/admin/hotels/manage`)
- Create new hotels
- Edit existing hotels
- Delete hotels
- City selection dropdown
- Image upload (drag & drop)
- Room types with meal plans
- Amenities management
- Specialities, policies, nearby attractions
- Check-in/check-out times

### Bookings (`/admin/bookings`)
- View all bookings
- Search and filter bookings
- Booking details view
- Status management
- Payment status tracking

### Users (`/admin/users`)
- Create user accounts
- Edit user information
- Delete users
- Role management (User, Manager, Admin)
- Status management (Active, Inactive, Suspended)

### Navigation Management (`/admin/content/navigation`)
- Manage navigation menu items
- Manage cities dropdown
- Reorder items
- Toggle visibility

### Page Builder (`/admin/content/page-builder`)
- Create custom pages
- Add components (Hero, Hotels, Features, etc.)
- Configure component settings
- Reorder components
- Preview pages
- Toggle component visibility

### Settings (`/admin/settings`)
- General settings (site info, contact details)
- Email configuration
- Notification preferences
- Payment gateway setup
- Security settings
- Appearance customization
- Maintenance mode
- Database backup
- Cache management
- System logs

