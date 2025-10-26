# Nexus API

Nexus API adalah backend RESTful API untuk platform sosial media yang dibangun dengan Node.js, Express.js, dan Sequelize ORM. API ini menyediakan fitur autentikasi, manajemen profil, posting, follow/unfollow, dan like/unlike.

## 🚀 Fitur

- **Autentikasi JWT**: Register, login, dan delete akun dengan token-based authentication.
- **Manajemen Profil**: Otomatis dibuat saat register, bisa diupdate.
- **Posting**: Buat, baca, update, delete posts dengan pagination.
- **Follow System**: Follow/unfollow users, lihat followers/following.
- **Like System**: Like/unlike posts, lihat likes per post.
- **Error Handling**: Middleware error handling yang komprehensif.
- **Validation**: Input validation menggunakan express-validator.
- **Pagination**: Pagination untuk posts dan lists.
- **Security**: Password hashing dengan bcrypt, UUID untuk IDs.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL dengan Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs
- **Logging**: Morgan
- **Environment**: dotenv
- **Development**: Nodemon

## 📦 Dependencies

### Production Dependencies

- `bcryptjs@^3.0.2` - Password hashing
- `dotenv@^17.2.3` - Environment variables
- `express@^5.1.0` - Web framework
- `express-async-handler@^1.2.0` - Async error handling
- `express-validator@^7.3.0` - Input validation
- `jsonwebtoken@^9.0.2` - JWT authentication
- `morgan@^1.10.1` - HTTP request logger
- `mysql2@^3.15.3` - MySQL database driver
- `sequelize@^6.37.3` - ORM untuk database

### Development Dependencies

- `nodemon@^3.1.10` - Auto-restart server saat development

## 🗂️ Struktur Folder

```
src/
├── app/
│   ├── controllers/     # Business logic handlers
│   │   ├── auth.controller.js
│   │   ├── follow.controller.js
│   │   ├── like.controller.js
│   │   ├── post.controller.js
│   │   └── profile.controller.js
│   ├── middlewares/     # Custom middlewares
│   │   ├── auth/        # Authentication middleware
│   │   └── globals/     # Global middlewares (error, pagination)
│   ├── repositories/    # Data access layer
│   │   ├── auth.repository.js
│   │   ├── follow.repository.js
│   │   ├── like.repository.js
│   │   ├── post.repository.js
│   │   └── profile.repository.js
│   ├── Requests/        # Validation rules
│   │   ├── auth.request.js
│   │   ├── follow.request.js
│   │   ├── like.request.js
│   │   ├── post.request.js
│   │   └── profile.request.js
│   └── services/        # Business logic layer
│       ├── auth.service.js
│       ├── follow.service.js
│       ├── like.service.js
│       ├── post.service.js
│       └── profile.service.js
├── config/              # Configuration files
│   ├── app.js           # Express app setup
│   ├── jwt.js           # JWT utilities
│   └── config.js        # Database config (if separate)
├── database/            # Database related
│   ├── migrations/      # Sequelize migrations
│   ├── models/          # Sequelize models
│   │   ├── index.js     # Model loader
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Post.js
│   │   ├── Follow.js
│   │   └── Like.js
│   └── seeders/         # Database seeders
├── routes/              # API routes
│   ├── index.js         # Main router
│   ├── auth.route.js
│   ├── follow.route.js
│   ├── like.route.js
│   ├── post.route.js
│   └── profile.route.js
├── utils/               # Utilities
│   ├── globals/         # Global utilities
│   │   └── response.js  # Response helpers
│   └── pagination/      # Pagination helpers
├── server.js            # Server entry point
└── .env                 # Environment variables
```

## ⚙️ Instalasi

1. **Clone repository**:

   ```bash
   git clone <repository-url>
   cd nexus-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Buat file `.env` di root directory:

   ```env
   # Database
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=nexus_api
   DB_DIALECT=mysql

   # JWT
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=1h

   # Server
   PORT=3000
   NODE_ENV=development
   ```

4. **Setup database**:
   - Pastikan MySQL running
   - Buat database: `CREATE DATABASE nexus_api;`
   - Jalankan migrations: `npm run migrate`
   - (Opsional) Jalankan seeders: `npm run seed`

## 🚀 Menjalankan Aplikasi

### Development

```bash
npm run dev
```

Server akan running di `http://localhost:3000` dengan auto-reload.

