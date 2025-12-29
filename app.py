from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    agenda = {
        "Segunda-feira": ["09:00", "10:30", "14:00"],
        "Terça-feira": ["09:00", "13:00", "16:00"],
        "Quarta-feira": ["10:00", "15:00"],
    }

    tipos_unha = {
        "Unha em Gel": 80,
        "Fibra de Vidro": 120,
        "Acrílica": 100,
        "Manicure Simples": 40
    }

    transporte = {
        "Centro": 10,
        "Bairro A": 15,
        "Bairro B": 20,
        "Zona Rural": 30
    }

    total = None

    if request.method == "POST":
        unha = request.form["unha"]
        bairro = request.form["bairro"]
        total = tipos_unha[unha] + transporte[bairro]

    return render_template(
        "index.html",
        agenda=agenda,
        tipos_unha=tipos_unha,
        transporte=transporte,
        total=total
    )

if __name__ == "__main__":
    app.run(debug=True)
