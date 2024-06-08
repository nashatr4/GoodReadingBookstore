const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "**********", 
    database: "postgres"
});

client.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

module.exports = client;
