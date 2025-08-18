# Drive Clone Frontend

A modern, responsive frontend for a Google Drive clone built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication**: Login, signup, and Google OAuth integration
- **File Management**: Upload, organize, and manage files with drag & drop
- **Folder Structure**: Hierarchical folder organization with breadcrumbs
- **File Preview**: Support for images, PDFs, documents, and more
- **Search & Filter**: Powerful search with real-time filtering
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Dark Mode**: Optional dark theme support
- **Real-time Updates**: Live file synchronization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand + React Query
- **UI Components**: Custom components with Lucide React icons
- **File Handling**: React Dropzone for drag & drop
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form with validation
- **Testing**: Jest + React Testing Library

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Setup

Copy the environment template file:

```bash
cp env.local .env.local
```

Then edit `.env.local` with your configuration:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Google OAuth (optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# App Configuration
NEXT_PUBLIC_APP_NAME=DriveClone
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Main dashboard
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   ├── forms/         # Form components
│   ├── layout/        # Layout components
│   └── features/      # Feature-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── store/             # State management
├── types/             # TypeScript type definitions
└── styles/            # Additional styles
```

## 🎨 Component Library

### UI Components

- **Button**: Primary, secondary, outline, and ghost variants
- **Input**: Form inputs with validation states
- **Modal**: Reusable modal component
- **Card**: Content containers with shadows
- **Badge**: Status and category indicators
- **Tooltip**: Hover information display
- **Dropdown**: Context menus and selectors

### Layout Components

- **Sidebar**: Navigation sidebar with collapsible sections
- **Header**: Top navigation bar
- **Footer**: Page footer with links
- **Container**: Responsive content containers
- **Grid**: Flexible grid layouts

### Feature Components

- **FileUpload**: Drag & drop file upload
- **FileGrid**: File display grid with thumbnails
- **FolderTree**: Hierarchical folder navigation
- **SearchBar**: File search with filters
- **Breadcrumbs**: Navigation breadcrumbs
- **FilePreview**: File preview modal

## 🎯 Key Features Implementation

### File Upload

- Drag & drop support
- Multiple file selection
- Progress indicators
- File type validation
- Automatic thumbnail generation

### File Management

- Grid and list view modes
- Bulk operations (select, move, delete)
- Context menus for actions
- Keyboard shortcuts
- File renaming and moving

### Search & Filter

- Real-time search
- Advanced filters (type, size, date)
- Search suggestions
- Recent searches
- Search history

### Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts
- Progressive enhancement
- Performance optimization

## 🔧 Configuration

### Tailwind CSS

Custom configuration with:

- Extended color palette
- Custom animations
- Component classes
- Responsive utilities
- Dark mode support

### Next.js

Optimized for:

- Image optimization
- Code splitting
- Static generation
- API routes
- Middleware

### TypeScript

Strict configuration with:

- Path aliases
- Strict type checking
- Custom type definitions
- Interface contracts

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors

- **Primary**: Blue palette for main actions
- **Secondary**: Gray palette for neutral elements
- **Success**: Green for positive actions
- **Warning**: Yellow for caution states
- **Error**: Red for error states

### Typography

- **Font Family**: Inter (sans-serif)
- **Font Weights**: 300, 400, 500, 600, 700
- **Line Heights**: Optimized for readability
- **Scale**: Consistent size scale

### Spacing

- **Base Unit**: 4px (0.25rem)
- **Scale**: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64

### Shadows

- **Soft**: Subtle elevation
- **Medium**: Moderate depth
- **Strong**: Prominent depth

## 🚀 Performance

### Optimization Strategies

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component and route lazy loading
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Strategic caching strategies

### Monitoring

- **Core Web Vitals**: LCP, FID, CLS tracking
- **Performance Metrics**: Load times, render performance
- **Error Tracking**: Error boundaries and logging
- **Analytics**: User behavior tracking

## 🔒 Security

### Best Practices

- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Sanitized content rendering
- **CSRF Protection**: Token-based protection
- **Secure Headers**: Security headers configuration
- **Authentication**: Secure token handling

## 🌐 Internationalization

### Support

- **Multi-language**: i18n support structure
- **RTL Languages**: Right-to-left support
- **Date Formatting**: Locale-aware dates
- **Number Formatting**: Locale-aware numbers
- **Currency**: Multi-currency support

## 📊 Analytics

### Tracking

- **User Behavior**: Page views, interactions
- **Performance**: Load times, errors
- **Business Metrics**: File uploads, sharing
- **A/B Testing**: Feature flag support

## 🚀 Deployment

### Platforms

- **Vercel**: Recommended (Next.js optimized)
- **Netlify**: Static export support
- **AWS**: S3 + CloudFront
- **Docker**: Containerized deployment

### Environment Variables

Ensure all environment variables are set in production:

- API endpoints
- OAuth credentials
- Analytics keys
- Feature flags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:

- Check the documentation
- Review existing issues
- Create a new issue with detailed information

## 🔮 Roadmap

### Upcoming Features

- **Real-time Collaboration**: Live editing and comments
- **Advanced Sharing**: Link expiration and passwords
- **Mobile App**: React Native companion app
- **Offline Support**: Service worker implementation
- **Advanced Search**: AI-powered search
- **Integration**: Third-party service connections
