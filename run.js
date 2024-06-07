const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const client = require('./DBPostgre');

const app = express();
const port = 3300;

app.use(bodyParser.json());

// Koneksi ke database menggunakan pool
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgreNashatra",
    database: "postgres"
});

// Endpoint untuk mendapatkan semua data dari tabel Customers
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM public."Customers"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Books
app.get('/books', (req, res) => {
    pool.query('SELECT * FROM public."Books"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Inventory
app.get('/inventory', (req, res) => {
    pool.query('SELECT * FROM public."Inventory"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Author
app.get('/authors', (req, res) => {
    pool.query('SELECT * FROM public."Author"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Staff
app.get('/staff', (req, res) => {
    pool.query('SELECT * FROM public."Staff"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Reviews
app.get('/reviews', (req, res) => {
    pool.query('SELECT * FROM public."Reviews"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel WishlistItems
app.get('/wishlist-items', (req, res) => {
    pool.query('SELECT * FROM public."WishlistItems"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Wishlists
app.get('/wishlists', (req, res) => {
    pool.query('SELECT * FROM public."Wishlists"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Stores
app.get('/stores', (req, res) => {
    pool.query('SELECT * FROM public."Stores"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Address
app.get('/address', (req, res) => {
    pool.query('SELECT * FROM public."Address"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint untuk mendapatkan semua data dari tabel Sales
app.get('/sales', (req, res) => {
    pool.query('SELECT * FROM public."Sales"', (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// Endpoint root
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// SQL Builder Endpoint
app.post('/sql-builder', (req, res) => {
    const { table, columns, conditions } = req.body;

    let query = `SELECT ${columns.join(', ')} FROM public."${table}"`;
    if (conditions && conditions.length > 0) {
        const conditionStrings = conditions.map(cond => `${cond.column} ${cond.operator} '${cond.value}'`);
        query += ` WHERE ${conditionStrings.join(' AND ')}`;
    }

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            res.status(200).json(result.rows);
        }
    });
});

// DML Endpoint
app.post('/dml', (req, res) => {
    const { query } = req.body;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            // Periksa apakah query adalah SELECT
            if (query.trim().toUpperCase().startsWith("SELECT")) {
                res.status(200).json(result.rows);
            } else {
                res.status(200).send('Query executed successfully');
            }
        }
    });
});


app.delete('/dml', (req, res) => {
    const { query } = req.body;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            const rowCount = result.rowCount;
            res.status(200).send(`Query executed successfully. ${rowCount} rows affected.`);
        }
    });
});

app.put('/dml', (req, res) => {
    const { query } = req.body;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            const rowCount = result.rowCount;
            res.status(200).send(`Query executed successfully. ${rowCount} rows affected.`);
        }
    });
});

app.patch('/dml', (req, res) => {
    const { query } = req.body;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        } else {
            const rowCount = result.rowCount;
            res.status(200).send(`Query executed successfully. ${rowCount} rows affected.`);
        }
    });
});


// TCL Endpoint
app.post('/tcl', async (req, res) => {
    const { queries } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (let query of queries) {
            await client.query(query);
        }
        await client.query('COMMIT');
        res.status(200).send('Transaction committed successfully');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).send('Transaction rolled back due to an error');
    } finally {
        client.release();
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
