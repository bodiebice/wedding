# Wedding Website Setup Guide

## Customizing Your Wedding Details

To personalize this website for your wedding, you'll need to update the following files:

### 1. Wedding Information
Update `/src/app/save-the-date/page.tsx` with your details:
- Couple names (currently "Sarah & Michael")
- Wedding date (currently "June 15, 2025")
- Wedding time (currently "Saturday at 4:00 PM")
- Venue information (currently "The Grand Ballroom, 123 Wedding Lane, Beautiful City, BC V1A 1A1")

### 2. Calendar Event Details
Update `/src/app/_components/CalendarDownload.tsx` with:
- Wedding date and time in UTC format
- Event title
- Event description
- Venue location

### 3. Contact Information
Update contact email in:
- `/src/app/save-the-date/page.tsx` (footer contact)
- `/src/app/success/page.tsx` (contact email)
- `/src/app/layout.tsx` (site metadata)

### 4. Site Metadata
Update `/src/app/layout.tsx` with:
- Your wedding title
- Description for search engines

## Features Included

✅ **Save the Date Page** - Beautiful landing page with wedding details
✅ **Contact Collection** - Form to collect family contact information
✅ **Calendar Integration** - One-click add to Google Calendar and Apple Calendar
✅ **Form Validation** - Client-side validation with error messages
✅ **Success Page** - Confirmation after form submission
✅ **Responsive Design** - Works on mobile and desktop
✅ **Database Storage** - Guest information stored in SQLite database

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npm run db:push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` to see your wedding website!

## Database Schema

The application stores guest information in a SQLite database with the following fields:
- Family name
- Email address
- Phone number
- Complete address (street, city, state/province, postal code)
- Party size (optional)
- RSVP status (for future use)

## Deployment

This is a Next.js application that can be deployed to:
- Vercel (recommended)
- Netlify
- Any hosting service that supports Next.js

Make sure to set up your database connection for production deployment.
