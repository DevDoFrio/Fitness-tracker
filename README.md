# Fitness Tracker

A comprehensive full-stack fitness tracking application for monitoring workouts, nutrition, and health goals.


## Overview

Fitness Tracker is a web application that helps users manage their fitness journey by tracking workouts, logging meals, setting goals, and visualizing progress through interactive analytics. Built with modern web technologies, it features a responsive design and secure authentication.

## Key Features

- **Workout Management**: Log exercises with duration, type, calories burned, and custom notes. Add specific exercises with muscle group targeting and weight tracking
- **Nutrition Tracking**: Record meals with detailed macronutrient breakdown (calories, protein, carbs, fats). Search and add specific foods using the FDA food database, track food items by weight (grams)
- **FDA Food API Integration**: Search real food data for accurate nutritional information with rate-limited API access
- **Goal Setting**: Define personalized fitness goals including calorie targets, macronutrient goals, weekly workout frequency, and weight goals
- **Analytics Dashboard**: Visual progress tracking with charts and statistics
- **User Profiles**: Secure authentication with profile customization

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- React 19
- Tailwind CSS
- Recharts

**Backend**
- Next.js API Routes
- NextAuth.js
- Prisma ORM
- PostgreSQL (Supabase)
- Upstash Redis (rate limiting)
- bcryptjs (password hashing)
- FDA Food API integration


