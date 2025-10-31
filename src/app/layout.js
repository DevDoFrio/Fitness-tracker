import './globals.css';

export const metadata = {
  title: 'Fitness Tracker',
  description: 'Track your workouts and meals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
