from flask import Flask, request, jsonify
from flask_cors import CORS
import string
import random
import uuid

app = Flask(__name__)

# If your frontend runs on a different port (Vite often 5173), add it here.
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"]}})

rooms = {}
# rooms[roomCode] = {
#   "users": set(userId),
#   "votes": {
#       foodId: {"likes": int, "passes": int, "voters": {userId: "like"|"pass"}}
#   }
# }

def generate_room_code(length=5):
    # ensure uniqueness
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if code not in rooms:
            return code

def generate_user_id():
    return str(uuid.uuid4())

@app.route("/", methods=["GET"])
def root():
    return jsonify({"ok": True, "message": "Backend running", "try": ["/api/health"]})

@app.route("/api/rooms", methods=["POST"])
def create_room():
    room_code = generate_room_code()
    rooms[room_code] = {"users": set(), "votes": {}}
    return jsonify({"roomCode": room_code})

@app.route("/api/rooms/<room_code>/join", methods=["POST"])
def join_room(room_code):
    room = rooms.get(room_code)
    if not room:
        return jsonify({"error": "Room not found"}), 404

    user_id = generate_user_id()
    room["users"].add(user_id)
    return jsonify({"userId": user_id})

@app.route("/api/rooms/<room_code>/vote", methods=["POST"])
def vote_food(room_code):
    room = rooms.get(room_code)
    if not room:
        return jsonify({"error": "Room not found"}), 404

    data = request.json or {}
    user_id = data.get("userId")
    food_id = data.get("foodId")
    vote_type = data.get("vote")

    if not user_id or not food_id or vote_type not in ["like", "pass"]:
        return jsonify({"error": "Missing or invalid fields"}), 400

    if user_id not in room["users"]:
        return jsonify({"error": "User not in room"}), 400

    if food_id not in room["votes"]:
        room["votes"][food_id] = {"likes": 0, "passes": 0, "voters": {}}

    entry = room["votes"][food_id]
    prev = entry["voters"].get(user_id)

    # remove previous vote if exists
    if prev == "like":
        entry["likes"] -= 1
    elif prev == "pass":
        entry["passes"] -= 1

    # add new vote
    if vote_type == "like":
        entry["likes"] += 1
    else:
        entry["passes"] += 1

    entry["voters"][user_id] = vote_type
    return jsonify({"ok": True, "foodId": food_id, "vote": vote_type})

@app.route("/api/rooms/<room_code>/results", methods=["GET"])
def get_results(room_code):
    room = rooms.get(room_code)
    if not room:
        return jsonify({"error": "Room not found"}), 404

    votes = room["votes"]
    if not votes:
        return jsonify({"winnerFood": None, "breakdown": []})

    max_likes = max(v["likes"] for v in votes.values())
    tied_foods = [fid for fid, v in votes.items() if v["likes"] == max_likes]
    winner_id = sorted(tied_foods)[0] if tied_foods else None

    def serialize_food(fid, v):
        return {
            "foodId": fid,
            "likes": v["likes"],
            "passes": v["passes"],
            "voters": list(v["voters"].keys())  # safe JSON
        }

    winner = serialize_food(winner_id, votes[winner_id]) if winner_id else None
    breakdown = [serialize_food(fid, v) for fid, v in votes.items()]
    return jsonify({"winnerFood": winner, "breakdown": breakdown})

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True})

if __name__ == "__main__":
    print("Starting Flask backend on http://127.0.0.1:5001/")
    app.run(host="0.0.0.0", port=5001, debug=True)



