from flask import Flask
from flask_cors import CORS
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    from .views import bp as views_bp
    app.register_blueprint(views_bp)

    return app
