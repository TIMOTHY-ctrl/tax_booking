const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL without selecting a database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'tax_booking';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database ${dbName} created or already exists`);

    // Use the database
    await connection.execute(`USE ${dbName}`);
    console.log(`Using database ${dbName}`);

    // Read and execute the schema file
    const schemaPath = path.join(__dirname, '..', 'src', 'db', 'schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log('Executed:', statement.substring(0, 50) + '...');
      }
    }

    console.log('Database schema initialized successfully!');

    // Create a default admin user if none exists
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
    if (users[0].count === 0) {
      const bcrypt = require('bcryptjs');
      const { v4: uuidv4 } = require('uuid');
      
      const adminId = uuidv4();
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await connection.execute(
        'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
        [adminId, 'Admin User', 'admin@taxbooking.com', hashedPassword, 'admin']
      );
      
      console.log('Default admin user created:');
      console.log('Email: admin@taxbooking.com');
      console.log('Password: admin123');
    }

  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;