### Production

```bash
npm start
```

## 📚 API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Authentication

- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login user
- `DELETE /auth/me` - Delete akun (butuh auth)

### Profiles

- `GET /profiles/me` - Get profile sendiri (butuh auth)
- `GET /profiles/:id` - Get profile user lain (public, dengan stats followers/following/posts) - _id harus UUID, bukan "me"_
- `PUT /profiles` - Update profile (butuh auth)

### Posts

- `GET /posts` - Get all posts (public, paginated)
- `GET /posts/:id` - Get single post (public)
- `GET /posts/user/me` - Get posts sendiri (butuh auth, paginated)
- `POST /posts` - Create post (butuh auth)
- `PUT /posts/:id` - Update post (butuh auth, owner only)
- `DELETE /posts/:id` - Delete post (butuh auth, owner only)

### Follows

- `POST /follows/:id/follow` - Follow user (butuh auth)
- `DELETE /follows/:id/unfollow` - Unfollow user (butuh auth)
- `GET /follows/:id/followers` - Get followers user
- `GET /follows/:id/following` - Get following user
- `GET /follows/:id/stats` - Get follow stats

### Likes

- `POST /likes/:id/like` - Like post (butuh auth)
- `DELETE /likes/:id/unlike` - Unlike post (butuh auth)
- `GET /likes/:id/likes` - Get likes by post
- `GET /likes/:id/likes/count` - Get likes count by post
- `GET /likes/user/me` - Get likes by current user

## 🔧 Scripts NPM

- `npm run dev` - Jalankan development server dengan nodemon
- `npm run migrate` - Jalankan database migrations
- `npm run seed` - Jalankan database seeders
- `npm run fresh` - Reset database (undo all migrations + migrate + seed)

## 📝 Environment Variables

| Variable         | Description         | Default     |
| ---------------- | ------------------- | ----------- |
| `DB_HOST`        | Database host       | localhost   |
| `DB_USER`        | Database user       | -           |
| `DB_PASSWORD`    | Database password   | -           |
| `DB_NAME`        | Database name       | -           |
| `DB_DIALECT`     | Database dialect    | mysql       |
| `JWT_SECRET`     | JWT secret key      | -           |
| `JWT_EXPIRES_IN` | JWT expiration time | 1h          |
| `PORT`           | Server port         | 3000        |
| `NODE_ENV`       | Environment         | development |

## 🧪 Testing API

Gunakan Postman atau tools serupa untuk test API. Pastikan sertakan header `Authorization: Bearer <token>` untuk endpoints yang butuh auth.

**📖 Setup Postman lengkap**: Lihat file `POSTMAN_SETUP.md` untuk instruksi detail setup environment variables dan scripts.
**💻 Testing di VS Code**: Lihat file `VS_CODE_TESTING.md` (untuk yang pakai extension)
**🛠️ Testing Sederhana**: Lihat file `SIMPLE_TESTING.md` (terminal + cURL)

### Contoh Request:

````bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","passwordConfirmation":"password123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get posts (dengan token)
curl -X GET http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get profile user lain (public)
curl -X GET http://localhost:3000/api/v1/profiles/USER_ID_HERE

## 📋 Contoh Response

### Profile User Lain
```json
{
  "success": true,
  "message": "Mengambil profile user",
  "data": {
    "name": "John Doe",
    "displayName": "johndoe_dev",
    "bio": "Full Stack Developer passionate about Node.js",
    "stats": {
      "followers": 25,
      "following": 30,
      "posts": 15
    }
  }
}
````

```

## 🤝 Contributing

1. Fork repository
2. Buat branch feature baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

## 📞 Contact

- Project Link: [GitHub Repository]
- Email: your-email@example.com

---

**Catatan**: Pastikan semua dependencies terinstall dan database sudah setup sebelum menjalankan aplikasi. Untuk production, pastikan `NODE_ENV=production` dan gunakan HTTPS.
```
