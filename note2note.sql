-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2025 at 07:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `note2note`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `target` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `activity_type` enum('management','user_action','system') DEFAULT 'management',
  `status` enum('success','failed','pending') DEFAULT 'success',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`log_id`, `user_id`, `action`, `target`, `details`, `activity_type`, `status`, `created_at`, `updated_at`) VALUES
(17, 1, 'User Updated', 'JohnBryan Cancel', 'Updated fields: FirstName, LastName, MiddleName, Email, Phone, Course, Account_Type, is_Admin, is_active', 'management', 'success', '2025-09-27 07:30:49', '2025-09-27 07:30:49'),
(18, 1, 'User Updated', 'JohnBryan Cancel', 'Updated fields: FirstName, LastName, MiddleName, Email, Phone, Course, Account_Type, is_Admin, is_active', 'management', 'success', '2025-09-27 07:31:01', '2025-09-27 07:31:01'),
(19, 1, 'Report Approve', 'Report #3', 'Report approved - content is appropriate', 'management', 'success', '2025-09-27 07:32:36', '2025-09-27 07:32:36'),
(20, 1, 'Report Remove', 'Report #3', 'Content removed due to policy violation', 'management', 'success', '2025-09-27 07:32:37', '2025-09-27 07:32:37'),
(21, 1, 'Report Warn', 'Report #3', 'User warned about content policy', 'management', 'success', '2025-09-27 07:32:40', '2025-09-27 07:32:40'),
(22, 1, 'Report Delete', 'Report #3', 'Content deleted permanently', 'management', 'success', '2025-09-27 07:32:43', '2025-09-27 07:32:43'),
(23, 1, 'Report False-report', 'Report #3', 'False report - content is appropriate', 'management', 'success', '2025-09-27 07:32:45', '2025-09-27 07:32:45'),
(24, 1, 'Report Approve', 'Report #1', 'Report approved - content is appropriate', 'management', 'success', '2025-09-27 08:03:47', '2025-09-27 08:03:47'),
(25, 1, 'Bulk Report Warn', '1 reports', 'Bulk warning issued for content policy violations', 'management', 'success', '2025-09-27 08:03:52', '2025-09-27 08:03:52'),
(26, 1, 'Bulk Report Warn', '1 reports', 'Bulk warning issued for content policy violations', 'management', 'success', '2025-10-04 19:29:41', '2025-10-04 19:29:41'),
(27, 1, 'User Banned', 'Test Admin', 'User banned by admin', 'management', 'success', '2025-10-04 19:34:00', '2025-10-04 19:34:00'),
(28, 1, 'User Updated', 'bryan cancel', 'Updated fields: FirstName, LastName, MiddleName, Email, Phone, Course, Account_Type, is_Admin, is_active', 'management', 'success', '2025-10-04 19:36:33', '2025-10-04 19:36:33');

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `badge_id` int(11) NOT NULL,
  `badge_name` varchar(100) NOT NULL,
  `badge_description` text NOT NULL,
  `badge_icon` varchar(50) DEFAULT '?',
  `required_points` int(11) DEFAULT 0,
  `required_uploads` int(11) DEFAULT 0,
  `required_validations` int(11) DEFAULT 0,
  `badge_type` enum('achievement','milestone','special') DEFAULT 'achievement',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`badge_id`, `badge_name`, `badge_description`, `badge_icon`, `required_points`, `required_uploads`, `required_validations`, `badge_type`, `is_active`, `created_at`) VALUES
