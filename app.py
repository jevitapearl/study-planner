from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend to talk to backend

# --- Root Endpoint ---
@app.route("/")
def index():
    return "Backend is running! 🚀"

# --- Endpoint 1: Syllabus -> Plan ---
@app.route('/plan', methods=['POST'])
def generate_plan():
    data = request.json
    syllabus_text = data.get("syllabus", "")
    
    # TODO: Replace with GPT or real parsing
    sample_plan = [
        {"day": 1, "task": "Read Chapter 1"},
        {"day": 2, "task": "Do practice problems for Chapter 1"},
        {"day": 3, "task": "Review Chapter 2"},
    ]
    return jsonify(sample_plan)

# --- Endpoint 2: Exam Predictor ---
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    past_papers = data.get("past_papers", [])

    if not past_papers:
        return jsonify({"error": "No past papers provided"}), 400

    # Count frequency of topics across papers
    freq = {}
    for paper in past_papers:
        for topic in paper.get("topics", []):
            freq[topic] = freq.get(topic, 0) + 1

    # Sort topics by frequency
    sorted_topics = sorted(freq.items(), key=lambda x: x[1], reverse=True)

    # Pick top 3 for demo purposes
    top_topics = [{"topic": t, "frequency": f} for t, f in sorted_topics[:3]]

    return jsonify({"predicted_hot_topics": top_topics})


# --- Endpoint 3: Adaptive Rescheduler ---
@app.route('/reschedule', methods=['POST'])
def reschedule():
    data = request.json
    plan = data.get("plan", [])
    missed = data.get("missed_tasks", [])

    if not plan or not missed:
        return jsonify({"error": "Plan and missed tasks are required"}), 400

    # Flatten tasks into a list
    all_tasks = []
    for unit in plan:
        for task in unit.get("tasks", []):
            all_tasks.append(task)

    # Move missed tasks to the end
    rescheduled = []
    for task in all_tasks:
        if task["task"] in missed:
            task["rescheduled"] = True
            rescheduled.append(task)

    # Remove missed from current slots
    updated_tasks = [t for t in all_tasks if t["task"] not in missed]

    # Append missed tasks at the end
    updated_tasks.extend(rescheduled)

    return jsonify({"updated_plan": updated_tasks})


# --- Endpoint 4: Rewards (optional) ---
coins = 0

@app.route('/rewards', methods=['GET', 'POST'])
def rewards():
    global coins
    if request.method == 'POST':
        coins += 10  # earn coins per completed task
    return jsonify({"coins": coins})


USER_STATE = {
    "coins": 0,
    "mascot_mood": "neutral"
}

@app.route('/progress', methods=['POST'])
def update_progress():
    data = request.json
    completed_tasks = data.get("completed_tasks", [])

    if not completed_tasks:
        return jsonify({"error": "No completed tasks provided"}), 400

    # Reward system: +10 coins per task
    coins_earned = 10 * len(completed_tasks)
    USER_STATE["coins"] += coins_earned

    # Mascot mood logic (hackathon-simple)
    if len(completed_tasks) >= 3:
        USER_STATE["mascot_mood"] = "happy"
    elif len(completed_tasks) == 0:
        USER_STATE["mascot_mood"] = "sad"
    else:
        USER_STATE["mascot_mood"] = "neutral"

    return jsonify({
        "message": "Progress updated",
        "coins_earned": coins_earned,
        "total_coins": USER_STATE["coins"],
        "mascot_mood": USER_STATE["mascot_mood"]
})


if __name__ == "__main__":
    app.run(debug=True)
