const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "db-mysql-nyc1-44248-do-user-14618823-0.b.db.ondigitalocean.com",
  port: 25060,
  user: "doadmin",
  password: "123.123.",
  database: "defaultdb",
  connectionLimit: 10, // Adjust the limit as needed
});

// You can export the pool directly for use in other modules
module.exports = pool;

// Optionally, you can test the pool by connecting and querying the database
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");

    // Execute a test query
    connection.query("SELECT 1 + 1 AS result", (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
      } else {
        console.log("Result:", results[0].result);
      }
      // Release the connection back to the pool
      connection.release();
    });
  }
});
