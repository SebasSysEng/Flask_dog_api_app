from flask import Flask
from app.routes import dog_bp

def create_app():
    app = Flask(
        __name__,
        template_folder="../templates",
        static_folder="../static"   
    )

    app.register_blueprint(dog_bp)
    return app

