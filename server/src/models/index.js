const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema (Clients / General visitors)
const UserSchema = new Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    avatar: { type: String },
    passwordHash: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Admin Schema (Separate Auth)
const AdminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'superadmin' },
  },
  { timestamps: true }
);

// Project Schema
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    clientName: { type: String },
    category: {
      type: String,
      enum: ['Websites', 'Web Apps', 'Software', 'E-commerce', 'Other'],
      required: true,
    },
    tags: [{ type: String }],
    coverImage: { type: String, required: true },
    screenshots: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    videoUrl: { type: String },
    completionDate: { type: Date },
    challenges: { type: String },
    solution: { type: String },
    results: { type: String },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Service Schema
const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    suitableFor: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Skill Schema
const SkillSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
      required: true,
    },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Testimonial Schema
const TestimonialSchema = new Schema(
  {
    clientName: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    testimonial: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    project: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Enquiry Schema
const EnquirySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    guestInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      company: { type: String },
    },
    projectType: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, required: true },
    timeline: { type: String, required: true },
    referenceWebsite: { type: String },
    attachmentUrl: { type: String },
    preferredContact: { type: String, enum: ['Email', 'Phone', 'WhatsApp'], required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'In Progress', 'Completed', 'Rejected', 'Archived'],
      default: 'New',
    },
    adminNotes: { type: String, default: '' },
    timelineEvents: [
      {
        status: { type: String, required: true },
        note: { type: String },
        updatedBy: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Message Schema (General Contact)
const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// BlogPost Schema
const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    publishedAt: { type: Date },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

// SocialLink Schema
const SocialLinkSchema = new Schema(
  {
    platform: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// SiteSettings Schema
const SiteSettingsSchema = new Schema(
  {
    brandName: { type: String, required: true, default: 'PixelDev' },
    logoText: { type: String, required: true, default: 'PIXEL.DEV' },
    email: { type: String, required: true, default: 'admin@pixeldev.com' },
    phone: { type: String, default: '' },
    location: { type: String, default: 'New Delhi, India' },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Busy', 'On Vacation'],
      default: 'Available',
    },
    footerText: { type: String, required: true, default: 'Building digital worlds, one pixel at a time.' },
    heroText: { type: String, required: true, default: 'BUILDING DIGITAL WORLDS, ONE PROJECT AT A TIME.' },
    heroSubtitle: { type: String, required: true, default: 'Full-Stack Developer crafting high-performance websites, custom software, and pixel-perfect applications.' },
    currentlyBuilding: { type: String, default: 'Pixel Universe v2.0' },
    currentlyLearning: { type: String, default: 'Voxel Engine Integration' },
    profileImage: { type: String, default: '' },
  },
  { timestamps: true }
);

// SEOSettings Schema
const SEOSettingsSchema = new Schema(
  {
    siteTitle: { type: String, required: true, default: 'Pixel World | Premium Web & Software Developer' },
    defaultDescription: { type: String, required: true, default: 'Professional portfolio and web development services by a Full-Stack developer specializing in custom software and pixel art aesthetics.' },
    defaultKeywords: [{ type: String }],
    defaultOgImage: { type: String, default: '/og-image.png' },
    robotsTxt: { type: String, default: 'User-agent: *\nAllow: /' },
    googleVerificationId: { type: String, default: '' },
    gaMeasurementId: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model('User', UserSchema),
  Admin: mongoose.model('Admin', AdminSchema),
  Project: mongoose.model('Project', ProjectSchema),
  Service: mongoose.model('Service', ServiceSchema),
  Skill: mongoose.model('Skill', SkillSchema),
  Testimonial: mongoose.model('Testimonial', TestimonialSchema),
  Enquiry: mongoose.model('Enquiry', EnquirySchema),
  Message: mongoose.model('Message', MessageSchema),
  BlogPost: mongoose.model('BlogPost', BlogPostSchema),
  SocialLink: mongoose.model('SocialLink', SocialLinkSchema),
  SiteSettings: mongoose.model('SiteSettings', SiteSettingsSchema),
  SEOSettings: mongoose.model('SEOSettings', SEOSettingsSchema),
};
