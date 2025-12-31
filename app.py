from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import date
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
VAGAS_POR_DIA = 1
DB_NAME = "database.db"


def init_db():
    if not os.path.exists(DB_NAME):
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS agendamentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT,
                nome TEXT,
                telefone TEXT
            )
        """)
        conn.commit()
        conn.close()


def get_db():
    return sqlite3.connect(DB_NAME)


@app.route("/")
def index():
    init_db()
    hoje = date.today()
    return render_template("index.html", hoje=hoje.day)


@app.route("/agendar", methods=["POST"])
def agendar():
    init_db()

    data = request.form["data"]
    nome = request.form["nome"]
    telefone = request.form["telefone"]

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM agendamentos WHERE data = ?",
        (data,)
    )
    total = cursor.fetchone()[0]

    if total >= VAGAS_POR_DIA:
        return jsonify({"status": "lotado"})

    cursor.execute(
        "INSERT INTO agendamentos (data, nome, telefone) VALUES (?, ?, ?)",
        (data, nome, telefone)
    )

    db.commit()
    db.close()

    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run()
