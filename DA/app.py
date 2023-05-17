from flask import Flask, request, jsonify, render_template, request, url_for
import pickle
import numpy as np
import json
import joblib


app = Flask(__name__)

# 메인 페이지 home.html
@app.route('/')
def main():
	# home.html을 띄워준다.
    return render_template('home.html')

# @app.route('/')
# def main_get(num=None):
#     return render_template('app.html', num=num)

# @app.route('/api/predict/<params>', methods=['GET'])
# def get_params(params):
#     return jsonify({"params" : params})


# predict 페이지에서는 POST method로 값 넘기기
@app.route('/predict', methods=['POST'])
def home():
    data1 = request.form['a']
    data2 = request.form['b']
    data3 = request.form['c']
    data4 = request.form['d']
    arr = np.array([[data1, data2, data3, data4]])
    pred = model.predict(arr)
    # pred = model.predict(encoded_data)
    pred = label_encoders["key2"].inverse_transform(pred)
    print(pred)
    return render_template('after.html', data=pred)

@app.route('/predict', methods=['GET'])
def predict():
    return render_template('after.html')

if __name__ == '__main__':
    # model, label encoders 딕셔너리 로딩
    model = joblib.load(open('./model/model_softmax.pkl', 'rb'))
    label_encoders = joblib.load(open('./model/model_label_encoders_0517.pkl', 'rb'))
    # Flask 스타트
    app.run(host='0.0.0.0', port=5000, debug=True)

# @app.route('/api/predict', methods=['POST','GET'])
# def predict():
#     # params = json.loads(request.json(), encoding='utf-8')
#     # params = request.get_json()
    
#     char1 = request.form.get('char1')
#     num = request.form.get('num')
#     params = {}
#     params['char1'] = char1
#     params['num'] = num
#     params = json.dumps(params)
#     return render_template('app.html', num=num)

# @app.route('/calculate', methods=['POST', 'GET'])
# def calculate(num=None):
#     ## 어떤 http method를 이용해서 전달받았는지를 아는 것이 필요함
#     ## 아래에서 보는 바와 같이 어떤 방식으로 넘어왔느냐에 따라서 읽어들이는 방식이 달라짐
#     if request.method == 'POST':
#         params = {}
#         params['num'] = request.form.get['num']
#         params['char1']  = request.form.get['char1']
#         return jsonify(json.dumps(params))
#         pass
#     elif request.method == 'GET':
#         ## 넘겨받은 숫자
#         temp = request.args.get('num')
#         temp = int(temp)
#         ## 넘겨받은 문자
#         temp1 = request.args.get('char1')
#         ## 넘겨받은 값을 원래 페이지로 리다이렉트
#         return render_template('app.html', num=temp, char1=temp1)
    
    
    ## else 로 하지 않은 것은 POST, GET 이외에 다른 method로 넘어왔을 때를 구분하기 위함
    # return jsonify(params)
    # params_str = ''
    # for key in params.keys():
        # params_str += 'key: {}, value: {}<br>'.format(key, params[key])
    # return params_str
    # content = request.json
    # print(content)
    # Sex = content['Sex']
    # Age = content['Age']
    # # return jsonify({'prediction': str(prediction)})
    # return jsonify(content)
    
# @app.route('/create', methods=['POST'])
# def create():
#     print(request.is_json)
#     params = request.get_json()
#     print(params['user_id'])
#     return 'ok'
