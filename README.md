# Nexus API

Nexus API adalah backend RESTful API untuk platform sosial media yang dibangun dengan Node.js, Express.js, dan Sequelize ORM. API ini menyediakan fitur autentikasi, manajemen profil, posting, follow/unfollow, dan like/unlike.

## 🚀 Fitur

- **Autentikasi JWT**:

  - Register user baru dengan email dan password
  - Login dengan email/password menghasilkan JWT token
  - Delete akun dengan cascade delete ke semua data terkait
  - Token expiration otomatis (default: 1 jam)

- **Manajemen Profil**:

  - Profile otomatis dibuat saat register dengan display name dari nama user
  - Update display name dan bio
  - View profile dengan stats (followers, following, posts count)
  - Profile public untuk dilihat user lain

- **Posting System**:

  - Buat post dengan konten max 280 karakter
  - Edit hanya post milik sendiri
  - Hapus hanya post milik sendiri
  - View semua posts dengan pagination (10 items per page default)
  - View posts per user dengan pagination
  - Konten sensitif (userId) tidak ditampilkan di response

- **Follow System**:

  - Follow/unfollow users
  - Tidak bisa follow diri sendiri
  - Check if already following
  - View followers list dengan nama user
  - View following list dengan nama user
  - Get follower/following count stats

- **Like System**:

  - Like/unlike posts
  - Check if already liked
  - View likes per post dengan nama user dan konten post
  - Get total likes count per post
  - View all likes dari current user

- **Security & Validation**:

  - Password hashing dengan bcryptjs (salt rounds: 10)
  - JWT token-based authentication
  - UUID v4 untuk semua IDs
  - UUID validation di semua endpoints
  - Authorization check untuk edit/delete operations
  - Input validation dengan express-validator
  - Error handling dengan stack trace di development

- **Pagination & Performance**:

  - Posts list pagination (limit: 10 per page default, max: 100)
  - User posts pagination
  - Follow list pagination
  - Efficient queries dengan selective attributes

- **Data Integrity**:
  - Cascade delete untuk foreign keys
  - Transaction support untuk multi-table operations
  - Unique constraints (email, userId di profiles)

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

### Authentication Endpoints

#### 1. Register User

```
POST /auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}
```

**Success Response (201):**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "3b2ce536-04c1-4bd4-90be-3e49954a76e1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**

- Email already exists
- Password confirmation doesn't match
- Missing required fields

---

#### 2. Login User

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": "3b2ce536-04c1-4bd4-90be-3e49954a76e1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**

- Invalid email or password

---

#### 3. Delete Account

```
DELETE /auth/me
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Account deleted successfully",
  "data": {
    "message": "Account deleted successfully"
  }
}
```

**Error Response (401):**

- Unauthorized: No token or token invalid

---

### Profile Endpoints

#### 1. Get Own Profile

```
GET /profiles/me
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Mengambil profile",
  "data": {
    "id": "profile-uuid",
    "displayName": "John Doe",
    "bio": "Full Stack Developer",
    "user": {
      "name": "John Doe"
    }
  }
}
```

**Error Response (401):**

- Unauthorized: No token

---

#### 2. Get User Profile (Public)

```
GET /profiles/:id
```

**Parameters:**

- `id`: User ID (UUID format)

**Success Response (200):**

```json
{
  "status": "success",
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
```

**Error Response (404):**

- Profile tidak ditemukan

---

#### 3. Update Profile

```
PUT /profiles
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "displayName": "John Doe Dev",
  "bio": "Passionate Full Stack Developer"
}
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Profile diperbarui",
  "data": {
    "id": "profile-uuid",
    "displayName": "John Doe Dev",
    "bio": "Passionate Full Stack Developer",
    "user": {
      "name": "John Doe"
    }
  }
}
```

**Error Response:**

- 401: Unauthorized
- 400: Validation failed

---

### Post Endpoints

#### 1. Get All Posts (Paginated)

