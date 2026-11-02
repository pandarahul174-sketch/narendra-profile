-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2026 at 01:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contenthub`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `slug` varchar(300) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `published` tinyint(1) DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `author`, `image`, `published`, `published_at`, `created_at`) VALUES
(1, 'In-House Writers vs Content Agency: What Works Better?', 'in-house-writers-vs-content-agency', 'Growing brands often struggle with execution speed and consistency. Here is what works better for marketing traction.', '<p>Growing brands often struggle more with execution speed and consistency than ideas alone. An agency brings scalability, expertise, and faster turnaround.</p><p>Content agencies offer specialized writers across industries, built-in QA processes, and the flexibility to scale up or down based on your needs.</p>', 'Content Strategy', 'ContentHub Team', NULL, 1, '2026-05-25 09:16:17', '2026-05-25 09:16:17'),
(2, 'How Much Do Content Writing Services Cost in 2026?', 'content-writing-services-cost-2026', 'A comprehensive pricing guide for content writing services in India and globally.', '<p>Content writing services follow a wide pricing range based on complexity, research depth, and word count. Standard rates start from $2 per 100 words.</p>', 'Content Writing', 'ContentHub Team', NULL, 1, '2026-05-25 09:16:17', '2026-05-25 09:16:17'),
(3, 'Why Human Written Content Ranks Higher than AI Content', 'human-written-content-ranks-higher', 'AI enables mass content creation, but human content still wins in search rankings.', '<p>Human-written content provides depth, nuance, and E-E-A-T signals that search engines and AI answer engines prioritize.</p>', 'Content Writing', 'ContentHub Team', NULL, 1, '2026-05-25 09:16:17', '2026-05-25 09:16:17'),
(4, 'Blog Post Formatting: A Simple Checklist Before You Publish', 'blog-post-formatting-checklist', 'A quick formatting review can make or break your blog success.', '<p>Before hitting publish, check headings, meta descriptions, internal links, image alt text, and readability scores.</p>', 'Blog Writing', 'ContentHub Team', NULL, 1, '2026-05-25 09:16:17', '2026-05-25 09:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_inquiries`
--

CREATE TABLE `contact_inquiries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `service` varchar(200) DEFAULT NULL,
  `status` enum('new','read','replied','closed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_inquiries`
--

