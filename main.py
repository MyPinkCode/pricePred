from flask import Flask, request, jsonify, render_template
from flask_restful import Resource, Api
import naive_bayes
import neural_network
import nearst_neighbors
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)

app.static_folder = 'static'
@app.route('/')
def home():
    return render_template('index.html')

class PredictPrice(Resource):
    
    def post(self,algorithm):
        data = request.json

        if(algorithm == 'naive_bayes'):
            res = naive_bayes.predict([float(data['rating']),float(data['review']),int(data['brand']),int(data['area'])])
            return jsonify({'predict':str(res[0]), 'score': str(naive_bayes.score)})
        
        if(algorithm == 'neural_network'):
            res = neural_network.predict([float(data['rating']),float(data['review']),int(data['brand']),int(data['area'])])
            return jsonify({'predict':str(res[0]), 'score': str(neural_network.score)})
        
        if(algorithm == 'nearst_neighbors'):
            res = nearst_neighbors.predict([float(data['rating']),float(data['review']),int(data['brand']),int(data['area'])])
            return jsonify({'predict':str(res[0]), 'score': str(nearst_neighbors.score)})


api.add_resource(PredictPrice, '/<string:algorithm>')

if __name__ == '__main__':
    app.run(debug=True)