```
GET /posts?page=1&limit=10
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Mengambil semua post",
  "data": [
    {
      "id": "post-uuid",
      "content": "Ini postingan pertama saya",
      "createdAt": "2025-10-26T15:23:37.000Z",
      "user": {
        "name": "John Doe"
      }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

---

#### 2. Get Single Post

```
GET /posts/:id
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Mengambil post",
  "data": {
    "id": "post-uuid",
    "content": "Ini postingan pertama saya",
    "createdAt": "2025-10-26T15:23:37.000Z",
    "user": {
      "name": "John Doe"
    }
  }
}
```

**Error Response (404):**

- Post tidak ditemukan

---

#### 3. Get Own Posts (Paginated)

```
GET /posts/user/me?page=1&limit=10
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Mengambil post dari user",
  "data": [
    {
      "id": "post-uuid",
      "content": "Postingan saya",
      "createdAt": "2025-10-26T15:23:37.000Z",
      "user": {
        "name": "John Doe"
      }
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

#### 4. Create Post

```
POST /posts
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "content": "Ini postingan baru saya yang keren!"
}
```

**Success Response (201):**

```json
{
  "status": "success",
  "message": "Membuat post",
  "data": {
    "id": "post-uuid",
    "content": "Ini postingan baru saya yang keren!",
    "createdAt": "2025-10-27T10:00:00.000Z",
    "user": {
      "name": "John Doe"
    }
  }
}
```

**Error Response:**

- 400: Validation failed (content required, max 280 chars)
- 401: Unauthorized

---

#### 5. Update Post (Owner Only)

```
PUT /posts/:id
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "content": "Konten post yang sudah diupdate"
}
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Post diperbarui",
  "data": {
    "id": "post-uuid",
    "content": "Konten post yang sudah diupdate",
    "createdAt": "2025-10-26T15:23:37.000Z",
    "user": {
      "name": "John Doe"
    }
  }
}
```

**Error Response:**

- 403: Tidak diizinkan untuk memperbarui postingan ini (bukan owner)
- 404: Postingan tidak ditemukan
- 400: Validation failed

---

#### 6. Delete Post (Owner Only)

```
DELETE /posts/:id
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Post dihapus",
  "data": {
    "message": "Post deleted"
  }
}
```

**Error Response:**

- 403: Tidak diizinkan untuk menghapus postingan ini
- 404: Post not found

---

### Follow Endpoints

#### 1. Follow User

```
POST /follows/:id/follow
Authorization: Bearer <token>
```

**Parameters:**

- `id`: User ID to follow (UUID format)

**Success Response (201):**

```json
{
  "status": "success",
  "message": "Mengikuti user",
  "data": {
    "id": "follow-uuid",
    "followerId": "follower-uuid",
    "followingId": "following-uuid"
  }
}
```

**Error Response:**

- 400: Sudah mengikuti pengguna ini / Tidak dapat mengikuti diri sendiri
- 401: Unauthorized

---

#### 2. Unfollow User

```
DELETE /follows/:id/unfollow
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Berhasil berhenti mengikuti user",
  "data": {
    "message": "Berhenti mengikuti berhasil"
  }
}
```

**Error Response:**

- 400: Kamu tidak mengikuti pengguna ini
- 401: Unauthorized

---

#### 3. Get Followers List

```
GET /follows/:id/followers
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Berhasil mengambil followers",
  "data": [
    {
      "id": "follow-uuid",
      "follower": {
        "name": "User 1"
      }
    },
    {
      "id": "follow-uuid",
      "follower": {
        "name": "User 2"
      }
    }
  ]
}
```

---

#### 4. Get Following List

```
GET /follows/:id/following
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Berhasil mengambil following",
  "data": [
    {
      "id": "follow-uuid",
      "following": {
        "name": "User A"
      }
    }
  ]
}
```

---

#### 5. Get Follow Statistics

```
GET /follows/:id/stats
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Statistik mengikuti berhasil diambil",
  "data": {
    "followersCount": 25,
    "followingCount": 30
  }
}
```

---

### Like Endpoints

#### 1. Like Post

```
POST /likes/:id/like
Authorization: Bearer <token>
```

**Parameters:**

- `id`: Post ID (UUID format)

**Success Response (201):**

```json
{
  "status": "success",
  "message": "Post di-like",
  "data": {
    "id": "like-uuid",
    "userId": "user-uuid",
    "postId": "post-uuid"
  }
}
```

**Error Response:**

- 400: Sudah like post ini / Post tidak ditemukan
- 401: Unauthorized

---

#### 2. Unlike Post

```
DELETE /likes/:id/unlike
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Post di-unlike",
  "data": {
    "message": "Unlike post berhasil"
  }
}
```

**Error Response:**

- 400: Kamu tidak like post ini / Post tidak ditemukan
- 401: Unauthorized

---

#### 3. Get Likes by Post

```
GET /likes/:id/likes
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Berhasil mengambil likes",
  "data": [
    {
      "id": "like-uuid",
      "user": {
        "name": "User 1"
      },
      "post": {
        "content": "Post content"
      }
    }
  ]
}
```

---

#### 4. Get Likes Count

```
GET /likes/:id/likes/count
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Berhasil mengambil total likes",
  "data": {
    "likesCount": 15
  }
}
```

---

#### 5. Get User's Likes

```
GET /likes/user/me
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Berhasil mengambil likes user",
  "data": [
    {
      "id": "like-uuid",
      "post": {
        "content": "Post content yang aku like"
      }
    }
  ]
}
```

**Error Response:**

- 401: Unauthorized

---

## � Architecture Pattern

Backend ini menggunakan **layered architecture** dengan separation of concerns:

```
Request
  ↓
Router (routes/*.route.js)
  ↓
Controller (app/controllers/*.controller.js)
  ├─ Request validation
  ├─ Call service layer
  └─ Send response
  ↓
Service (app/services/*.service.js)
  ├─ Business logic
  ├─ Authorization checks
  ├─ UUID validation
  └─ Call repository
  ↓
Repository (app/repositories/*.repository.js)
  ├─ Database queries
  ├─ Data transformation
  └─ Return raw/formatted data
  ↓
Database (Models)
```

**Keuntungan pattern ini:**

- ✅ Easy to test (business logic terpisah dari HTTP)
- ✅ Reusable services (bisa dipanggil dari berbagai controller)
- ✅ Single responsibility (setiap layer punya satu tanggung jawab)
- ✅ Easy to maintain (changes terisolasi di satu layer)

---

## �🔧 Scripts NPM

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

Gunakan Postman, cURL, atau tools serupa untuk test API.

### Requirements untuk Testing

- JWT Token dari endpoint `/auth/login`
- Valid UUID untuk user/post IDs
- Header `Authorization: Bearer <token>` untuk protected endpoints
- Header `Content-Type: application/json` untuk POST/PUT requests

### Quick Start Testing

1. **Register user baru:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"password123",
    "passwordConfirmation":"password123"
  }'
```

2. **Login dan dapatkan token:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"password123"
  }'
```

3. **Get own profile (dengan token):**

```bash
curl -X GET http://localhost:3000/api/v1/profiles/me \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

4. **Create post (dengan token):**

```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -d '{
    "content":"Ini postingan pertama saya!"
  }'
