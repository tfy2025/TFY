from flask import Blueprint, request, jsonify, current_app, redirect, url_for
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from authlib.integrations.flask_client import OAuth
import uuid
import os  # ✅ Thêm để lấy biến môi trường

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")
oauth = OAuth()

# ✅ Google OAuth config (Dùng biến môi trường)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

# ✅ Facebook OAuth config (Dùng biến môi trường)
facebook = oauth.register(
    name='facebook',
    client_id=os.getenv("FACEBOOK_CLIENT_ID"),
    client_secret=os.getenv("FACEBOOK_CLIENT_SECRET"),
    access_token_url='https://graph.facebook.com/v11.0/oauth/access_token',
    authorize_url='https://www.facebook.com/v11.0/dialog/oauth',
    api_base_url='https://graph.facebook.com/v11.0/',
    client_kwargs={'scope': 'email'},
)

# --- REGISTER ---
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    role = data.get("role", "user").lower()
    table = "users" if role == "user" else "workers"

    mapped_classes = current_app.mapped_classes
    Model = mapped_classes.get(table)
    if not Model:
        return jsonify({"error": f"Invalid role: {role}"}), 400

    required_fields = ["name", "email", "phone", "password"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"error": "Vui lòng điền đầy đủ thông tin!"}), 400

    with Session(db.engine) as session:
        existing = session.query(Model).filter_by(email=data["email"]).first()
        if existing:
            return jsonify({"error": "Email đã tồn tại!"}), 400

        new_user = Model(
            id=str(uuid.uuid4()),
            name=data["name"],
            email=data["email"],
            phone=data["phone"],
            password=generate_password_hash(data["password"])
        )
        session.add(new_user)
        session.commit()
        return jsonify({"message": "✅ Đăng ký thành công!"})


# --- LOGIN ---
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email_or_phone = data.get("email_or_phone")
    password = data.get("password")

    if not email_or_phone or not password:
        return jsonify({"error": "Thiếu thông tin đăng nhập!"}), 400

    mapped_classes = current_app.mapped_classes

    for table in ["users", "workers"]:
        Model = mapped_classes.get(table)
        if not Model:
            continue

        with Session(db.engine) as session:
            user = session.query(Model).filter(
                (Model.email == email_or_phone) | (Model.phone == email_or_phone)
            ).first()

            if user and check_password_hash(user.password, password):
                return jsonify({
                    "message": "✅ Đăng nhập thành công!",
                    "name": user.name,
                    "role": table
                })

    return jsonify({"error": "Thông tin đăng nhập không đúng!"}), 401


# --- GOOGLE LOGIN ---
@auth_bp.route("/google-login")
def google_login():
    redirect_uri = url_for("auth.google_callback", _external=True)
    return google.authorize_redirect(redirect_uri)


@auth_bp.route("/google-callback")
def google_callback():
    token = google.authorize_access_token()
    user_info = google.userinfo()

    email = user_info.get("email")
    name = user_info.get("name")

    if not email:
        return jsonify({"error": "Không lấy được email từ Google!"}), 400

    mapped_classes = current_app.mapped_classes
    Model = mapped_classes.get("users")

    with Session(db.engine) as session:
        user = session.query(Model).filter_by(email=email).first()
        if not user:
            user = Model(
                id=str(uuid.uuid4()),
                name=name,
                email=email,
                phone="",
                password=generate_password_hash(uuid.uuid4().hex)
            )
            session.add(user)
            session.commit()

        return redirect(f"http://localhost:3000/?name={user.name}&role=users")


# --- FACEBOOK LOGIN ---
@auth_bp.route("/facebook-login")
def facebook_login():
    redirect_uri = url_for("auth.facebook_callback", _external=True)
    return facebook.authorize_redirect(redirect_uri)


@auth_bp.route("/facebook-callback")
def facebook_callback():
    token = facebook.authorize_access_token()
    resp = facebook.get('me?fields=id,name,email')
    user_info = resp.json()

    email = user_info.get("email")
    name = user_info.get("name")

    if not email:
        return jsonify({"error": "Không lấy được email từ Facebook!"}), 400

    mapped_classes = current_app.mapped_classes
    Model = mapped_classes.get("users")

    with Session(db.engine) as session:
        user = session.query(Model).filter_by(email=email).first()
        if not user:
            user = Model(
                id=str(uuid.uuid4()),
                name=name,
                email=email,
                phone="",
                password=generate_password_hash(uuid.uuid4().hex)
            )
            session.add(user)
            session.commit()

        return redirect(f"http://localhost:3000/?name={user.name}&role=users")
