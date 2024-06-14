from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load your trained model
with open('LinearRegressionModelCar.pkl', 'rb') as f:
    model = pickle.load(f)
# //

@app.route('/')
def hello_world():
      result=model.predict(pd.DataFrame([['Tata Zest XM','Tata',2019,100,'Petrol']],columns=['name','company','year','kms_driven','fuel_type']))
      result_list = result.tolist()
      return jsonify({'predicted_prices': result_list})
      

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features=[
        data['name'],
        data['company'],
        data['year'],
        data['kms_driven'],
        data['fuel_type']
    ]
    # print(features)
    result=model.predict(pd.DataFrame([features],columns=['name','company','year','kms_driven','fuel_type']))
    return jsonify(result.tolist())

if __name__ == '__main__':
    app.run(debug=True)


# test_data = pd.DataFrame([['Tata Zest XM', 'Tata', 2019, 100, 'Petrol']],
#                           columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'])

# predictions = model.predict(test_data)
# print(predictions)
