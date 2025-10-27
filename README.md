# ChicCart E-commerce Frontend

A modern e-commerce landing page built with Next.js 16, TypeScript, and Material UI.

## Features

- **Landing Page**: Beautiful hero section with call-to-action
- **Featured Categories**: Showcase of product categories (Dresses, Perfumes, Shoes)
- **Limited Time Offers**: Promotional banner section
- **Authentication**: Login and Register dialogs with backend integration
- **Responsive Design**: Fully responsive layout using Material UI Grid
- **Modern UI**: Clean, minimalist design with smooth animations

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Material UI Theme
│   ├── page.tsx                # Main landing page
│   ├── globals.css             # Global styles
│   └── theme-provider.tsx      # Material UI theme configuration
└── components/
    ├── auth/                   # Authentication components
    │   ├── LoginDialog.tsx
    │   └── RegisterDialog.tsx
    ├── header/                 # Header component
    │   └── Header.tsx
    ├── hero/                   # Hero section
    │   └── Hero.tsx
    ├── featured-categories/    # Category showcase
    │   └── FeaturedCategories.tsx
    ├── limited-time-offer/     # Promotional banner
    │   └── LimitedTimeOffer.tsx
    └── footer/                 # Footer component
        └── Footer.tsx
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Backend Integration

The frontend integrates with the NestJS backend running on `http://localhost:3000` with the following endpoints:

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

Make sure your backend server is running before testing authentication features.

## Features in Detail

### Authentication
- Login dialog with email and password
- Register dialog with full user details
- JWT token storage in localStorage
- User session management

### Components
Each section is modularly structured in separate folders:
- **Header**: Navigation, logo, search, cart, and auth buttons
- **Hero**: Main landing banner with CTA
- **Featured Categories**: Product category cards
- **Limited Time Offer**: Promotional banner
- **Footer**: Links and social media icons

### Images
Images are stored in the `public/` folder:
- Logo: `public/logo/`
- Landing page images: `public/landing page img/`

## Technologies Used

- **Next.js 16**: React framework
- **TypeScript**: Type-safe JavaScript
- **Material UI**: React component library
- **Material Icons**: Icon set

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

