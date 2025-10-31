import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Get the current user session
 * Use this in Server Components and API routes
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the current user or redirect to login
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
