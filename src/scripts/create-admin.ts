import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function createAdmin() {
  try {
    // Import modules dynamically after env vars are loaded
    const dbConnect = (await import('../lib/db')).default;
    const User = (await import('../models/User')).default;
    const bcrypt = (await import('bcryptjs')).default;

    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected to database.');

    const email = "diego.longuechaux@gmail.com";
    const password = "DiegoLonguechaux";
    const name = "Diego";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      process.exit(0);
    }

    console.log('Creating user...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully:');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
