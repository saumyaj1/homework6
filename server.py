from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

server = Flask(__name__, static_folder = 'hwsets/build', static_url_path='')
cors = CORS(server)

@server.route('/CheckIn/<projectId>/<qty>', methods = ["GET"])
@cross_origin()

def checkIn_hardware(projectId, qty):
    value = {
        "Quantity": qty + "hardware checked in"
    }
    return value

@server.route('/CheckOut/<projectId>/<qty>', methods = ["GET"])
def checkOut_hardware(projectid, qty):
    value = {
        "Quantity": qty + "hardware checked out"
    }
    return value

@server.route('/Join/<projectId>', methods = ["GET"])
def joinProject(projectId):
    value = {
        "Status": "Joined" + projectId
    }
    return value

@server.route('/Leave/<projectId>', methods = ["GET"])
def leaveProject(projectId):
    value = {
        "Status": "Left" + projectId
    }
    return value


if __name__ == "__main__":
    server.run(host = '0.0.0.0', debug = False, port = os.environ.get('PORT', 80))
    