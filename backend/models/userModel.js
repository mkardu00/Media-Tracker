const { pool } = require("../config/db");

// Kreiranje tablice ako ne postoji
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log("Users table ensured in database");
  } catch (error) {
    console.error("Error ensuring users table:", error);
  }
})();

// Pronalaženje korisnika preko emaila
const findUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

// Dodavanje novog korisnika
const createUser = async (name, email, hashedPassword) => {
  try {
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

module.exports = { findUserByEmail, createUser };
