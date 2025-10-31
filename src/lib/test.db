// src/lib/test-db.js

import prisma from './prisma.js';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Test query
    const userCount = await prisma.user.count();
    console.log('✅ User count:', userCount);

    console.log('\n🎉 Database is working!');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
