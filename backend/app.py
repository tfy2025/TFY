from flask import Flask
from flask_cors import CORS
from extensions import db, Base
from auth_routes import auth_bp, oauth
from dynamic_routes import dynamic_bp, register_dynamic_routes, generate_locales_files
from dotenv import load_dotenv
import os

# ✅ Load biến môi trường từ file .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# ✅ Secret key (bảo mật session & OAuth)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# ✅ Khởi tạo OAuth
oauth.init_app(app)

# ✅ Cấu hình Database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# ✅ Ánh xạ bảng và đăng ký dynamic routes
with app.app_context():
    Base.prepare(db.engine, reflect=True)
    mapped_classes = {table_name.lower(): cls for table_name, cls in Base.classes.items()}
    app.mapped_classes = mapped_classes
    register_dynamic_routes(app, db, mapped_classes)

# ✅ Đăng ký Blueprint
app.register_blueprint(dynamic_bp)
app.register_blueprint(auth_bp)

# ✅ Tạo file dịch khi chạy app
if __name__ == '__main__':
    with app.app_context():
        generate_locales_files(db, mapped_classes, "vi")
        generate_locales_files(db, mapped_classes, "en")
    app.run(debug=True)
