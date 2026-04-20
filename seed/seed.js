print("🚀 Checking MongoDB for existing data...");

const db = connect("mongodb://db:27017/HTCC_data");

// Check if already seeded
const hasData =
  db.members.estimatedDocumentCount() > 0 ||
  db.users.estimatedDocumentCount() > 0 

if (hasData) {
  print("⚠️ Data already exists — skipping seed.");
  quit();
}

print("📌 Seeding initial database data...");

const memberData = fs.readFileSync('/seed-data/members-16-04-2026.json', 'utf8');
const userData = fs.readFileSync('/seed-data/users-16-04-2026.json', 'utf8');

// const jsonUserData = [
//     {
//         user_id: "68385b9981097c6b4042dab4",
//         first_name: "Bob",
//         last_name: "Jones",
//         email: "bobjones@hotmail.com",
//         password: "$2a$10$FAd/ArLwxQ3WbNE3XKbyveRHidTpW9g84hX2CPr0tWdGGerrP6.3K",
//         role: "ADMIN",
//         created_at: new Date("2025-05-29T13:05:29Z"),
//         updated_at: new Date("2025-08-05T10:07:15Z"),
//         token: "",
//         refresh_token: "",
//         favourite_genres: [
//             {
//                 genre_id: 1,
//                 genre_name: "Comedy"
//             },
//             {
//                 genre_id: 4,
//                 genre_name: "Fantasy"
//             }
//         ]
//     }
// ]

//db.users.insertMany(jsonUserData);
db.members.insertMany(JSON.parse(memberData));
db.users.insertMany(JSON.parse(userData));

print("🎉 Seeding complete. Database is ready!");
