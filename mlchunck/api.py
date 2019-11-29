# Dependencies
from flask import Flask, request, jsonify
#from sklearn.externals import joblib
import traceback
import pandas as pd
import numpy as np
import pickle
import tensorflow as tf

# Your API definition
app = Flask(__name__)
graph = tf.get_default_graph()

@app.route('/predict', methods=['POST'])
def predict():
    global graph
    with graph.as_default():
        try:
            faouzi=np.genfromtxt("rawtest.csv",delimiter=",")
            #faouzi
            f =faouzi.reshape(47,187,1)
            #data=pd.DataFrame(faouzi)
            #data =data.reshape(47,187,1)
            print(f)
            y_predf = model.predict(f)
            model._make_predict_function()
            print(list(y_predf))
            #json_ = request.json
            #print(json_)
            #query = pd.get_dummies(pd.DataFrame(json_))
            #query = query.reindex(columns=model_columns, fill_value=0)


            #prediction = list(lr.predict(f, batch_size=1000))
            return jsonify({'prediction': str(y_predf)})

        except:

            return jsonify({'trace': traceback.format_exc()})
    

if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 12345 # If you don't provide any port the port will be set to 12345

    model = pickle.load(open("file.pkl","rb")) # Load "model.pkl"
    print ('Model loaded')
    #model_columns = joblib.load("model_columns.pkl") # Load "model_columns.pkl"
    #print ('Model columns loaded')

    app.run(port=port, debug=True)