```

5. **Get all posts (public, tanpa token):**

```bash
curl -X GET "http://localhost:3000/api/v1/posts?page=1&limit=10"
```

### Testing dengan Postman

1. Download Postman dari https://www.postman.com/downloads/
2. Import collection atau setup manually:
   - Set base URL: `{{base_url}}/api/v1` atau `http://localhost:3000/api/v1`
   - Buat environment variable untuk `jwt_token` dari response login
   - Gunakan `Authorization` header type `Bearer Token` dengan `{{jwt_token}}`

### Testing dengan VS Code Extensions

1. Install `REST Client` extension (Huachao Mao)
2. Buat file `.http` atau `.rest`:

```http
### Register
POST http://localhost:3000/api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirmation": "password123"
}

### Login
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

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
```

### Error Response Example

```json
{
  "status": "error",
  "message": "Unauthorized: Tidak ada token",
  "error": "Unauthorized: Tidak ada token"
}
```

### Validation Error Response

```json
{
  "status": "error",
  "message": "Validasi gagal",
  "error": [
    {
      "type": "field",
      "value": "",
      "msg": "Content is required",
      "path": "content",
      "location": "body"
    }
  ]
}
```

---

## 🔐 Security Features

### Password Security

- **Hashing**: Bcryptjs dengan salt rounds 10
- **Never stored plain**: Password di-hash sebelum disimpan ke database
- **Password confirmation**: Validasi saat register

### Authentication & Authorization

- **JWT Token**: Access token dengan expiration time (default: 1 jam)
- **Bearer Token**: Token dikirim via `Authorization: Bearer <token>` header
- **Token Validation**: Setiap request ke protected endpoint diverifikasi
- **Owner-only Operations**: Update/delete post hanya bisa dilakukan owner

### Data Validation

- **UUID Format**: Semua IDs harus valid UUID v4
- **Content Length**: Post content max 280 karakter
- **Email Format**: Validasi email saat register/login
- **Input Sanitization**: express-validator mengecek semua input

### Data Protection

- **Sensitive Fields Hidden**: userId tidak ditampilkan di response
- **Selective Attributes**: Query hanya ambil field yang diperlukan
- **Cascade Delete**: Saat user dihapus, semua data terkait juga dihapus

---

## ⚠️ Error Handling

Semua error response mengikuti format:

```json
{
  "status": "error",
  "message": "User-friendly message",
  "error": "Detailed error atau stack trace di development"
}
```

### Common HTTP Status Codes

| Code | Meaning      | Example                               |
| ---- | ------------ | ------------------------------------- |
| 400  | Bad Request  | Validation failed, already following  |
| 401  | Unauthorized | Missing/invalid token, wrong password |
| 403  | Forbidden    | Not owner of post, can't follow self  |
| 404  | Not Found    | User/post/profile tidak ditemukan     |
| 500  | Server Error | Database error, unexpected exception  |

