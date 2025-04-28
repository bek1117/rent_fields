-- Active: 1745317047940@@127.0.0.1@3306

CREATE DATABASE IF NOT EXISTS rent_field;

USE rent_field;

CREATE TABLE `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userRole` ENUM('customer', 'owner', 'admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(55) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);

CREATE TABLE `fields` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `adress` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `price_per_hour` DECIMAL(15, 2) NOT NULL,
    `owner_id` INT UNSIGNED NOT NULL
);

CREATE TABLE `booking` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `booking_date` DATE NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `end_time` VARCHAR(10) NOT NULL,
    `total_price` DECIMAL(15, 2) NOT NULL,
    `status` ENUM(
        'cancelled',
        'pending',
        'accepted',
        'paid'
    ) NOT NULL
);

CREATE TABLE `payment` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` INT UNSIGNED NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_methods` ENUM('cash', 'card', 'online') NOT NULL
);

CREATE TABLE `review` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL,
    `comment` TEXT
);

CREATE TABLE `images` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);

ALTER TABLE `fields`
ADD CONSTRAINT `fields_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `booking`
ADD CONSTRAINT `booking_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `booking`
ADD CONSTRAINT `booking_stadion_id_foreign` FOREIGN KEY (`stadion_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE;

ALTER TABLE `payment`
ADD CONSTRAINT `payment_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE;

ALTER TABLE `review`
ADD CONSTRAINT `review_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `review`
ADD CONSTRAINT `review_stadion_id_foreign` FOREIGN KEY (`stadion_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE;

ALTER TABLE `images`
ADD CONSTRAINT `images_stadion_id_foreign` FOREIGN KEY (`stadion_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE;