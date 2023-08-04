# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Allow CORS for all origins, '*' here means any origin.
    # You can restrict it to specific origins in production.
    CORS(app)

    from .views import bp as views_bp
    app.register_blueprint(views_bp)

    return app
