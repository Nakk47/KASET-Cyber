const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Sample data for your pages
const sampleData = {
    // Homepage data
    hero: {
        title: 'Thai Government Servers Hit by',
        highlight: 'Sophisticated APT',
        excerpt: 'A state-sponsored threat actor has breached multiple Thai Ministry networks...',
        meta: 'BREAKING · 2 HOURS AGO · BY SIRIPORN K.',
        articleId: 1
    },
    topStories: [
        { id: 1, category: 'asean', categoryLabel: 'ASEAN', date: 'Mar 04, 2026', title: 'Singapore MAS Fines DBS $2.1M', excerpt: 'The Monetary Authority of Singapore...' },
        { id: 2, category: 'malware', categoryLabel: 'Malware', date: 'Mar 03, 2026', title: 'FakeUpdate Campaign Deploys AMOS', excerpt: 'Researchers identify browser update lures...' },
        { id: 3, category: 'international', categoryLabel: 'International', date: 'Mar 03, 2026', title: 'CISA Mandates Federal Agencies Patch', excerpt: 'An emergency directive orders...' }
    ],
    latestNews: [
        { id: 4, category: 'breach', categoryLabel: 'Data Breach', date: 'Mar 04, 2026', title: 'Kasetsart University Student Database Exposed', meta: 'NATIONAL · BY ARTHIT W.' },
        { id: 5, category: 'asean', categoryLabel: 'ASEAN', date: 'Mar 04, 2026', title: "Vietnam's Ministry Warns of Deepfake Scams", meta: 'ASEAN · BY NGUYEN T.H.' },
        { id: 6, category: 'malware', categoryLabel: 'Malware', date: 'Mar 03, 2026', title: 'BankBot Variant "DragonFin" Targets Thai Banks', meta: 'NATIONAL · BY SIRIPORN K.' }
    ],
    categories: [
        { slug: 'national', icon: '🇹🇭', name: 'National', count: 42 },
        { slug: 'asean', icon: '🌏', name: 'ASEAN', count: 38 },
        { slug: 'international', icon: '🌐', name: 'International', count: 91 }
    ],
    trendingTags: ['APT', 'ransomware', 'CVE-2026', 'NCSA', 'phishing', 'zero-day'],
    threatLevel: 'HIGH',
    threatUpdated: 'Mar 04, 2026 · 06:00 UTC',
    tickerItems: [
        'RANSOMHUB EXFILTRATION DETECTED',
        'META PATCHES WHATSAPP ZERO-DAY',
        'THAI MINISTRY INFRASTRUCTURE UNDER ACTIVE APT INTRUSION',
        'ASEAN CYBER TASKFORCE CONVENES SUMMIT'
    ],
    currentPage: 'home',
    user: null
};

// About page data
const aboutData = {
    pageTitle: 'Frontline Digital Intelligence.',
    pageDescription: 'KASET-NEWS (Cybersecurity Monitoring Division) was founded to bridge the gap between technical threat telemetry and actionable public intelligence in the Thai and ASEAN ecosystem.',
    stats: [
        { label: 'Articles Published', value: '1,200+' },
        { label: 'Monthly Readers', value: '42K+' },
        { label: 'Countries Covered', value: '11' },
        { label: 'Founded', value: '2026' }
    ],
    coverage: [
        { icon: '🇹🇭', title: 'National', description: 'Incidents, policy, and threat intelligence directly affecting Thailand...', highlight: false, iconColor: 'text-slate-500' },
        { icon: '🌐', title: 'International', description: 'Global threat actor activity, critical vulnerability disclosures...', highlight: false, iconColor: 'text-cyan-400' },
        { icon: '🦠', title: 'Malware & Ransomware', description: 'Technical analysis, IOCs, and breakdowns of malware families...', highlight: true, iconColor: 'text-emerald-400' },
        { icon: '🏛️', title: 'Policy & Law', description: 'PDPA enforcement, ETDA regulations, the Cybersecurity Act...', highlight: false, iconColor: 'text-slate-500' }
    ],
    teamMembers: [
        { name: 'Siriporn Kittisak', role: 'Editor-in-Chief', bio: 'Former NCSA analyst. 10+ years in threat intelligence and incident response.' },
        { name: 'Arthit Wongchai', role: 'Senior Reporter', bio: 'Specializes in data breaches, PDPA compliance, and investigative cyber journalism.' },
        { name: 'Nattapong Ruangsri', role: 'Malware Analyst', bio: 'Reverse engineer with expertise in banking trojans and APT tooling across SEA.' },
        { name: 'Priya Suwan', role: 'ASEAN Correspondent', bio: 'Based in Singapore. Covers ASEAN cyber policy and regional incidents.' }
    ],
    currentPage: 'about',
    user: null
};

// Routes
app.get('/', (req, res) => {
    res.render('index', sampleData);
});

app.get('/about', (req, res) => {
    res.render('aboutus', aboutData);
});

app.get('/login', (req, res) => {
    res.render('login', { 
        currentPage: 'login',
        user: null,
        error: null,
        formData: {}
    });
});

app.get('/register', (req, res) => {
    res.render('register', { 
        currentPage: 'register',
        user: null,
        error: null,
        formData: {}
    });
});

app.get('/search', (req, res) => {
    const query = req.query.q || '';
    const filter = req.query.filter || 'all';
    
    // Sample search results
    const results = [
        {
            id: 1,
            category: 'National',
            date: 'Mar 04, 2026',
            title: 'Thai Government Servers Hit by Sophisticated APT Campaign',
            excerpt: 'NCSA confirms data exfiltration from at least three agencies following a 14-week intrusion.',
            author: 'Siriporn K.',
            readTime: 7,
            tagClass: 'text-[#00ff88] bg-[#00ff88]/10 px-1 py-0.5 border border-[#00ff88]/20'
        },
        {
            id: 2,
            category: 'ASEAN',
            date: 'Mar 04, 2026',
            title: 'Singapore MAS Fines DBS $2.1M Over Repeated Failures',
            excerpt: 'Largest-ever penalty following a third system outage in 18 months.',
            author: 'Priya S.',
            readTime: 5,
            tagClass: 'text-[#facc15]'
        }
    ];
    
    res.render('search', {
        currentPage: 'search',
        query: query,
        currentFilter: filter,
        results: results,
        hasMore: false,
        nextPage: 1,
        popularSearches: ['APT', 'zero-day', 'phishing', 'NCSA', 'CVE-2026', 'LockBit', 'deepfake', 'BankBot'],
        user: null
    });
});

app.get('/dashboard', (req, res) => {
    // Sample user data
    const users = [
        { first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male', province: 'Bangkok' },
        { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', gender: 'Female', province: 'Chiang Mai' }
    ];
    
    res.render('userIndex', {
        currentPage: 'dashboard',
        userName: 'Admin',
        users: users,
        searchTerm: ''
    });
});

app.get('/list', (req, res) => {
    const users = [
        { first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male', province: 'Bangkok' },
        { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', gender: 'Female', province: 'Chiang Mai' }
    ];
    
    res.render('list', {
        currentPage: 'list',
        userName: 'Admin',
        users: users
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📄 Homepage: http://localhost:${port}/`);
    console.log(`📄 About: http://localhost:${port}/about`);
    console.log(`📄 Login: http://localhost:${port}/login`);
    console.log(`📄 Register: http://localhost:${port}/register`);
    console.log(`📄 Search: http://localhost:${port}/search`);
    console.log(`📄 Dashboard: http://localhost:${port}/dashboard`);
});