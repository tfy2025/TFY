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

# Kích hoạt môi trường ảo
source venv/bin/activate

# Cài dependencies
pip install -r requirements.txt

# Cấu hình DATABASE_URL trong app.py hoặc .env (nếu dùng dotenv)
# Ví dụ:
# postgresql://username:password@localhost:5432/tfy_db

# Chạy Flask server
python app.py
```

Mặc định chạy ở: `http://127.0.0.1:5000`

---

### 🎨 3. Chạy Frontend (React)

```bash
cd frontend

# Cài dependencies
npm install

# Chạy dev server
npm start
```

Mặc định chạy ở: `http://localhost:3000` và tự động proxy API đến backend `http://127.0.0.1:5000`.

---

## 📦 Các thư viện chính

### Backend:
- Flask
- Flask-CORS
- Flask-SQLAlchemy
- Authlib (OAuth)
- deep-translator
- psycopg2-binary (PostgreSQL driver)

### Frontend:
- React 19
- Bootstrap 5
- React-Slick
- FontAwesome
- react-i18next
- react-scroll
- react-icons

---

## 🛠 Môi trường phát triển

- Hệ điều hành: macOS/Linux/Windows
- IDE khuyên dùng: VS Code

---

## 🧪 Cài đặt nhanh (script gợi ý)

Bạn có thể tự tạo script như `setup.sh` cho backend:

```bash
#!/bin/bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## 📫 Liên hệ

> Created by Khánh Phan  
> Email: your@email.com  
> GitHub: https://github.com/your-username

---

## ✅ Todo / Nâng cấp gợi ý

- [ ] Viết file `.env` để tách config
- [ ] Thêm chức năng đăng nhập Google OAuth
- [ ] Deploy backend (Render/Fly.io) & frontend (Vercel/Netlify)
