-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2026 at 02:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wspeedrun`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `run_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `run_id`, `user_id`, `comment`, `created_at`) VALUES
('4bc5e90e-a930-49a7-a0a8-2788517ff404', 'c92db06a-d31e-4d8b-9d86-c86d187361a7', '058a8437-028c-46da-862d-a8164484c80e', 'Nice', '2026-05-21 11:36:07'),
('6e9940d8-31e4-4537-92c9-1befd7e3c178', '24dc4189-220c-4b63-8d90-f3861f2eafdc', '971c5789-ee11-4663-98af-6f095569299f', 'GG!', '2026-05-21 11:59:01'),
('92bd6f55-e6da-49ea-b2d4-441d72e1fc9a', 'd0abfe3a-578a-42c9-8c49-4b640188d2a4', '971c5789-ee11-4663-98af-6f095569299f', 'WOW!', '2026-05-21 12:00:50');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` varchar(36) NOT NULL,
  `game_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `description`) VALUES
('33601b0b-909b-41ce-9a96-b2c75fa14b3b', 'Mobile Legends', 'A game'),
('ba4ce7cc-bd56-4e57-932b-372f50a31edf', 'Dota2', 'A game'),
('fbd56838-a81e-4b8b-8c31-5eebc4629ea4', 'Valorant', 'A game');

-- --------------------------------------------------------

--
-- Table structure for table `runs`
--

CREATE TABLE `runs` (
  `run_id` varchar(36) NOT NULL,
  `run_category_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `vod_url` varchar(255) NOT NULL,
  `run_duration` bigint(20) NOT NULL,
  `submitted_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `runs`
--

INSERT INTO `runs` (`run_id`, `run_category_id`, `user_id`, `vod_url`, `run_duration`, `submitted_at`, `verified_at`, `status`) VALUES
('24dc4189-220c-4b63-8d90-f3861f2eafdc', 'babbf886-2138-4fc2-a801-611ae4f49ec0', '2a77da14-dc41-4e7d-bfdc-5967021ad5c7', 'https://youtube.com/watch?v=xxx', 3910, '2026-05-21 11:54:33', '2026-05-21 11:56:41', 'REJECTED'),
('c92db06a-d31e-4d8b-9d86-c86d187361a7', 'cd279566-9846-499f-af44-085671a7b646', '058a8437-028c-46da-862d-a8164484c80e', 'https://youtube.com/watch?v=xxx', 3661, '2026-05-21 11:15:23', '2026-05-21 11:20:11', 'ACCEPTED'),
('d0abfe3a-578a-42c9-8c49-4b640188d2a4', '903c8ccb-8399-4384-af14-33fd2f590fba', '2a77da14-dc41-4e7d-bfdc-5967021ad5c7', 'https://youtube.com/watch?v=xxx', 4010, '2026-05-21 11:55:02', NULL, 'PENDING');

-- --------------------------------------------------------

--
-- Table structure for table `run_categories`
--

CREATE TABLE `run_categories` (
  `run_category_id` varchar(36) NOT NULL,
  `game_id` varchar(36) NOT NULL,
  `run_category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `run_categories`
--

INSERT INTO `run_categories` (`run_category_id`, `game_id`, `run_category_name`) VALUES
('903c8ccb-8399-4384-af14-33fd2f590fba', 'fbd56838-a81e-4b8b-8c31-5eebc4629ea4', 'zzz'),
('babbf886-2138-4fc2-a801-611ae4f49ec0', '33601b0b-909b-41ce-9a96-b2c75fa14b3b', 'zzzzz'),
('c64d484b-1ce1-4470-bc5b-60e1b296442b', 'ba4ce7cc-bd56-4e57-932b-372f50a31edf', 'zzz'),
('cd279566-9846-499f-af44-085671a7b646', 'fbd56838-a81e-4b8b-8c31-5eebc4629ea4', 'lalala');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(55) NOT NULL,
  `role` varchar(25) NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `country`, `role`) VALUES
('058a8437-028c-46da-862d-a8164484c80e', 'user123', 'user123@example.com', '$2b$10$iyrC5A/OC78A4rW6ePPb9OLUR4ec.E7YKk2V9Jqk8ALg6B4w3dt/i', 'Indonesia', 'USER'),
('2a77da14-dc41-4e7d-bfdc-5967021ad5c7', 'user1', 'user1@example.com', '$2b$10$DJ7t31oPBshhiFMuoBFDYeaSGBUVf3t87hx8qQjuuL4gvYhtCzwqS', 'Indonesia', 'USER'),
('6138813d-3680-427f-a93d-7998a0e5809c', 'user3', 'user3@example.com', '$2b$10$cZUBzJ2X1vWnySlpZ.EwcuOQ/4QxX4cWAC835p0NHZHErlPY.IjzO', 'Indonesia', 'USER'),
('971c5789-ee11-4663-98af-6f095569299f', 'user2', 'user2@example.com', '$2b$10$z7CsUti2Dqgik9DIxvmbgeoSl5TI4PPWqyMlqp2GDim1YS50VYQ4G', 'Indonesia', 'USER'),
('bb660459-a97a-4257-abd1-fc983cdef1ed', 'admin1', 'admin1@example.com', '$2b$10$WKExVPEG1zSKdbhz5Jw7ceCCKly2YA1ac.TwFoH/YXV497IZAEKuq', 'Indonesia', 'ADMIN'),
('c66ed5d3-e232-49e1-adea-d5b1ddde21d1', 'admin123', 'admin123@example.com', '$2b$10$oT2XF6HOYBu/YKw0N2j7XOxD4KvLn6CFz/bjrBp4acHPvYyi3qfAC', 'Indonesia', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `run_id` (`run_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`run_id`);

--
-- Indexes for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD PRIMARY KEY (`run_category_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`run_id`) REFERENCES `runs` (`run_id`);

--
-- Constraints for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD CONSTRAINT `run_categories_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