INSERT INTO `contact_inquiries` (`id`, `name`, `phone`, `email`, `message`, `service`, `status`, `created_at`) VALUES
(1, 'Rahul panda', '07894266108', 'pandarahul174@gmail.com', 'ergheghreh', 'blog writting', 'new', '2026-05-25 09:28:32');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` longtext NOT NULL,
  `category` varchar(100) DEFAULT 'General',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `sort_order`, `created_at`) VALUES
(1, 'Why should I invest in professional content writing services?', 'Content brings 3x more leads than traditional marketing. Professional writers create high-quality, SEO-optimized content that engages your audience while you focus on core business.', 'General', 1, '2026-05-25 09:15:43'),
(2, 'What types of content do you specialize in?', 'We specialize in website content, blog posts, SEO articles, press releases, case studies, whitepapers, ebooks, and social media content.', 'Services', 2, '2026-05-25 09:15:43'),
(3, 'How do you ensure content quality?', 'Our three-tier process includes skilled writers, thorough research, editing/proofreading, plagiarism checks, and AI detection to ensure 100% original human-written content.', 'Quality', 3, '2026-05-25 09:15:43'),
(4, 'What are your pricing options?', 'Pricing starts from $2 per 100 words depending on complexity. Bulk orders receive attractive discounts. Contact us for a custom quote.', 'Pricing', 4, '2026-05-25 09:15:43'),
(5, 'What is the typical turnaround time?', 'We can deliver 1-2 articles (2000-2500 words) in 1-2 working days. Large projects up to 20,000 words within 48 hours.', 'Delivery', 5, '2026-05-25 09:15:43'),
(6, 'Do you use AI to write content?', 'No. We have a strict policy against AI-generated content. Every piece is human-written and checked with AI detection tools.', 'Quality', 6, '2026-05-25 09:15:43'),
(7, 'who is nrendra', 'rfjjrwirwe', 'General', 0, '2026-05-25 09:27:26');

-- --------------------------------------------------------

--
-- Table structure for table `industries`
--

CREATE TABLE `industries` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `industries`
--

INSERT INTO `industries` (`id`, `title`, `slug`, `short_description`, `description`, `image`, `sort_order`, `created_at`) VALUES
(1, 'Healthcare & Fitness', 'healthcare-fitness', 'Medical, wellness, and fitness content by industry experts.', NULL, NULL, 1, '2026-05-25 09:15:43'),
(2, 'Real Estate', 'real-estate', 'Property listings, market reports, and real estate marketing copy.', NULL, NULL, 2, '2026-05-25 09:15:43'),
(3, 'Finance & BFSI', 'finance', 'Financial services content that builds trust and compliance.', NULL, NULL, 3, '2026-05-25 09:15:43'),
(4, 'Technology & SaaS', 'technology', 'Tech blogs, product docs, and SaaS marketing content.', NULL, NULL, 4, '2026-05-25 09:15:43'),
(5, 'Travel & Hospitality', 'travel', 'Destination guides, hotel descriptions, and travel blogs.', NULL, NULL, 5, '2026-05-25 09:15:43'),
(6, 'Fashion & Lifestyle', 'fashion', 'Trend-forward content for fashion and lifestyle brands.', NULL, NULL, 6, '2026-05-25 09:15:43'),
(7, 'Education & EdTech', 'education', 'Educational content and EdTech platform copy.', NULL, NULL, 7, '2026-05-25 09:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `quote_requests`
--

CREATE TABLE `quote_requests` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `service` varchar(200) DEFAULT NULL,
  `word_count` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('new','quoted','accepted','rejected','closed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `samples`
--

CREATE TABLE `samples` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `industry` varchar(100) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `samples`
--

INSERT INTO `samples` (`id`, `title`, `description`, `category`, `industry`, `content`, `image`, `sort_order`, `created_at`) VALUES
(1, 'Healthcare Blog Sample', 'Medical tourism blog post sample', 'Blog', 'Healthcare', 'Sample healthcare blog content demonstrating expertise in medical writing...', NULL, 1, '2026-05-25 09:16:17'),
(2, 'SaaS Product Page', 'SaaS landing page copy sample', 'Web Content', 'Technology', 'Sample SaaS product page with compelling value propositions...', NULL, 2, '2026-05-25 09:16:17'),
(3, 'Finance Whitepaper Excerpt', 'BFSI whitepaper introduction', 'Whitepaper', 'Finance', 'Sample whitepaper introduction on digital banking trends...', NULL, 3, '2026-05-25 09:16:17'),
(4, 'Travel Destination Guide', 'Travel blog sample for destination marketing', 'Blog', 'Travel', 'Sample travel guide showcasing engaging destination content...', NULL, 4, '2026-05-25 09:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `icon` varchar(50) DEFAULT 'FileText',
  `image` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `description`, `icon`, `image`, `featured`, `sort_order`, `created_at`) VALUES
(1, 'Web Content Writing', 'web-content-writing', 'Engaging web content that converts browsers into buyers.', 'Your webpage content is integral to forming a strong bond with your likely customers. We create riveting web content that fuses brand information with a slight sales angle.', 'Globe', NULL, 1, 1, '2026-05-25 09:15:43'),
(2, 'Blog Writing', 'blog-writing', 'SEO-optimized blogs that establish industry authority.', 'Our blog writers infuse the essence of industry leadership in your content with well-researched blogs that address reader queries.', 'BookOpen', NULL, 1, 2, '2026-05-25 09:15:43'),
(3, 'Article Writing', 'article-writing', 'Well-articulated articles packed with rich insights.', 'Our article writers steer clear of waffle content and do deep research to present topics packed with rich insights.', 'FileText', NULL, 1, 3, '2026-05-25 09:15:43'),
(4, 'Press Release Writing', 'press-release-writing', 'High-impact press releases that capture media attention.', 'From product launches to company milestones, we distil your news into powerful, newsworthy content.', 'Newspaper', NULL, 1, 4, '2026-05-25 09:15:43'),
(5, 'SEO Content Writing', 'seo-content-writing', 'Keyword-optimized content that boosts organic traffic.', 'From meticulously researched articles to optimized product pages, our content writers boost your online visibility.', 'Search', NULL, 1, 5, '2026-05-25 09:15:43'),
(6, 'Copywriting', 'copywriting', 'Persuasive copy that drives conversions.', 'Compelling copy for ads, landing pages, and marketing campaigns that speak directly to your audience.', 'PenTool', NULL, 0, 6, '2026-05-25 09:15:43'),
(7, 'Case Study Writing', 'case-study-writing', 'Compelling case studies that showcase your success.', 'Transform client success stories into powerful marketing assets.', 'Briefcase', NULL, 0, 7, '2026-05-25 09:15:43'),
(8, 'Whitepapers Writing', 'whitepapers-writing', 'In-depth whitepapers that establish thought leadership.', 'Authoritative long-form content for B2B lead generation.', 'FileStack', NULL, 0, 8, '2026-05-25 09:15:43'),
(9, 'Ebook Writing', 'ebook-writing', 'Professional ebooks for lead magnets and authority building.', 'Engaging ebook content that educates and converts.', 'BookMarked', NULL, 0, 9, '2026-05-25 09:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`) VALUES
(1, 'site_name', 'ContentHub'),
(2, 'tagline', 'Professional Content Writing Services That Communicate & Convert'),
(3, 'email', 'info@contenthub.com'),
(4, 'phone1', '+91 9960237972'),
(5, 'phone2', '+91 9987585819'),
(6, 'address', 'Mumbai, India'),
(7, 'about_short', 'ContentHub is a leading content writing company delivering SEO-focused, human-written content for brands worldwide.'),
(8, 'about_full', 'We have built significant capabilities as a leading content writing company. With seasoned wordsmiths combining creativity with strategic thinking, we produce content that engages and converts. Our deep understanding of diverse industries allows us to create stories that resonate with your target market.');