### Common Error Messages

- `"Unauthorized: Tidak ada token"` - Missing authorization header
- `"Unauthorized: token tidak valid"` - Invalid JWT token
- `"Unauthorized: Token expired"` - Token sudah expired
- `"ID post tidak valid"` - Post ID bukan valid UUID
- `"ID user tidak valid"` - User ID bukan valid UUID
- `"Tidak dapat mengikuti diri sendiri"` - Trying to follow self
- `"Kamu sudah mengikuti pengguna ini"` - Already following
- `"Tidak diizinkan untuk memperbarui postingan ini"` - Not owner of post

---

## 🚀 Performance Considerations

### Query Optimization

- Selective attributes: Query hanya field yang dibutuhkan
- Eager loading: Include related models dalam single query
- Pagination: Limit hasil untuk large datasets
- Indexing: Database indexes pada foreign keys dan frequently queried columns

### Response Optimization

- Remove sensitive fields: userId hidden dari response
- Minimal data: Tidak kirim semua fields ke client
- Pagination metadata: Total, current page, total pages

### Caching Opportunities (Future)

- Cache user profiles (1 jam)
- Cache follow stats (5 menit)
- Cache popular posts (30 menit)

---

## 📝 Validation Rules

### Registration

- `name`: Required, string
- `email`: Required, valid email, unique
- `password`: Required, min 6 characters
- `passwordConfirmation`: Required, must match password

### Post Creation

- `content`: Required, string, max 280 characters

### Profile Update

- `displayName`: Optional, string, max 100 characters
- `bio`: Optional, string, max 160 characters

### Follow/Like Operations

- `id`: Required, valid UUID v4 format

---

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

### Response Format

**Success Response:**

```json
{
  "status": "success",
  "message": "Deskripsi operasi",
  "data": {
    /* response data */
  }
}
```

**Paginated Response:**

```json
{
  "status": "success",
  "message": "Deskripsi operasi",
  "data": [
    /* array of items */
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "message": "User-friendly message",
  "error": "Detail error atau stack trace (development mode)"
}
```

### Data Types & Constraints

| Field | Type   | Constraints                        |
| ----- | ------ | ---------------------------------- |
| id    | UUID   | v4 format, auto-generated          |
| email | String | Valid email, unique, max 255 chars |

### Data Types & Constraints

| Field       | Type      | Constraints                        |
| ----------- | --------- | ---------------------------------- |
| id          | UUID      | v4 format, auto-generated          |
| email       | String    | Valid email, unique, max 255 chars |
| password    | String    | Hashed with bcryptjs, min 6 chars  |
| name        | String    | Required, max 255 chars            |
| displayName | String    | Optional, max 100 chars            |
| bio         | String    | Optional, max 160 chars            |
| content     | String    | Max 280 chars (like Twitter)       |
| createdAt   | Timestamp | Auto-generated                     |
| updatedAt   | Timestamp | Auto-updated                       |

---

## ⚠️ Important Notes

- ✅ **Pastikan semua dependencies terinstall**: `npm install`
- ✅ **Database harus sudah di-setup**: Create database dan run migrations
- ✅ **Environment variables harus di-set**: Copy `.env.example` ke `.env` dan isi values
- ✅ **JWT Secret harus strong**: Gunakan string random yang panjang
- ✅ **ID di URL harus UUID**: Jangan gunakan format "me" kecuali di endpoint spesifik `/profiles/me` atau `/posts/user/me`
- ⚠️ **Production mode**: Set `NODE_ENV=production`, gunakan HTTPS, dan hide error stack traces
- ⚠️ **Rate limiting**: Pertimbangkan implementasi rate limiting untuk production
- ⚠️ **CORS**: Konfigurasi CORS sesuai domain frontend

---

## 📞 Troubleshooting

### Server tidak jalan (Exit Code: 1)

```bash
# Check error log
npm run dev

# Pastikan dependencies installed
npm install

# Pastikan database running
mysql -u root -p

# Pastikan .env exists dan valid
cat .env
```

### Database connection error

- Pastikan MySQL service running
- Check DB credentials di `.env`
- Check database sudah di-create: `SHOW DATABASES;`

### Invalid UUID error

- Pastikan ID adalah valid UUID v4 format
- Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Jangan gunakan custom IDs atau strings

### Token expired error

- Refresh login untuk mendapatkan token baru
- JWT_EXPIRES_IN di `.env` menentukan durasi token

---

**Catatan**: Dokumentasi ini sesuai dengan kode yang ada. Untuk production, pastikan semua security best practices diterapkan.

---
