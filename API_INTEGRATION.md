# API Integration Notes

## Current Status: MOCK DATA ACTIVE 🟡

The profile page is currently using mock data for development purposes.

## Backend API Mapping

When ready to connect to the real backend, update these endpoints:

### Frontend Expects:

```javascript
// Current API calls in userApi.ts
GET    /api/user/current     → Get user profile
PATCH  /api/user/current     → Update user profile
PATCH  /api/user/avatar      → Upload user photo
```

### Backend Provides:

```javascript
// Available endpoints in backend
GET    /api/users/me         → Get user profile
PATCH  /api/users/me         → Update user profile
PATCH  /api/users/me/photo   → Upload user photo
```

## Integration Steps:

### 1. Update API endpoints in `lib/api/userApi.ts`:

```javascript
// Change these URLs:
'/user/current'     → '/users/me'
'/user/current'     → '/users/me'
'/user/avatar'      → '/users/me/photo'
```

### 2. Update hook imports in `lib/hooks/useUser.ts`:

```javascript
// Uncomment this line:
import { userApiService } from '../api/userApi';

// Replace mock functions with real API calls:
queryFn: userApiService.getCurrentUser,
mutationFn: userApiService.updateUser,
mutationFn: userApiService.uploadAvatar,
```

### 3. Set environment variables:

```bash
# In .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Start backend server:

```bash
cd ../project-TeamSurvivors
npm install
npm run dev
```

## Mock Data Details:

- **User ID**: 65ca67e7ae7f10c88b598384
- **Name**: Kimi Ant
- **Email**: kimia@example.com
- **Gender**: girl (from enum: "boy", "girl", "")
- **Due Date**: 2025-12-01 (YYYY-MM-DD format)
- **Photo**: https://res.cloudinary.com/demo/image/upload/photo.jpg
- **Realistic delays**: 1s for data fetch, 1.5s for updates, 2s for uploads

## Features Working with Mock Data:

✅ Profile data display ✅ Form validation ✅ User photo upload simulation ✅
Loading states ✅ Success/error toast notifications ✅ Responsive design ✅
Accessibility features

## Next Steps:

1. Complete frontend UI/UX testing with mock data
2. Connect to real backend when ready
3. Test with real authentication
4. Deploy to production