-- --------------------------------------------------------

--
-- Table structure for table `site_stats`
--

CREATE TABLE `site_stats` (
  `id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `value` varchar(50) NOT NULL,
  `suffix` varchar(20) DEFAULT '+',
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_stats`
--

INSERT INTO `site_stats` (`id`, `label`, `value`, `suffix`, `sort_order`) VALUES
(1, 'Projects Executed', '500', '+', 1),
(2, 'Years Experience', '15', '+', 2),
(3, 'Websites Optimized', '200', '+', 3),
(4, 'Team Members', '20', '+', 4);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `image` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `company`, `content`, `rating`, `image`, `featured`, `sort_order`, `created_at`) VALUES
(1, 'Mohit M', 'Manager', 'Digital Agency', 'They have fresh and unique content ready for all industries. I have utilized them for SEO articles, blogs, press releases, and website content.', 5, NULL, 1, 1, '2026-05-25 09:15:43'),
(2, 'Vishwas M', 'CEO', 'Tech Startup', 'ContentHub is diligent with its focus on high-quality content. They can add a formal tone or make it witty depending on the target audience.', 5, NULL, 1, 2, '2026-05-25 09:15:43'),
(3, 'Arnab M', 'Manager', 'Healthcare Co', 'They understand the requirement well and spend time on client briefing. There is hardly any iteration on their works.', 5, NULL, 1, 3, '2026-05-25 09:15:43'),
(4, 'Aniket C', 'CTO', 'SEO Agency', 'Their writing charges are pretty nominal, and they also offer bulk volume discounts. Quality benchmarks remain high.', 5, NULL, 1, 4, '2026-05-25 09:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin User', 'admin@contenthub.com', '$2a$10$aLbhFFWR6fTCG45e/drs2eU7fFR4Hui4TsEMqQhzJZnkMGDqBcmwq', 'admin', '2026-05-25 09:15:43'),
(2, 'Demo User', 'user@contenthub.com', '$2a$10$7LJP4okOz1ChGhRs7yRGveddjks93Nb/3i4eoJLleDgm6T9EeLmFm', 'user', '2026-05-25 09:15:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_inquiries`
--
ALTER TABLE `contact_inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industries`
--
ALTER TABLE `industries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `quote_requests`
--
ALTER TABLE `quote_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `samples`
--
ALTER TABLE `samples`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indexes for table `site_stats`
--
ALTER TABLE `site_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_inquiries`
--
ALTER TABLE `contact_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `industries`
--
ALTER TABLE `industries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quote_requests`
--
ALTER TABLE `quote_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `samples`
--
ALTER TABLE `samples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `site_stats`
--
ALTER TABLE `site_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
