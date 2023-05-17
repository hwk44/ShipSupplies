from flask import Flask, request, jsonify, render_template, request, url_for
import pickle
import numpy as np
import json
import joblib

app = Flask(__name__)

@app.route('/')
def main():
	# home.html을 띄워준다.
    return render_template('home.html')


# predict 페이지에서는 POST method로 값 넘기기
@app.route('/predict', methods=['POST'])
def home():
    # import pkl
    model = joblib.load(open('./model/model_softmax_0517.pkl', 'rb'))
    label_encoders = joblib.load(open('./model/model_label_encoders_0517.pkl', 'rb'))

    # form 입력에서 공백 제거
    data1 = request.form['a'].strip()
    data2 = request.form['b'].strip()
    data3 = request.form['c'].strip()
    data4 = request.form['d'].strip()
    arr = [data1, data2, data3, data4]

    def encoding(arr): # 입력 data(arr) 인코딩 함수
        #  일반 list 인코딩 후 모델에 넣을수 있도록 np.array로 형태변환
        encoded_data = []
        for i in range(len(arr)):
            label = list(label_encoders.keys())[i]  # 라벨링할 열의 키
            encoder = label_encoders[label]  # 해당 열의 LabelEncoder 객체
            encoded_value = encoder.transform([arr[i]])[0]  # 데이터 라벨링
            encoded_data.append(encoded_value)

        # 형태변환
        encoded_data = np.array(encoded_data)
        encoded_data = encoded_data.reshape((1, 4))
        return encoded_data

    arr = encoding(arr)
    pred = model.predict(arr)
    pred = label_encoders["key2"].inverse_transform(pred)
    return render_template('after.html', data=pred[0])


if __name__ == '__main__':
    # Flask 스타트
    app.run(host='0.0.0.0', port=5000, debug=True)
