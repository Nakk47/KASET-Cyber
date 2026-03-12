import 'dotenv/config'; // Loads variables from .env immediately
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import session from 'express-session';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Session Config (Essential for Security)
app.use(session({
    secret: 'cadt_cyber_secret_key', // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 } // 1 hour session
}));

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));
app.use(expressLayouts);

// Use built-in express parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// IMPORTANT: Serve static HTML files from views folder
// This will allow you to access main.html and search.html directly
app.use(express.static(join(__dirname, 'views')));

// Also serve static files from public folder (for CSS, images, etc.)
app.use(express.static(join(__dirname, 'public')));

app.set('layout', 'templates/mains'); // Set default layout
// app.set('view options', { debug: true });

// ============= SAMPLE DATA FOR EJS ROUTES =============
const tickerItems = [
    'RANSOMHUB EXFILTRATION DETECTED',
    'META PATCHES WHATSAPP ZERO-DAY',
    'THAI MINISTRY INFRASTRUCTURE UNDER ACTIVE APT INTRUSION',
    'ASEAN CYBER TASKFORCE CONVENES SUMMIT'
];

// ============= EJS ROUTES (for .ejs files) =============
app.get('/', (req, res) => {
    res.render('index', {
        currentPage: 'home',
        user: req.session.user || null,
        tickerItems: tickerItems
    });
});

// If you have main.ejs, use this route
app.get('/main-ejs', (req, res) => {
    res.render('main', {
        currentPage: 'main',
        user: req.session.user || null,
        tickerItems: tickerItems
    });
});

// If you have search.ejs, use this route
app.get('/search-ejs', (req, res) => {
    res.render('search', {
        currentPage: 'search',
        user: req.session.user || null,
        query: req.query.q || '',
        results: []
    });
});

app.get('/about', (req, res) => {
    res.render('aboutus', {
        currentPage: 'about',
        user: req.session.user || null
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        currentPage: 'login',
        user: null,
        error: null
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        currentPage: 'register',
        user: null,
        error: null
    });
});

// ============= HTML ROUTES (for .html files) =============
// These routes explicitly serve HTML files

// Serve main.html
app.get('/main', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'main.html'));
});

// Also serve with .html extension
app.get('/main.html', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'main.html'));
});

// Serve search.html
app.get('/search', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'search.html'));
});

app.get('/search.html', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'search.html'));
});

// Serve other HTML files if they exist
app.get('/about.html', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'aboutus.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'register.html'));
});

// ============= USER ROUTES =============
app.use('/', userRoutes);

const PORT = process.env.PORT_APP || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`\n📌 Available HTML pages:`);
    console.log(`   Main page: http://localhost:${PORT}/main`);
    console.log(`   Main.html: http://localhost:${PORT}/main.html`);
    console.log(`   Search page: http://localhost:${PORT}/search`);
    console.log(`   Search.html: http://localhost:${PORT}/search.html`);
    console.log(`   About page: http://localhost:${PORT}/about.html`);
    console.log(`   Login page: http://localhost:${PORT}/login.html`);
    console.log(`   Register page: http://localhost:${PORT}/register.html`);
    console.log(`\n📌 Available EJS pages:`);
    console.log(`   Home: http://localhost:${PORT}/`);
    console.log(`   Main EJS: http://localhost:${PORT}/main.ejs`);
    console.log(`   Search EJS: http://localhost:${PORT}/search.ejs`);
});