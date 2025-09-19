import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "Holy Wars... The Punishment Due",
				artist: "Megadeth",
				imageUrl: "/cover-images/Rust-In-Peace.jpg",
				audioUrl: "/songs/Holy-Wars-The-Punishment-Due.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 379.2, // 0:39
			},
			{
				title: "Hangar 18",
				artist: "Megadeth",
				imageUrl: "/cover-images/Rust-In-Peace.jpg",
				audioUrl: "/songs/Hangar-18.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 306.6, // 0:41
			},
			{
				title: "Tornado of Souls",
				artist: "Megadeth",
				imageUrl: "/cover-images/Rust-In-Peace.jpg",
				audioUrl: "/songs/Tornado-Of-Souls.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 311.4, // 0:24
			},
			{
				title: "Rust in Peace",
				artist: "Megadeth",
				imageUrl: "/cover-images/Rust-In-Peace.jpg",
				audioUrl: "/songs/Rust-in-Peace-Polaris.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 326.4, // 0:24
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Rust in Peace",
				artist: "Megadeth",
				imageUrl: "/albums/Rust-In-Peace.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();