# 🔥 TFY Fullstack Project (Flask + React)

Dự án gồm:
- 🧠 **Backend**: Flask + SQLAlchemy + PostgreSQL
- 🎨 **Frontend**: ReactJS + Bootstrap + i18next

---

## 📁 Cấu trúc thư mục

```
TFY_Intro/
├── backend/              # Flask API server
│   ├── app.py
│   ├── extensions.py
│   ├── auth_routes.py
│   ├── dynamic_routes.py
│   ├── requirements.txt
│   └── ...
├── frontend/             # React client
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
```

---

## 🚀 Hướng dẫn chạy dự án

### ✅ 1. Chuẩn bị trước

- Cài [Python 3.10+](https://www.python.org/)
- Cài [Node.js 18+](https://nodejs.org/)
- Cài [PostgreSQL](https://www.postgresql.org/) và tạo một database, ví dụ `tfy_db`

---

### 🧠 2. Chạy Backend (Flask)

```bash
cd backend

# Tạo môi trường ảo
python -m venv venv

# Kích hoạt môi trường ảo (macOS/Linux)
source venv/bin/activate

# Cài dependencies
pip install -r requirements.txt

# Cấu hình biến môi trường trong .env
# Ví dụ:
# DATABASE_URL=postgresql://username:password@localhost:5432/tfy_db
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...

# Chạy Flask server
python app.py
```

✅ Mặc định chạy ở: `http://127.0.0.1:5000`

---

### 🎨 3. Chạy Frontend (React)

```bash
cd frontend

# Cài dependencies
npm install

# Khởi chạy React dev server
npm start
```

✅ Mặc định chạy ở: `http://localhost:3000`

📡 Và tự động **proxy đến API backend**: `http://127.0.0.1:5000`

---

## 📦 Các thư viện chính

### 🔙 Backend:
- `Flask`
- `Flask-CORS`
- `Flask-SQLAlchemy`
- `Authlib` (Google/Facebook OAuth)
- `deep-translator`
- `psycopg2-binary`
- `python-dotenv`

### 🎨 Frontend:
- `React 19`
- `Bootstrap 5`
- `React Slick`
- `FontAwesome`
- `react-i18next`
- `react-scroll`
- `react-icons`
- `react-fullpage`
- `cross-env`

---

## 🛠 Môi trường phát triển

- Hệ điều hành: macOS / Linux / Windows
- IDE khuyên dùng: VS Code

---

## 🧪 Gợi ý script setup nhanh

### `start-backend.sh`

```bash
#!/bin/bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### `start-frontend.sh`

```bash
#!/bin/bash
cd frontend
npm install
npm start
```

---

## 📫 Liên hệ

> Created by **Khánh Phan**  
> GitHub: [https://github.com/tfy2025](https://github.com/tfy2025)  
> Email: your@email.com

---

## ✅ Gợi ý nâng cấp

- [ ] Viết file `.env` để tách config
- [ ] Thêm chức năng đăng nhập Google/Facebook OAuth
- [ ] Deploy backend (Render/Fly.io) & frontend (Vercel/Netlify)
- [ ] Bổ sung xác thực token JWT cho các API
