import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUsersTable, createUser, getUserByEmail } from '@/lib/db';

export async function POST() {
  try {
    await createUsersTable();

    const adminEmail = 'admin@linkup.local';
    const adminPassword = 'admin123'; // Change this in production

    // Check if admin user already exists
    const existingUser = await getUserByEmail(adminEmail);
    if (existingUser) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    const adminUser = await createUser(adminEmail, hashedPassword, 'admin');

    return NextResponse.json({
      message: 'Admin user created successfully',
      email: adminUser.email,
      role: adminUser.role
    });
  } catch (error) {
    console.error('Failed to create admin user:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
