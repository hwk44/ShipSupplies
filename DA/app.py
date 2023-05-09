from flask import Flask, request, jsonify, render_template, request, url_for
import pickle
import numpy as np
import json

model_categoricalNB = pickle.load(open('model/model_categoricalNB.pkl', 'rb'))

app = Flask(__name__)
# 기본주소에서 일어나는 일
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

# predict 페이지에서는 POST라는 method가 사용될 것이다.
@app.route('/predict', methods=['POST'])
def home():
    data1 = request.form['a']
    data2 = request.form['b']
    data3 = request.form['c']
    data4 = request.form['d']
    arr = np.array([[data1, data2, data3, data4]])
    pred = model_categoricalNB.predict(arr)
    # 보여줄 페이지 그리고 어떤 데이터를 넘길지에 대해서 확인한다....
    # 모델이 예측한 결과를 넘겨서 그 값에 따라 if문을 작성하게 한다.
    return render_template('after.html', data=pred)


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

@app.route('/calculate', methods=['POST', 'GET'])
def calculate(num=None):
    ## 어떤 http method를 이용해서 전달받았는지를 아는 것이 필요함
    ## 아래에서 보는 바와 같이 어떤 방식으로 넘어왔느냐에 따라서 읽어들이는 방식이 달라짐
    if request.method == 'POST':
        params = {}
        params['num'] = request.form.get['num']
        params['char1']  = request.form.get['char1']
        return jsonify(json.dumps(params))
        pass
    elif request.method == 'GET':
        ## 넘겨받은 숫자 
        temp = request.args.get('num')
        temp = int(temp)
        ## 넘겨받은 문자
        temp1 = request.args.get('char1')
        ## 넘겨받은 값을 원래 페이지로 리다이렉트
        return render_template('app.html', num=temp, char1=temp1)
    
    
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
