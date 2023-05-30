from flask import Flask, request, jsonify, render_template, request, url_for
import numpy as np
import joblib
import joblib
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

@app.route('/')
def main():
	# home.html을 띄워준다.
    return render_template('home.html')



@app.route('/api/item/predict/classify', methods=['POST'])
def home():
    # loading pkl file
    model = joblib.load(open('./model/model_softmax.pkl', 'rb'))
    label_encoders = joblib.load(open('./model/model_label_encoders.pkl', 'rb'))

    # react 에서 form 으로 4개 값을 json 으로 보냄.
    data = request.get_json()

    # 공백 제거
    data1 = data['a'].strip()
    data2 = data['b'].strip()
    data3 = data['c'].strip()
    data4 = data['d'].strip()
    datas = [data1, data2, data3, data4]
    arr = [data1, data2, data3, data4]

    def encoding(arr): # 입력 data(arr) 인코딩 함수
        #  일반 list 인코딩 후 모델에 넣을수 있도록 np.array로 형태변환
        encoded_data = []
        for i in range(len(arr)):
            label = list(label_encoders.keys())[i]  # 라벨링할 열의 키
            encoder = label_encoders[label]  # 해당 열의 LabelEncoder 객체
            encoded_value = encoder.transform([arr[i]])[0]  # 데이터 라벨링
            encoded_data.append(encoded_value)

        # 형태변환 모델에 예측 값으로 넘길수 있도록
        encoded_data = np.array(encoded_data)
        encoded_data = encoded_data.reshape((1, 4))
        return encoded_data

    # arr 인코딩
    arr = encoding(arr)
    # 인코딩된 예측
    pred = model.predict(arr)
    # 예측 값 디코딩 
    pred = label_encoders["key2"].inverse_transform(pred)
    return jsonify({"datas": datas, "pred": pred[0]})

@app.route('/api/item/predict/regression', methods=['POST'])
def home():
    # loading pkl file
    # scaler
    scaler = joblib.load(open('./model/scaler.pkl', 'rb'))
    # tokenizer
    tokenizer = joblib.load(open('./model/tokenizer.pkl', 'rb'))
    # 모델 불러오기
    model = tf.keras.models.load_model("./model/model_regression.h5")
    # react 에서 form 으로 4개 값을 json 으로 보냄.
    data = request.get_json()

    # 공백 제거
    data1 = data['a'].strip()
    data2 = data['b'].strip()
    data3 = data['c'].strip()
    data4 = data['d'].strip()
    data5 = data['e'].strip()
    data6 = data['f'].strip()
    datas = [data1, data2, data3, data4, data5, data6]

    datas = " ".join(datas)

    combined_sequence = tokenizer.texts_to_sequences([datas])

    # 시퀀스 패딩
    combined_padded_sequence = pad_sequences(combined_sequence, maxlen=100)

    # 예측
    pred = model.predict(combined_padded_sequence)
    # 원래 스케일로 되돌리기
    pred = scaler.inverse_transform(pred)

    return jsonify({"datas": datas, "pred": pred[0][0]})


# 플라스크 5000 번 에서 실행하는 코드. form 으로 4개 입력값을 받은 후에 결과값 확인
@app.route('/item/predict/classify', methods=['POST'])
def home_flask():
    # loading pkl file
    model = joblib.load(open('./model/model_softmax.pkl', 'rb'))
    label_encoders = joblib.load(open('./model/model_label_encoders.pkl', 'rb'))

    # form 입력에서 공백 제거
    data1 = request.form.get('a').strip()
    data2 = request.form.get('b').strip()
    data3 = request.form.get('c').strip()
    data4 = request.form.get('d').strip()
    datas = [data1, data2, data3, data4]
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

    # arr 인코딩
    arr = encoding(arr)
    # 인코딩된 예측
    pred = model.predict(arr)
    # 예측 값 디코딩 
    pred = label_encoders["key2"].inverse_transform(pred)
    return render_template('after.html', datas=datas, pred=pred[0])


if __name__ == '__main__':
    # Flask 스타트
    app.run(host='0.0.0.0', port=5000, debug=True)
