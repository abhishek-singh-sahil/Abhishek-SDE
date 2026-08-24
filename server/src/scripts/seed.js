const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {
  Admin,
  SiteSettings,
  SEOSettings,
  Service,
  Skill,
  Project,
  Testimonial,
  SocialLink,
} = require('../models');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pixel-world';

const seedDatabase = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected. Clearing existing collections...');

    await Admin.deleteMany({});
    await SiteSettings.deleteMany({});
    await SEOSettings.deleteMany({});
    await Service.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await SocialLink.deleteMany({});

    console.log('Collections cleared. Starting seed operations...');

    const adminPassword = 'Admin#321';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await Admin.create({
      username: 'Abhisheksinghsahil',
      email: 'abhishek2023gdsc@gmail.com',
      passwordHash,
      role: 'superadmin',
    });
    console.log('✔ Admin account seeded successfully (abhishek2023gdsc@gmail.com / Admin#321)');

    await SiteSettings.create({
      brandName: 'Abhishek Singh Sahil',
      logoText: 'Abhishek Singh Sahil',
      email: 'contact@abhisheksingh.dev',
      phone: '+91 98765 43210',
      location: 'India',
      availabilityStatus: 'Available',
      footerText: 'Abhishek Singh Sahil | Full-Stack Developer & Software Developer',
      heroText: 'Abhishek Singh Sahil',
      heroSubtitle: 'Full-Stack Developer & Software Developer crafting bespoke web applications, custom software, and digital solutions for scaling businesses.',
      currentlyBuilding: 'Premium digital portfolio & Agency framework',
      currentlyLearning: 'WebGPU & Advanced UI Architectures',
    });
    console.log('✔ Site settings seeded successfully');

    await SEOSettings.create({
      siteTitle: 'Abhishek Singh Sahil | Full-Stack Developer & Software Developer',
      defaultDescription: 'Premium software developer portfolio of Abhishek Singh Sahil. We build custom websites, backend APIs, SaaS, and video post-production tools.',
      defaultKeywords: [
        'full stack developer',
        'software development business',
        'react developer',
        'abhishek singh sahil',
        'video editing services',
        'mongodb nodejs developer',
      ],
      defaultOgImage: '/og-image.png',
      robotsTxt: 'User-agent: *\nAllow: /\nSitemap: http://localhost:3000/sitemap.xml',
    });
    console.log('✔ SEO settings seeded successfully');

    const servicesData = [
      {
        name: 'Website Development',
        slug: 'website-development',
        icon: 'Monitor',
        description: 'Responsive, fast, and SEO-friendly websites built with React, Next.js, and modern CSS frameworks.',
        features: ['Mobile-first design', 'SEO optimization built-in', 'Interactive animations', 'Performance-tuned coding'],
        suitableFor: ['Small businesses', 'Portfolio sites', 'Landing pages', 'Local stores'],
        order: 1,
      },
      {
        name: 'Full-Stack Web App Development',
        slug: 'full-stack-web-apps',
        icon: 'Layers',
        description: 'End-to-end web applications with custom frontends, secure user authentication, and scalable databases.',
        features: ['Custom user dashboards', 'Real-time features', 'API integrations', 'Role-based access control'],
        suitableFor: ['SaaS platforms', 'Internal company portals', 'Booking systems'],
        order: 2,
      },
      {
        name: 'Business Websites',
        slug: 'business-websites',
        icon: 'Briefcase',
        description: 'Professional high-converting corporate websites tailored to reflect your brand identity and attract customers.',
        features: ['Professional typography', 'Contact/enquiry wizard', 'Analytics setups', 'Domain/email config'],
        suitableFor: ['Law firms', 'Real estate agents', 'Consultants', 'Agencies'],
        order: 3,
      },
      {
        name: 'Custom Software Development',
        slug: 'custom-software',
        icon: 'Cpu',
        description: 'Tailored desktop or server applications designed specifically to solve your unique business workflow bottlenecks.',
        features: ['Automated script execution', 'Data reporting tools', 'Secure execution environments', 'Cross-platform compatibility'],
        suitableFor: ['Enterprise logistics', 'Niche automation', 'Operations control'],
        order: 4,
      },
      {
        name: 'E-commerce Development',
        slug: 'ecommerce-development',
        icon: 'ShoppingCart',
        description: 'Full-featured online shops with secure product catalogs, cart mechanics, checkout workflows, and Stripe/PayPal APIs.',
        features: ['Product inventory admin', 'Secure payments validation', 'Order tracking panel', 'Coupon & discount engines'],
        suitableFor: ['Retail stores', 'Digital product sellers', 'Subscription boxes'],
        order: 5,
      },
      {
        name: 'API Development & Integration',
        slug: 'api-development',
        icon: 'Link',
        description: 'Clean RESTful or GraphQL APIs built with Node.js/Express.js, featuring thorough security, documentation, and rate-limiting.',
        features: ['JWT/OAuth access controls', 'Detailed schema validation', 'Postman/Swagger docs', 'Performance caching'],
        suitableFor: ['Mobile app backends', 'Third-party plugins', 'System integrations'],
        order: 6,
      },
      {
        name: 'Backend Development',
        slug: 'backend-development',
        icon: 'Terminal',
        description: 'Robust server-side architecture to handle complex business logic, cron jobs, file processing, and massive datasets.',
        features: ['Highly secure middleware', 'Efficient background processes', 'Scalable architecture', 'Logs auditing'],
        suitableFor: ['SaaS scaling', 'High-traffic backends', 'Complex business rules'],
        order: 7,
      },
      {
        name: 'Database Development',
        slug: 'database-development',
        icon: 'Database',
        description: 'Structured database schemas designed for maximum queries efficiency, indices performance, and strict data consistency.',
        features: ['Optimal Mongoose schemas', 'Indexing & query profiling', 'Automatic backups setup', 'Data migration scripts'],
        suitableFor: ['Data-intensive applications', 'Custom report systems', 'Log tracking'],
        order: 8,
      },
      {
        name: 'Website Deployment & Hosting',
        slug: 'website-deployment',
        icon: 'Cloud',
        description: 'Configuring servers on Vercel, Render, Railway, AWS, or VPS with SSL certs, CI/CD pipelines, and automated build flows.',
        features: ['GitHub CI/CD pipelines', 'HTTPS configuration', 'Domain setups', 'Server status alerts'],
        suitableFor: ['New project launches', 'Migrating existing servers', 'Setting up staging envs'],
        order: 9,
      },
      {
        name: 'Website Maintenance',
        slug: 'website-maintenance',
        icon: 'Wrench',
        description: 'Ongoing updates, package audits, security patches, backups validation, and performance optimization checks.',
        features: ['Monthly library audits', 'Database cleanup', 'Server performance tuning', 'Bug fixes standby'],
        suitableFor: ['Busy business owners', 'Mission-critical apps', 'Long-running portals'],
        order: 10,
      },
      {
        name: 'Video Editing',
        slug: 'video-editing',
        icon: 'Video',
        description: 'Polished post-production video editing services for YouTube, reels/TikToks, ads, corporate materials, and events.',
        features: ['Color grading & corrections', 'Pixel-perfect cuts & pacing', 'Audio cleanups & SFX', 'Motion typography'],
        suitableFor: ['Content creators', 'Marketing campaigns', 'Social media profiles'],
        order: 11,
      },
      {
        name: 'Photo/Image Editing',
        slug: 'photo-editing',
        icon: 'Image',
        description: 'High-quality image editing, thumbnail designs, color touch-ups, background cleanups, and customized assets generation.',
        features: ['Thumbnail layouts', 'Background replacements', 'Vector/Pixel logo styling', 'Color enhancements'],
        suitableFor: ['Product catalogs', 'Social media marketing', 'Banner ads'],
        order: 12,
      },
      {
        name: 'AI/API Integration',
        slug: 'ai-api-integration',
        icon: 'Sparkles',
        description: 'Integrating state-of-the-art AI engines like OpenAI, Gemini, Claude, or Stable Diffusion directly into your web applications.',
        features: ['Smart agent chatbots', 'Automated content generators', 'Text analysis', 'Voice-to-text integration'],
        suitableFor: ['Automating support teams', 'AI-assisted workflows', 'Generative web apps'],
        order: 13,
      },
    ];

    await Service.create(servicesData);
    console.log('✔ All 13 services seeded successfully');

    const skillsData = [
      { name: 'JavaScript', level: 'Advanced', category: 'Frontend', icon: 'javascript', description: 'Core language for building interactive elements and scripting browser components.', order: 1 },
      { name: 'React', level: 'Advanced', category: 'Frontend', icon: 'react', description: 'Component-driven frontend UI library for modular UI structures.', order: 2 },
      { name: 'Tailwind CSS', level: 'Advanced', category: 'Frontend', icon: 'tailwind', description: 'Utility-first CSS framework for rapid high-fidelity styling.', order: 3 },
      
      { name: 'Node.js', level: 'Proficient', category: 'Backend', icon: 'nodejs', description: 'High-performance JavaScript runtime environment for backend servers.', order: 4 },
      { name: 'Express.js', level: 'Proficient', category: 'Backend', icon: 'express', description: 'Lightweight REST API framework for Node servers.', order: 5 },
      { name: 'REST APIs', level: 'Proficient', category: 'Backend', icon: 'api', description: 'Structuring endpoints with proper HTTP methods, statuses, and validation schemas.', order: 6 },
      { name: 'Authentication', level: 'Proficient', category: 'Backend', icon: 'auth', description: 'Implementing secure user login, password hashing, and session management.', order: 7 },
      { name: 'Authorization', level: 'Proficient', category: 'Backend', icon: 'shield', description: 'Handling user permissions, access tokens, and route protection.', order: 8 },

      { name: 'MongoDB', level: 'Proficient', category: 'Database', icon: 'mongodb', description: 'NoSQL document database, storing dynamic data collections efficiently.', order: 9 },
      { name: 'Mongoose', level: 'Proficient', category: 'Database', icon: 'mongoose', description: 'Data modeling schemas for validation, relationships, and queries in MongoDB.', order: 10 },

      { name: 'Git', level: 'Proficient', category: 'Tools', icon: 'git', description: 'Distributed version control system for staging, commits, and branch management.', order: 11 },
      { name: 'GitHub', level: 'Proficient', category: 'Tools', icon: 'github', description: 'Hosting repository files, setting up CI/CD actions, and collaboration.', order: 12 },
      { name: 'Deployment', level: 'Familiar', category: 'Tools', icon: 'deployment', description: 'Deploying services on Vercel, Render, Railway, and configuring DNS rules.', order: 13 },
    ];

    await Skill.create(skillsData);
    console.log('✔ Technical inventory skills seeded successfully');

    const projectsData = [
      {
        title: 'Elisa Decor Manufacturing Hub',
        slug: 'elisa-decor',
        description: 'A manufacturing brand website showcasing premium plywood and interior decor solutions for homes and offices.',
        clientName: 'Elisa Decor',
        category: 'Websites',
        tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        coverImage: '/uploads/elisa-decor.png',
        screenshots: [],
        liveUrl: 'https://elisadecor.in',
        githubUrl: 'https://github.com/abhishek-singh-sahil/ElisaDecor',
        completionDate: new Date('2026-08-10'),
        challenges: 'Ensuring high-fidelity asset rendering with fast loading parameters on high-resolution product showcase pages.',
        solution: 'Implemented lazy-loading mechanisms and dynamic responsive grids with image pre-scaling.',
        results: 'Achieved excellent performance metrics and served digital catalogs to corporate and home interior clients.',
        isFeatured: true,
        isPublished: true,
        order: 1,
      },
      {
        title: 'Abhishek SDE Brand Hub',
        slug: 'abhishek-sde',
        description: 'Premium full-stack developer portfolio and client tracking console system.',
        clientName: 'Self-Project',
        category: 'Web Apps',
        tags: ['React', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        coverImage: '/uploads/abhishek-sde.png',
        screenshots: [],
        liveUrl: 'https://abhisheksinghsahil.vercel.app',
        githubUrl: 'https://github.com/abhishek-singh-sahil/Abhishek-SDE',
        completionDate: new Date('2026-08-24'),
        challenges: 'Decoupling large frameworks to deliver a lightweight SPA with clean REST middleware interactions.',
        solution: 'Built modular Express controllers, secure JWT cookie-based authorizations, and structured Tailwind tokens.',
        results: 'Maintains sub-second route rendering and handles absolute secure client communications logs.',
        isFeatured: true,
        isPublished: true,
        order: 2,
      },
      {
        title: 'Thread N Tones Clothing Store',
        slug: 'threadntones',
        description: 'A premium clothing brand e-commerce website for Thread N Tones, featuring collections catalog, payment gateway integration, and relational order management powered by PostgreSQL.',
        clientName: 'Thread N Tones India',
        category: 'E-commerce',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Express.js'],
        coverImage: '/uploads/threadntones.png',
        screenshots: [],
        liveUrl: 'https://threadntones.in',
        githubUrl: 'https://github.com/abhishek-singh-sahil/TNT',
        completionDate: new Date('2026-08-15'),
        challenges: 'Handling concurrent purchase transactions and securing order checkout paths.',
        solution: 'Implemented PostgreSQL relational transactions and robust validation check constraints.',
        results: 'Boosted checkouts speed and supports the live streetwear storefront under threadntones.in and threadntones.shop.',
        isFeatured: true,
        isPublished: true,
        order: 3,
      },
      {
        title: 'Anand Vihar Sweet Shop',
        slug: 'anand-vihar',
        description: 'A premium online storefront and order management portal for Anand Vihar Sweet Shop, allowing customers to order Indian sweets and snacks online with a database inventory built on PostgreSQL.',
        clientName: 'Anand Vihar Sweets',
        category: 'E-commerce',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Express.js'],
        coverImage: '/uploads/anand-vihar.png',
        screenshots: [],
        liveUrl: 'https://anand-vihar.com',
        githubUrl: 'https://github.com/abhishek-singh-sahil/anand-vihar',
        completionDate: new Date('2026-08-02'),
        challenges: 'Integrating shopping carts with real-time stock deductions on highly-demanded seasonal sweet variations.',
        solution: 'Wrote robust PostgreSQL row locks and structured relational schema models.',
        results: 'Enabled customers to order online with automated invoice generations under anand-vihar.com.',
        isFeatured: true,
        isPublished: true,
        order: 4,
      },
      {
        title: 'Hind Furniture ERP Suite',
        slug: 'furniture-erp',
        description: 'A custom Enterprise Resource Planning system built for Hind Furniture to manage factory inventories, customer billing, and wholesale orders.',
        clientName: 'Hind Furniture',
        category: 'Software',
        tags: ['React', 'Express.js', 'MongoDB', 'Chart.js'],
        coverImage: '/uploads/furniture-erp.png',
        screenshots: [],
        liveUrl: 'https://furniture-erp-ten.vercel.app',
        githubUrl: 'https://github.com/abhishek-singh-sahil/Furniture-ERP',
        completionDate: new Date('2026-07-13'),
        challenges: 'Structuring a modular sidebar dashboard tracking nested inventories and multi-stage invoice generations.',
        solution: 'Engineered clean nested database model indexing and responsive sidebar panels.',
        results: 'Optimized stock auditing times by 50% for factory managers.',
        isFeatured: true,
        isPublished: true,
        order: 5,
      },
      {
        title: 'Jayka Restaurant Inventory System',
        slug: 'restaurant-inventory',
        description: 'A cloud inventory and raw materials tracking database system built for Jayka Restaurant to optimize recipe costs and minimize food wastage.',
        clientName: 'Jayka Restaurant',
        category: 'Web Apps',
        tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
        coverImage: '/uploads/restaurant-inventory.png',
        screenshots: [],
        liveUrl: 'https://resturant-inventory.vercel.app',
        githubUrl: 'https://github.com/abhishek-singh-sahil/Resturant-inventory',
        completionDate: new Date('2026-07-09'),
        challenges: 'Managing multi-item recipe ingredient scaling dynamically on database inventory counters.',
        solution: 'Wrote robust MongoDB aggregation pipelines to deduct raw stock counts when complete dishes are sold.',
        results: 'Increased client profit margins by auditing waste variables accurately.',
        isFeatured: true,
        isPublished: true,
        order: 6,
      },
      {
        title: 'LivEvenTkt Booking Hub',
        slug: 'livevent-kt',
        description: 'A dynamic online ticket booking and reservations aggregator for live events with real-time seat mapping.',
        clientName: 'LivEvenTkt',
        category: 'Web Apps',
        tags: ['React', 'Express.js', 'MongoDB', 'REST APIs'],
        coverImage: '/uploads/livevent-kt.png',
        screenshots: [],
        liveUrl: 'https://liveventkt.vercel.app',
        githubUrl: 'https://github.com/abhishek-singh-sahil/liveventkt',
        completionDate: new Date('2026-05-22'),
        challenges: 'Mitigating double-booking anomalies on high-traffic concert bookings.',
        solution: 'Implemented pessimistic document locking mechanisms in mongoose model queries.',
        results: 'Processed over 2,000 reservation tickets cleanly with zero overlap issues.',
        isFeatured: false,
        isPublished: true,
        order: 7,
      },
      {
        title: 'Restaurant Inventory Demo Platform',
        slug: 'restaurant-inventory-demo',
        description: 'A public demo platform simulating recipe costing and restaurant table auditing for prospective clients to evaluate features.',
        clientName: 'Demo / Open Source',
        category: 'Web Apps',
        tags: ['React', 'WebAssembly', 'Rust', 'Vite'],
        coverImage: '/uploads/restaurant-inventory-demo.png',
        screenshots: [],
        liveUrl: 'https://restaurant-inventory-demo-rust.vercel.app',
        githubUrl: 'https://github.com/abhishek-singh-sahil/restaurant-inventory-demo',
        completionDate: new Date('2026-07-15'),
        challenges: 'Integrating WebAssembly binary compilation configurations inside Vite bundlers.',
        solution: 'Utilized custom rust-wasm toolchains combined with Vite bundle split parameters.',
        results: 'Demonstrated 10x faster table indexing times for large mock data datasets.',
        isFeatured: false,
        isPublished: true,
        order: 8,
      }
    ];

    await Project.create(projectsData);
    console.log('✔ Sample portfolio projects seeded successfully');

    const testimonialsData = [
      {
        clientName: 'Alexander Hayes',
        company: 'RetroQuest Ltd.',
        position: 'CTO & Co-founder',
        testimonial: 'The website designed for our shop is stellar. Customers keep commenting on how original the design feels! The code is clean, deployment was smooth, and overall, communication was extremely professional.',
        rating: 5,
        project: 'PixelShop E-Commerce',
        isPublished: true,
      },
      {
        clientName: 'Preeti Sharma',
        company: '8BitMedia Inc.',
        position: 'Head of Content',
        testimonial: 'He understood our specifications perfectly and delivered a fully functional CMS on schedule. Very responsive to edits and highly skilled in both frontend styling and database logic.',
        rating: 5,
        project: 'Voxel CMS Platform',
        isPublished: true,
      },
    ];

    await Testimonial.create(testimonialsData);
    console.log('✔ Testimonials seeded successfully');

    const socialLinksData = [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin', isActive: true },
      { platform: 'GitHub', url: 'https://github.com/yourusername', icon: 'github', isActive: true },
      { platform: 'YouTube', url: 'https://youtube.com/c/yourchannel', icon: 'youtube', isActive: true },
      { platform: 'Email', url: 'mailto:hello@pixelcraft.dev', icon: 'mail', isActive: true },
      { platform: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'phone', isActive: true },
    ];

    await SocialLink.create(socialLinksData);
    console.log('✔ Social link mappings seeded successfully');

    console.log('\n=============================================');
    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('Your database is now fully populated.');
    console.log('=============================================');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding encountered an error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
