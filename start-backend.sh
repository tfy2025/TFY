#!/bin/bash

echo "🐍 Đang khởi tạo môi trường ảo và chạy backend..."
cd backend || exit

# Tạo venv nếu chưa có
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Kích hoạt venv
source venv/bin/activate

# Cài thư viện
pip install -r requirements.txt

# Chạy server
python app.py
