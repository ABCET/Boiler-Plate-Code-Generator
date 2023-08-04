# backend/app/code_generator.py
import openai

# Set your OpenAI API key here
openai.api_key = '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'


def generate_code(selected_stack, selected_language):
    try:
        # Define your prompt based on the selected stack and language
        prompt = f"Generate advanced boiler plate code for {selected_stack} in {selected_language} which includes comments and documentation.It should include possible ways of changin parameters or extra features in comments.the code should start with start in comments and end with end in comments."
        messages = [
            {"role": "system", "content": "You are a helpful assistant that generates code."},
            {"role": "user", "content": prompt},
        ]
        # Call the OpenAI API to get the best completio for the prompt
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use the chat model for gpt-3.5-turbo
            messages=messages,
        )

        # Extract the generated code from the API response
        generated_code = response['choices'][0]['message']['content']

        return generated_code
    except Exception as e:
        # Return error response
        return f"Error generating code: {str(e)}"
