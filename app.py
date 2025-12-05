from flask import Flask, render_template, jsonify
import subprocess
import os

app = Flask(__name__)

# Absolute path to scripts folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCRIPTS_FOLDER = os.path.join(BASE_DIR, "scripts")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/run/<script_name>")
def run_script(script_name):
    # Construct full path inside the function
    script_path = os.path.join(SCRIPTS_FOLDER, script_name + ".ps1")

    if not os.path.exists(script_path):
        return jsonify({"status": "error", "message": "Script not found"}), 404

    try:
        # Execute PowerShell script on Windows
        result = subprocess.run(
            ["powershell.exe", "-Command",
             f"Start-Process powershell -ArgumentList '-File \"{script_path}\"' -Verb RunAs"],
            text=True
        )
        output = result.stdout if result.stdout else "No output"
        error = result.stderr if result.stderr else ""

        return jsonify({
            "status": "success",
            "script": script_name,
            "output": output,
            "error": error
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