(1, 'First Upload', 'Uploaded your first note', '📝', 0, 1, 0, 'achievement', 1, '2025-09-27 03:09:58'),
(2, 'Top Contributor', 'Consistently contributes quality notes', '⭐', 100, 10, 0, 'milestone', 1, '2025-09-27 03:09:58'),
(3, 'Trusted Sharer', 'Notes validated by instructors', '✅', 50, 5, 3, 'milestone', 1, '2025-09-27 03:09:58'),
(4, 'Community Helper', 'Helped other students with quality content', '🤝', 200, 20, 0, 'milestone', 1, '2025-09-27 03:09:58'),
(5, 'Note Master', 'Uploaded 50+ notes', '📚', 0, 50, 0, 'milestone', 1, '2025-09-27 03:09:58'),
(6, 'Validation Expert', 'Received 20+ instructor validations', '🎓', 0, 0, 20, 'milestone', 1, '2025-09-27 03:09:58'),
(7, 'Popular Author', 'Notes received 100+ upvotes', '🔥', 0, 0, 0, 'milestone', 1, '2025-09-27 03:09:58'),
(8, 'Quality Contributor', 'Maintained high credibility score', '💎', 300, 0, 0, 'milestone', 1, '2025-09-27 03:09:58'),
(9, 'Early Adopter', 'Joined the platform in its early days', '🚀', 0, 0, 0, 'special', 1, '2025-09-27 03:09:58'),
(10, 'Mentor', 'Helped new users get started', '👨‍🏫', 150, 0, 5, 'special', 1, '2025-09-27 03:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `bookmark_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`bookmark_id`, `user_id`, `note_id`, `created_at`) VALUES
(1, 2, 1, '2025-09-27 03:09:58'),
(2, 2, 3, '2025-09-27 03:09:58'),
(3, 2, 6, '2025-09-27 03:09:58'),
(7, 4, 3, '2025-09-27 03:09:58'),
(8, 4, 8, '2025-09-27 03:09:58'),
(9, 4, 1, '2025-09-27 03:09:58'),
(10, 5, 4, '2025-09-27 03:09:58'),
(11, 5, 9, '2025-09-27 03:09:58'),
(13, 6, 5, '2025-09-27 03:09:58'),
(14, 6, 10, '2025-09-27 03:09:58'),
(15, 6, 3, '2025-09-27 03:09:58'),
(16, 7, 1, '2025-09-27 03:09:58'),
(18, 7, 4, '2025-09-27 03:09:58'),
(19, 8, 6, '2025-09-27 03:09:58'),
(21, 8, 8, '2025-09-27 03:09:58'),
(22, 9, 9, '2025-09-27 03:09:58'),
(23, 9, 10, '2025-09-27 03:09:58'),
(24, 9, 1, '2025-09-27 03:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `data_requests`
--

CREATE TABLE `data_requests` (
  `id` int(11) NOT NULL,
  `requester_id` int(11) NOT NULL,
  `target_user_id` int(11) NOT NULL,
  `request_type` enum('notes','profile','statistics','contact_info') NOT NULL,
  `request_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`request_data`)),
  `status` enum('pending','approved','denied','expired') DEFAULT 'pending',
  `response_message` text DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `view_count` int(11) DEFAULT 0,
  `download_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `validation_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `validator_id` int(11) DEFAULT NULL,
  `validated_at` timestamp NULL DEFAULT NULL,
  `validation_notes` text DEFAULT NULL,
  `upvotes` int(11) DEFAULT 0,
  `downvotes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `user_id`, `subject_id`, `title`, `content`, `file_path`, `file_type`, `file_size`, `is_public`, `view_count`, `download_count`, `created_at`, `updated_at`, `validation_status`, `validator_id`, `validated_at`, `validation_notes`, `upvotes`, `downvotes`) VALUES
(1, 2, 7, 'Introduction to Programming', 'Basic concepts of programming including variables, data types, and control structures. This note covers fundamental programming principles that every computer science student should know.', '/uploads/programming_basics.pdf', 'pdf', 2048000, 1, 156, 45, '2025-09-27 03:09:58', '2025-10-04 19:57:24', 'approved', 8, '2024-01-15 02:30:00', NULL, 3, 0),
(3, 4, 9, 'Database Design Principles', 'Fundamental concepts of database design, normalization, and SQL queries. Covers ER modeling, relational algebra, and query optimization.', '/uploads/database_design.pdf', 'pdf', 2560000, 1, 134, 38, '2025-09-27 03:09:58', '2025-09-27 04:45:28', 'pending', NULL, NULL, NULL, 4, 0),
(4, 5, 10, 'Web Development Basics', 'HTML, CSS, and JavaScript fundamentals for web development. Includes responsive design principles and modern web development practices.', '/uploads/web_dev_basics.pdf', 'pdf', 1792000, 1, 98, 29, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 'approved', 8, '2024-01-17 01:15:00', NULL, 9, 1),
(5, 6, 6, 'System Administration', 'Linux commands, user management, and system monitoring techniques. Essential knowledge for system administrators and DevOps engineers.', '/uploads/sysadmin.pdf', 'pdf', 1536000, 1, 67, 18, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 'pending', NULL, NULL, NULL, 4, 0),
(6, 2, 1, 'Technical Writing Guidelines', 'Best practices for technical documentation, report writing, and professional communication in technical fields.', '/uploads/tech_writing.pdf', 'pdf', 1280000, 1, 45, 12, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 'approved', 9, '2024-01-18 08:45:00', NULL, 7, 0),
(8, 4, 3, 'Computer Architecture Notes', 'Detailed notes on computer organization, CPU design, memory hierarchy, and instruction set architecture.', '/uploads/computer_arch.pdf', 'pdf', 2560000, 1, 112, 34, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 'pending', NULL, NULL, NULL, 8, 0),
(9, 5, 4, 'Philippine Music History', 'Comprehensive overview of Philippine musical traditions, instruments, and cultural significance.', '/uploads/ph_music.pdf', 'pdf', 1536000, 1, 56, 15, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 'approved', 9, '2024-01-20 07:20:00', NULL, 6, 0),
(10, 6, 5, 'Capstone Project Planning', 'Guidelines for capstone project development including project management, documentation, and presentation skills.', '/uploads/capstone_planning.pdf', 'pdf', 1792000, 1, 89, 25, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 'approved', 8, '2024-01-21 05:45:00', NULL, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `note_validations`
--

CREATE TABLE `note_validations` (
  `validation_id` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  `validator_id` int(11) NOT NULL,
  `validation_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `validation_notes` text DEFAULT NULL,
  `validated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `note_validations`
--

INSERT INTO `note_validations` (`validation_id`, `note_id`, `validator_id`, `validation_status`, `validation_notes`, `validated_at`, `created_at`) VALUES
(1, 1, 8, 'approved', 'Excellent content with clear explanations and good examples', '2024-01-15 02:30:00', '2025-09-27 03:09:58'),
(3, 4, 8, 'approved', 'Good introduction to web development concepts', '2024-01-17 01:15:00', '2025-09-27 03:09:58'),
(4, 6, 9, 'approved', 'Clear guidelines for technical writing', '2024-01-18 08:45:00', '2025-09-27 03:09:58'),
(6, 9, 9, 'approved', 'Comprehensive coverage of Philippine music history', '2024-01-20 07:20:00', '2025-09-27 03:09:58'),
(7, 10, 8, 'approved', 'Excellent project planning guidelines', '2024-01-21 05:45:00', '2025-09-27 03:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('data_request','system','note_shared','validation','badge_earned','warning','info') NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `is_read` tinyint(1) DEFAULT 0,
  `priority` enum('low','medium','high','urgent') DEFAULT 'medium',
  `expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_settings`
--

CREATE TABLE `notification_settings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email_notifications` tinyint(1) DEFAULT 1,
  `push_notifications` tinyint(1) DEFAULT 1,
  `data_request_notifications` tinyint(1) DEFAULT 1,
  `system_notifications` tinyint(1) DEFAULT 1,
  `note_shared_notifications` tinyint(1) DEFAULT 1,
  `validation_notifications` tinyint(1) DEFAULT 1,
  `badge_notifications` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otp_requests`
--

CREATE TABLE `otp_requests` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp_code` varchar(6) NOT NULL,
  `purpose` enum('signup','password_reset','resend','test') NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `expiry_time` datetime NOT NULL,
  `status` enum('sent','verified','expired','failed') DEFAULT 'sent',
  `verification_attempts` int(11) DEFAULT 0,
  `verified_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otp_requests`
--

INSERT INTO `otp_requests` (`id`, `email`, `otp_code`, `purpose`, `user_name`, `expiry_time`, `status`, `verification_attempts`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, 'brycancel0302@gmail.com', '762449', 'signup', 'JohnBryan Cancel', '2025-09-13 13:25:23', 'failed', 0, NULL, '2025-09-13 19:15:23', '2025-09-13 19:15:24'),
(2, 'brycancel0302@gmail.com', '864341', 'signup', 'bryan cancel', '2025-09-13 13:31:23', 'failed', 0, NULL, '2025-09-13 19:21:23', '2025-09-13 19:21:23'),
(3, 'brycancel0302@gmail.com', '657091', 'signup', 'JohnBryan Cancel', '2025-09-13 13:32:03', 'failed', 0, NULL, '2025-09-13 19:22:03', '2025-09-13 19:22:03'),
(4, 'brycancel0302@gmail.com', '377564', 'signup', 'bryan cancel', '2025-09-13 13:39:38', 'failed', 0, NULL, '2025-09-13 19:29:38', '2025-09-13 19:29:39'),
(5, 'brycancel0302@gmail.com', '444697', 'signup', 'JohnBryan Cancel', '2025-09-13 13:43:01', 'failed', 0, NULL, '2025-09-13 19:33:01', '2025-09-13 19:33:02'),
(6, 'brycancel0302@gmail.com', '453204', 'signup', 'JohnBryan Cancel', '2025-09-13 13:48:58', 'expired', 0, NULL, '2025-09-13 19:38:58', '2025-09-27 13:18:43'),
(7, 'brycancel0302@gmail.com', '340039', 'resend', 'Admin', '2025-09-13 13:48:59', 'expired', 0, NULL, '2025-09-13 19:38:59', '2025-09-27 13:18:43'),
(8, 'nikiimmutable@gmail.com', '183046', 'signup', 'kean buta', '2025-09-13 13:58:11', 'sent', 0, NULL, '2025-09-13 19:48:11', '2025-09-13 19:48:11'),
(9, 'nikiimmutable@gmail.com', '280032', 'resend', 'Admin', '2025-09-13 13:58:13', 'sent', 0, NULL, '2025-09-13 19:48:13', '2025-09-13 19:48:13'),
(10, 'nikiimmutable@gmail.com', '113927', 'password_reset', 'User', '2025-09-13 14:03:42', 'sent', 0, NULL, '2025-09-13 19:53:42', '2025-09-13 19:53:42'),
(11, 'canceljv@students.nu-dasma.edu.ph', '799933', 'signup', 'bryan cancel', '2025-09-13 14:08:26', 'sent', 0, NULL, '2025-09-13 19:58:26', '2025-09-13 19:58:26'),
(12, 'canceljv@students.nu-dasma.edu.ph', '327686', 'resend', 'Admin', '2025-09-13 14:08:27', 'sent', 0, NULL, '2025-09-13 19:58:27', '2025-09-13 19:58:27'),
(13, 'brycancel0302@gmail.com', '137663', 'signup', 'JohnBryan Cancel', '2025-09-13 15:16:18', 'expired', 0, NULL, '2025-09-13 21:06:18', '2025-09-27 13:18:43'),
(14, 'brycancel0302@gmail.com', '239223', 'resend', 'Admin', '2025-09-13 15:16:20', 'expired', 0, NULL, '2025-09-13 21:06:20', '2025-09-27 13:18:43'),
(15, 'cancel.johnbryan@gmail.com', '430373', 'signup', 'bry luci', '2025-09-13 17:07:55', 'sent', 0, NULL, '2025-09-13 22:57:55', '2025-09-13 22:57:55'),
(16, 'cancel.johnbryan@gmail.com', '937174', 'resend', 'Student', '2025-09-13 17:07:56', 'sent', 0, NULL, '2025-09-13 22:57:56', '2025-09-13 22:57:56'),
(17, 'beneimmutable@gmail.com', '987768', 'signup', 'hi Hacker', '2025-09-13 17:15:41', 'sent', 0, NULL, '2025-09-13 23:05:41', '2025-09-13 23:05:41'),
(18, 'beneimmutable@gmail.com', '036440', 'resend', 'Student', '2025-09-13 17:15:42', 'sent', 0, NULL, '2025-09-13 23:05:42', '2025-09-13 23:05:42'),
(19, 'beneimmutable@gmail.com', '226156', 'resend', 'Student', '2025-09-13 17:16:07', 'sent', 0, NULL, '2025-09-13 23:06:07', '2025-09-13 23:06:07'),
(20, 'comendadorjr09@gmail.com', '504561', 'signup', 'Rio scammer', '2025-09-13 17:45:08', 'sent', 0, NULL, '2025-09-13 23:35:08', '2025-09-13 23:35:08'),
(21, 'comendadorjr09@gmail.com', '896499', 'resend', 'Student', '2025-09-13 17:45:09', 'sent', 0, NULL, '2025-09-13 23:35:09', '2025-09-13 23:35:09'),
(22, 'brycancel0302@gmail.com', '705404', 'signup', 'JohnBryan Cancel', '2025-09-27 02:58:21', 'expired', 0, NULL, '2025-09-27 08:48:21', '2025-09-27 13:18:43'),
(23, 'brycancel0302@gmail.com', '599813', 'resend', 'Admin', '2025-09-27 02:58:22', 'expired', 0, NULL, '2025-09-27 08:48:22', '2025-09-27 13:18:43'),
(24, 'brycancel0302@gmail.com', '742414', 'signup', 'bryan cancel', '2025-09-27 07:28:43', 'expired', 0, NULL, '2025-09-27 13:18:43', '2025-09-27 13:18:45'),
(25, 'brycancel0302@gmail.com', '469664', 'resend', 'Admin', '2025-09-27 07:28:45', 'expired', 0, NULL, '2025-09-27 13:18:45', '2025-09-27 13:20:23'),
(26, 'brycancel0302@gmail.com', '137257', 'resend', 'Admin', '2025-09-27 07:30:23', 'expired', 0, NULL, '2025-09-27 13:20:23', '2025-09-27 13:21:14'),
(27, 'brycancel0302@gmail.com', '122448', 'signup', 'bryan cancel', '2025-09-27 07:31:14', 'expired', 0, NULL, '2025-09-27 13:21:14', '2025-09-27 13:21:15'),
(28, 'brycancel0302@gmail.com', '897782', 'resend', 'Admin', '2025-09-27 07:31:15', 'expired', 0, NULL, '2025-09-27 13:21:15', '2025-09-27 13:25:48'),
(29, 'brycancel0302@gmail.com', '476734', 'resend', 'Admin', '2025-09-27 07:35:48', 'expired', 0, NULL, '2025-09-27 13:25:48', '2025-09-27 13:26:06'),
(30, 'brycancel0302@gmail.com', '811575', 'signup', 'bryan cancel', '2025-09-27 07:36:06', 'expired', 0, NULL, '2025-09-27 13:26:06', '2025-09-27 13:26:07'),
(31, 'brycancel0302@gmail.com', '943507', 'resend', 'Admin', '2025-09-27 07:36:07', 'expired', 0, NULL, '2025-09-27 13:26:07', '2025-09-27 13:31:27'),
(32, 'brycancel0302@gmail.com', '563542', 'resend', 'Admin', '2025-09-27 07:41:27', 'expired', 0, NULL, '2025-09-27 13:31:27', '2025-09-27 13:33:07'),
(33, 'brycancel0302@gmail.com', '176073', 'resend', 'Admin', '2025-09-27 07:43:07', 'expired', 0, NULL, '2025-09-27 13:33:07', '2025-09-27 13:34:58'),
(34, 'brycancel0302@gmail.com', '009831', 'resend', 'Admin', '2025-09-27 07:44:58', 'expired', 0, NULL, '2025-09-27 13:34:58', '2025-09-27 13:35:20'),
(35, 'brycancel0302@gmail.com', '334778', 'resend', 'Admin', '2025-09-27 07:45:20', 'expired', 0, NULL, '2025-09-27 13:35:20', '2025-09-27 13:35:49'),
(36, 'brycancel0302@gmail.com', '087959', 'resend', 'Admin', '2025-09-27 07:45:49', 'expired', 0, NULL, '2025-09-27 13:35:49', '2025-09-27 14:13:35'),
(37, 'brycancel0302@gmail.com', '798513', 'signup', 'bryan cancel', '2025-09-27 08:23:35', 'expired', 0, NULL, '2025-09-27 14:13:35', '2025-09-27 14:13:36'),
(38, 'brycancel0302@gmail.com', '778764', 'resend', 'Admin', '2025-09-27 08:23:36', 'expired', 0, NULL, '2025-09-27 14:13:36', '2025-09-27 14:22:47'),
(39, 'brycancel0302@gmail.com', '826899', 'signup', 'bryan cancel', '2025-09-27 08:32:47', 'expired', 0, NULL, '2025-09-27 14:22:47', '2025-09-27 14:22:49'),
(40, 'brycancel0302@gmail.com', '901691', 'resend', 'Admin', '2025-09-27 08:32:49', 'expired', 0, NULL, '2025-09-27 14:22:49', '2025-09-27 14:25:17'),
(41, 'brycancel0302@gmail.com', '795230', 'resend', 'Admin', '2025-09-27 08:35:17', 'expired', 0, NULL, '2025-09-27 14:25:17', '2025-09-27 14:28:57'),
(42, 'brycancel0302@gmail.com', '171436', 'resend', 'Admin', '2025-09-27 08:38:57', 'expired', 0, NULL, '2025-09-27 14:28:57', '2025-09-27 14:33:23'),
(43, 'brycancel0302@gmail.com', '674320', 'resend', 'Admin', '2025-09-27 08:43:23', 'expired', 0, NULL, '2025-09-27 14:33:23', '2025-09-27 14:33:28'),
(44, 'brycancel0302@gmail.com', '855155', 'resend', 'Admin', '2025-09-27 08:43:28', 'expired', 0, NULL, '2025-09-27 14:33:28', '2025-09-27 14:33:29'),
(45, 'brycancel0302@gmail.com', '366918', 'resend', 'Admin', '2025-09-27 08:43:29', 'expired', 0, NULL, '2025-09-27 14:33:29', '2025-09-27 14:33:29'),
(46, 'brycancel0302@gmail.com', '763278', 'resend', 'Admin', '2025-09-27 08:43:29', 'expired', 0, NULL, '2025-09-27 14:33:29', '2025-09-27 14:33:30'),
(47, 'brycancel0302@gmail.com', '682904', 'resend', 'Admin', '2025-09-27 08:43:30', 'expired', 0, NULL, '2025-09-27 14:33:30', '2025-09-27 14:33:30'),
(48, 'brycancel0302@gmail.com', '774472', 'resend', 'Admin', '2025-09-27 08:43:30', 'expired', 0, NULL, '2025-09-27 14:33:30', '2025-09-27 14:33:56'),
(49, 'brycancel0302@gmail.com', '493309', 'signup', 'JohnBryan Cancel', '2025-09-27 08:43:56', 'expired', 0, NULL, '2025-09-27 14:33:56', '2025-09-27 14:33:57'),
(50, 'brycancel0302@gmail.com', '760282', 'resend', 'Admin', '2025-09-27 08:43:57', 'expired', 0, NULL, '2025-09-27 14:33:57', '2025-10-05 03:22:06'),
(51, 'brycancel0302@gmail.com', '595840', 'signup', 'bryan cancel', '2025-10-04 21:32:06', 'expired', 0, NULL, '2025-10-05 03:22:06', '2025-10-05 03:22:08'),
(52, 'brycancel0302@gmail.com', '625594', 'resend', 'Admin', '2025-10-04 21:32:08', 'expired', 0, NULL, '2025-10-05 03:22:08', '2025-10-05 03:23:37'),
(53, 'brycancel0302@gmail.com', '287596', 'resend', 'Admin', '2025-10-04 21:33:37', 'expired', 0, NULL, '2025-10-05 03:23:37', '2025-10-05 03:24:41'),
(54, 'brycancel0302@gmail.com', '008103', 'signup', 'bryan cancel', '2025-10-04 21:34:41', 'verified', 0, '2025-10-05 03:24:50', '2025-10-05 03:24:41', '2025-10-05 03:24:50');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expires_at`, `used`, `created_at`) VALUES
(4, 'brycancel0302@gmail.com', 'fe4d581114c6b9d883140835f5fdbc015d301d0b0398b66c341ca9a4e4be2bf4', '2025-09-13 11:50:03', 1, '2025-09-13 11:29:01'),
(5, 'brycancel0302@gmail.com', 'b5cff55318e33b400ce149d975c00ffa84a1fed934400e6c0c24c82f4223a933', '2025-09-13 11:57:49', 1, '2025-09-13 11:50:03'),
(6, 'nikiimmutable@gmail.com', 'b61eae44a28d68526260461eca8df6a5aafdcb8054b16dd58e578b48c1522e26', '2025-09-13 11:58:02', 1, '2025-09-13 11:53:42'),
(7, 'brycancel0302@gmail.com', 'cd1e0656aa2a57389130b4423401180a4d4caac56f26faab34a3adca409d80f6', '2025-09-13 12:41:46', 1, '2025-09-13 11:57:49'),
(8, 'nikiimmutable@gmail.com', 'f635d880489589fecf8f81258ce4d20e9e7326faaedab2d49fa454e65b04262c', '2025-09-13 06:58:02', 0, '2025-09-13 11:58:02'),
(9, 'canceljv@students.nu-dasma.edu.ph', '916bb25315731f351de6c4fcf57d61116a8eef998916fb6b72a3719735172f71', '2025-09-13 06:59:31', 0, '2025-09-13 11:59:31'),
(10, 'brycancel0302@gmail.com', 'aec65e84cc00f7a675d252022acc84753882e54392210388a84e9d45800a3ace', '2025-09-13 12:44:45', 1, '2025-09-13 12:41:46'),
(11, 'brycancel0302@gmail.com', '894309223379a44099dd47858cf222cc5561e6f089157fd474282979cc7b2266', '2025-09-13 12:46:16', 1, '2025-09-13 12:44:45'),
(12, 'brycancel0302@gmail.com', 'e86c59d6f9065cff891a85e013fa2736ab06b4b498b3f491948364e7892bffa9', '2025-09-13 12:54:09', 1, '2025-09-13 12:46:16'),
(13, 'brycancel0302@gmail.com', 'd041286911950894f4834277fbcb3b9d54d5b7570b8232b61e53da263aeb3276', '2025-09-13 13:00:51', 1, '2025-09-13 12:54:09'),
(14, 'brycancel0302@gmail.com', '9c631907d6e13cbc1f2d7ba757626b854294302a2eaf4147852aba823c557e6d', '2025-09-13 13:07:12', 1, '2025-09-13 13:00:51'),
(15, 'brycancel0302@gmail.com', 'e56833ebab4b3d02a4b374ae1f19b3ee4e6c7c4637b51a5d9808d3803f803d60', '2025-09-13 14:07:38', 1, '2025-09-13 13:07:12'),
(16, 'brycancel0302@gmail.com', '9815b228634f76dc17e8e54a39a6d152ad3cf80af7e90e21bf6fd9de923e9e4f', '2025-09-13 14:14:12', 1, '2025-09-13 14:07:38'),
(17, 'brycancel0302@gmail.com', 'c698c3433f3b72d346c8cdc21b8e6b1ac5339ba05a79f5402e5a2f5c72b573da', '2025-09-13 14:31:08', 1, '2025-09-13 14:14:12'),
(18, 'brycancel0302@gmail.com', '988cac07f347eaba57dec42e54b3aeea7a7c70a336525036e0b6d270a355ac75', '2025-09-13 14:37:44', 1, '2025-09-13 14:31:08'),
(19, 'brycancel0302@gmail.com', 'fb2e7d2068e0503f0315e3079f1f5b57b4d6c9bccad4c3c17c4fde43f232200b', '2025-09-13 14:42:01', 1, '2025-09-13 14:37:44'),
(20, 'brycancel0302@gmail.com', '688e0f41b714d5aa974d2c1d8c6eb5bf3790b33ba1961ba516e1ed1867106b1b', '2025-09-13 14:55:09', 1, '2025-09-13 14:42:01'),
(21, 'brycancel0302@gmail.com', 'd672bff629914c071a618cd77946b649b6bb62386b917feb745c1c2d996f56db', '2025-09-13 15:16:01', 1, '2025-09-13 14:55:09'),
(22, 'brycancel0302@gmail.com', '586047923bd4cc0404190844cf36fb22f665131cc847483777743647e9ee1f43', '2025-09-13 15:32:11', 1, '2025-09-13 15:16:01'),
(23, 'brycancel0302@gmail.com', 'fe7e4262743dff312f58b0a77096f9bcfbd328e0a39f38cbc0887cf5ba3b906b', '2025-09-27 00:40:10', 1, '2025-09-13 15:32:11'),
(24, 'brycancel0302@gmail.com', 'de470908f75ff4c620875e4bb3af85e0ff95aa243bcf657e2a0650043a11613a', '2025-09-27 00:42:33', 1, '2025-09-27 00:40:10'),
(25, 'brycancel0302@gmail.com', 'ddf80e3d1cd5f57c071c349195bd9e1662dfc7799da2758012fcacce8a1e8568', '2025-09-27 00:45:58', 1, '2025-09-27 00:42:33'),
(26, 'brycancel0302@gmail.com', '350948ca40337afe88497dd5da80e1d92fee1d80393ceeb5e9da1406454af967', '2025-09-27 06:36:46', 1, '2025-09-27 00:45:58'),
(27, 'brycancel0302@gmail.com', 'aa6a07b05782cb4ec0372bbd85bbe10ff6209a120c5c66e4d51cb8f3cd6448ad', '2025-09-28 00:36:46', 0, '2025-09-27 06:36:46');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `note_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `report_type` enum('inappropriate_content','spam','copyright_violation','harassment','other') NOT NULL,
  `report_reason` text NOT NULL,
  `report_status` enum('pending','reviewed','resolved','dismissed') DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `handled_by` int(11) DEFAULT NULL,
  `handled_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `reporter_id`, `note_id`, `user_id`, `report_type`, `report_reason`, `report_status`, `admin_notes`, `handled_by`, `handled_at`, `created_at`, `updated_at`) VALUES
(1, 2, 1, NULL, 'inappropriate_content', 'This note contains outdated information and misleading examples', 'reviewed', 'Bulk warning issued for content policy violations', 1, '2025-10-04 19:29:41', '2025-09-27 03:09:58', '2025-10-04 19:29:41'),
(3, 4, 3, NULL, 'copyright_violation', 'Suspected plagiarism from external sources', 'dismissed', 'False report - content is appropriate', 1, '2025-09-27 07:32:45', '2025-09-27 03:09:58', '2025-09-27 07:32:45'),
(4, 5, 4, NULL, 'harassment', 'Inappropriate comments in note discussion', 'resolved', 'Bulk suspension - content removed due to policy violations', 1, '2025-09-27 06:54:11', '2025-09-27 03:09:58', '2025-09-27 06:54:11'),
(5, 6, 5, NULL, 'other', 'Note quality is poor and needs improvement', 'resolved', 'Bulk suspension - content removed due to policy violations', 1, '2025-09-27 06:54:11', '2025-09-27 03:09:58', '2025-09-27 06:54:11');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `subject_code` varchar(20) NOT NULL,
  `subject_description` text DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_name`, `subject_code`, `subject_description`, `course`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Technical Writing', 'GECTW01X', 'Fundamentals of technical writing and documentation', 'General Education', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(2, 'Electronics Laboratory', 'CTELEC1L', 'Hands-on electronics experiments and circuit design', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(3, 'Computer Organization', 'CCOMORG', 'Computer architecture and organization principles', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(4, 'Philippine Culture and Music', 'GEPCM01X', 'Understanding Philippine cultural heritage and music', 'General Education', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(5, 'Capstone Project 1', 'CTAPROJ1', 'Final year project planning and initial implementation', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(6, 'System Administration Lab', 'CTSYSADL', 'Linux system administration and server management', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(7, 'Programming 1', 'CTPROG1', 'Introduction to programming concepts and algorithms', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(8, 'Data Structures', 'CTDATSTR', 'Advanced data structures and algorithms', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(9, 'Database Management', 'CTDATABASE', 'Database design and SQL programming', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(10, 'Web Development', 'CTWEBDEV', 'Frontend and backend web development', 'Computer Technology', 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Course` varchar(100) DEFAULT NULL,
  `Account_Type` enum('Student','Teacher','Admin') DEFAULT 'Student',
  `is_Admin` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `credibility_score` int(11) DEFAULT 0,
  `total_points` int(11) DEFAULT 0,
  `level` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `FirstName`, `LastName`, `MiddleName`, `Email`, `Password`, `Phone`, `Course`, `Account_Type`, `is_Admin`, `is_active`, `created_at`, `updated_at`, `credibility_score`, `total_points`, `level`) VALUES
(1, 'Admin', 'User', 'System', 'admin@notesharing.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456789', 'Computer Science', 'Admin', 1, 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 500, 500, 5),
(2, 'John', 'Doe', 'Michael', 'john.doe@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456790', 'Computer Science', 'Student', 0, 1, '2025-09-27 03:09:58', '2025-09-27 06:46:24', 185, 185, 3),
(4, 'Bob', 'Wilson', 'Robert', 'bob.wilson@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456792', 'Computer Science', 'Student', 0, 1, '2025-09-27 03:09:58', '2025-09-27 05:07:10', 158, 158, 2),
(5, 'Alice', 'Brown', 'Marie', 'alice.brown@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456793', 'Information Technology', 'Student', 0, 1, '2025-09-27 03:09:58', '2025-09-27 06:46:27', 145, 145, 2),
(6, 'Charlie', 'Davis', 'James', 'charlie.davis@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456794', 'Computer Science', 'Student', 0, 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 138, 138, 2),
(7, 'Diana', 'Miller', 'Grace', 'diana.miller@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456795', 'Information Technology', 'Student', 0, 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 125, 125, 2),
(8, 'Professor', 'Johnson', 'William', 'prof.johnson@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456796', 'Computer Science', 'Teacher', 0, 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 300, 300, 4),
(9, 'Dr.', 'Garcia', 'Maria', 'dr.garcia@nu-dasma.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+639123456797', 'Information Technology', 'Teacher', 0, 1, '2025-09-27 03:09:58', '2025-09-27 03:09:58', 280, 280, 4),
(17, 'Test', 'Admin', NULL, 'admin@test.com', '$2y$10$Z2mG7ZPJrSBC4pL3jxCd4uckUAB41FnbB4//1vS47ya2XadRRimuC', NULL, NULL, 'Admin', 1, 0, '2025-10-04 19:20:21', '2025-10-04 19:34:00', 0, 0, 1),
(18, 'Test', 'User', '', 'test@example.com', '$2y$10$4HAP3wZ4dNnJKJ.x80.spuEHab0NjNBgE.plIyEiewMqEeMLDWZTW', '', '', 'Student', 0, 1, '2025-10-04 19:20:53', '2025-10-04 19:20:53', 0, 0, 1),
(20, 'bryan', 'cancel', '', 'brycancel0302@gmail.com', '$2y$10$M19YhMcGgDanTvydaXRgfOX0NZwkk.0mzMgmESNf6soYdvC8fKnQK', '09695673299', '', 'Admin', 1, 1, '2025-10-04 19:24:41', '2025-10-04 19:24:41', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_badges`
--

CREATE TABLE `user_badges` (
  `user_badge_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL,
  `earned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_badges`
--

INSERT INTO `user_badges` (`user_badge_id`, `user_id`, `badge_id`, `earned_at`) VALUES
(1, 2, 1, '2024-01-01 02:00:00'),
(2, 2, 2, '2024-01-10 07:30:00'),
(3, 2, 3, '2024-01-15 01:20:00'),
(7, 4, 1, '2024-01-03 04:00:00'),
(8, 4, 2, '2024-01-14 09:20:00'),
(9, 5, 1, '2024-01-04 05:00:00'),
(10, 5, 2, '2024-01-16 10:30:00'),
(11, 6, 1, '2024-01-05 06:00:00'),
(12, 6, 2, '2024-01-18 11:45:00'),
(13, 7, 1, '2024-01-06 07:00:00'),
(14, 8, 1, '2024-01-07 08:00:00'),
(15, 8, 9, '2024-01-01 00:00:00'),
(16, 9, 1, '2024-01-08 09:00:00'),
(17, 9, 9, '2024-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_points`
--

CREATE TABLE `user_points` (
  `point_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `point_type` enum('upload','upvote_received','downvote_received','validation','bonus','penalty') NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_points`
--

INSERT INTO `user_points` (`point_id`, `user_id`, `points`, `point_type`, `source_id`, `description`, `created_at`) VALUES
(1, 2, 10, 'upload', 1, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(2, 2, 10, 'upload', 6, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(3, 2, 5, 'upvote_received', 1, 'Received +5 points for note upvotes', '2025-09-27 03:09:58'),
(4, 2, 5, 'upvote_received', 6, 'Received +5 points for note upvotes', '2025-09-27 03:09:58'),
(8, 4, 10, 'upload', 3, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(9, 4, 10, 'upload', 8, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(10, 5, 10, 'upload', 4, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(11, 5, 10, 'upload', 9, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(12, 6, 10, 'upload', 5, 'Received +10 points for uploading a note', '2025-09-27 03:09:58'),
(13, 6, 10, 'upload', 10, 'Received +10 points for uploading a note', '2025-09-27 03:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `vote_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  `vote_type` enum('upvote','downvote') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`vote_id`, `user_id`, `note_id`, `vote_type`, `created_at`, `updated_at`) VALUES
(2, 4, 1, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(3, 5, 1, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(4, 6, 1, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(9, 2, 3, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(11, 5, 3, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(12, 6, 3, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(13, 2, 4, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(15, 4, 4, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(16, 6, 4, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(17, 2, 5, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(19, 4, 5, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(20, 5, 5, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(22, 4, 6, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(23, 5, 6, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(24, 6, 6, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(29, 2, 8, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(31, 5, 8, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(32, 6, 8, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(33, 2, 9, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(35, 4, 9, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(36, 6, 9, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(37, 2, 10, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(39, 4, 10, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58'),
(40, 5, 10, 'upvote', '2025-09-27 03:09:58', '2025-09-27 03:09:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_action` (`action`),
  ADD KEY `idx_activity_type` (`activity_type`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`badge_id`),
  ADD UNIQUE KEY `badge_name` (`badge_name`),
  ADD KEY `idx_badge_type` (`badge_type`),
  ADD KEY `idx_required_points` (`required_points`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`bookmark_id`),
  ADD UNIQUE KEY `unique_user_note_bookmark` (`user_id`,`note_id`),
  ADD KEY `idx_user_bookmarks` (`user_id`),
  ADD KEY `idx_note_bookmarks` (`note_id`);

--
-- Indexes for table `data_requests`
--
ALTER TABLE `data_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_requester_id` (`requester_id`),
  ADD KEY `idx_target_user_id` (`target_user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_expires_at` (`expires_at`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `validator_id` (`validator_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_subject_id` (`subject_id`),
  ADD KEY `idx_is_public` (`is_public`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_validation_status` (`validation_status`),
  ADD KEY `idx_upvotes` (`upvotes`),
  ADD KEY `idx_downvotes` (`downvotes`);

--
-- Indexes for table `note_validations`
--
ALTER TABLE `note_validations`
  ADD PRIMARY KEY (`validation_id`),
  ADD KEY `idx_validations_note` (`note_id`),
  ADD KEY `idx_validations_validator` (`validator_id`),
  ADD KEY `idx_validations_status` (`validation_status`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_is_read` (`is_read`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `notification_settings`
--
ALTER TABLE `notification_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_settings` (`user_id`);

--
-- Indexes for table `otp_requests`
--
ALTER TABLE `otp_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_otp_code` (`otp_code`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`),
  ADD KEY `token` (`token`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `note_id` (`note_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `handled_by` (`handled_by`),
  ADD KEY `idx_reporter` (`reporter_id`),
  ADD KEY `idx_report_status` (`report_status`),
  ADD KEY `idx_report_type` (`report_type`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD UNIQUE KEY `subject_code` (`subject_code`),
  ADD KEY `idx_subject_code` (`subject_code`),
  ADD KEY `idx_course` (`course`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `idx_email` (`Email`),
  ADD KEY `idx_account_type` (`Account_Type`),
  ADD KEY `idx_is_admin` (`is_Admin`),
  ADD KEY `idx_credibility` (`credibility_score`),
  ADD KEY `idx_total_points` (`total_points`);

--
-- Indexes for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD PRIMARY KEY (`user_badge_id`),
  ADD UNIQUE KEY `unique_user_badge` (`user_id`,`badge_id`),
  ADD KEY `badge_id` (`badge_id`),
  ADD KEY `idx_user_badges_user` (`user_id`),
  ADD KEY `idx_user_badges_earned` (`earned_at`);

--
-- Indexes for table `user_points`
--
ALTER TABLE `user_points`
  ADD PRIMARY KEY (`point_id`),
  ADD KEY `idx_user_points_user` (`user_id`),
  ADD KEY `idx_user_points_type` (`point_type`),
  ADD KEY `idx_user_points_created` (`created_at`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD UNIQUE KEY `unique_user_note_vote` (`user_id`,`note_id`),
  ADD KEY `idx_votes_note` (`note_id`),
  ADD KEY `idx_votes_user` (`user_id`),
  ADD KEY `idx_votes_type` (`vote_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `badge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `bookmark_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `data_requests`
--
ALTER TABLE `data_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `note_validations`
--
ALTER TABLE `note_validations`
  MODIFY `validation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_settings`
--
ALTER TABLE `notification_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otp_requests`
--
ALTER TABLE `otp_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `user_badge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_points`
--
ALTER TABLE `user_points`
  MODIFY `point_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`note_id`) REFERENCES `notes` (`note_id`) ON DELETE CASCADE;

--
-- Constraints for table `data_requests`
--
ALTER TABLE `data_requests`
  ADD CONSTRAINT `data_requests_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `data_requests_ibfk_2` FOREIGN KEY (`target_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notes_ibfk_3` FOREIGN KEY (`validator_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `note_validations`
--
ALTER TABLE `note_validations`
  ADD CONSTRAINT `note_validations_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `notes` (`note_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `note_validations_ibfk_2` FOREIGN KEY (`validator_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `notification_settings`
--
ALTER TABLE `notification_settings`
  ADD CONSTRAINT `notification_settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`note_id`) REFERENCES `notes` (`note_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_4` FOREIGN KEY (`handled_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `user_badges`
--
ALTER TABLE `user_badges`
  ADD CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`badge_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_points`
--
ALTER TABLE `user_points`
  ADD CONSTRAINT `user_points_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`note_id`) REFERENCES `notes` (`note_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
