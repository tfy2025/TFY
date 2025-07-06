from flask import Blueprint, Response, request, send_from_directory
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from datetime import datetime
from decimal import Decimal
import os, json

from deep_translator import GoogleTranslator

dynamic_bp = Blueprint("dynamic", __name__)

Base = automap_base()

def translate_text(text, to_lang="en"):
    try:
        return GoogleTranslator(source='auto', target=to_lang).translate(text)
    except Exception as e:
        print(f"⚠️ Translate error: {e}")
        return text

def model_to_dict(obj, lang="vi"):
    result = {}
    for col in obj.__table__.columns:
        val = getattr(obj, col.name)
        if isinstance(val, datetime):
            result[col.name] = val.isoformat()
        elif isinstance(val, Decimal):
            result[col.name] = float(val)
        elif isinstance(val, str) and lang != "vi" and col.name.lower() in ["title", "description", "name", "content"]:
            result[col.name] = translate_text(val, to_lang=lang)
        else:
            result[col.name] = val
    return result

def register_dynamic_routes(app, db, mapped_classes):
    for table_name, model_class in mapped_classes.items():
        route_path = f"/{table_name}"

        def make_route(model=model_class):
            def route():
                lang = request.args.get("lang", "vi")
                session = Session(db.engine)
                records = session.query(model).all()
                session.close()
                data = [model_to_dict(r, lang=lang) for r in records]
                return Response(json.dumps(data, ensure_ascii=False), content_type="application/json; charset=utf-8")
            return route

        app.add_url_rule(route_path, table_name, make_route())

@dynamic_bp.route("/locales/<lang>/<filename>")
def serve_locale_file(lang, filename):
    return send_from_directory(os.path.join("locales", lang), filename)

def generate_locales_files(db, mapped_classes, lang="en"):
    output_dir = os.path.join("locales", lang)
    os.makedirs(output_dir, exist_ok=True)

    for table_name, model in mapped_classes.items():
        print(f"🔁 Generating {lang}/{table_name}.json ...")
        session = Session(db.engine)
        records = session.query(model).all()
        session.close()

        data = [model_to_dict(r, lang=lang) for r in records]
        file_path = os.path.join(output_dir, f"{table_name}.json")
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
