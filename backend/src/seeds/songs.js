import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{
		title: "Holy Wars... The Punishment Due",
		artist: "Megadeth",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/1.mp3",
		duration: 379.2, // 0:46
	},
	{
		title: "Hangar 18",
		artist: "Megadeth",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/2.mp3",
		duration: 306.6, // 0:41
	},
	{
		title: "Tornado of Souls",
		artist: "Megadeth",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/3.mp3",
		duration: 311.4, // 0:24
	},
	{
		title: "Rust in Peace",
		artist: "Megadeth",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/4.mp3",
		duration: 326.4, // 0:24
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();