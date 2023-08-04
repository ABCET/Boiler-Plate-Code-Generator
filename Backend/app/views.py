# backend/app/views.py
from flask import Blueprint, request, jsonify
from .code_generator import generate_code

bp = Blueprint('views', __name__)

@bp.route('/generate-code', methods=['POST'])
def generate_code_view():
    try:
        data = request.get_json()
        selected_stack = data.get('selectedStack')
        selected_language = data.get('selectedLanguage')

        if selected_stack is None or selected_language is None:
            return jsonify({'error': 'Missing data'}), 400

        code = generate_code(selected_stack, selected_language)

        return jsonify({'code': code})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
