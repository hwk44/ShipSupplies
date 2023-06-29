from flask import Flask, jsonify, render_template, request
import numpy as np
import joblib
import tensorflow as tf
import os
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)

@app.route('/')
def main():
	# home.html을 띄워준다.
    return render_template('home.html')



@app.route('/api/item/predict/classify', methods=['POST'])
def home():

    # loading pkl file
    # encoder = joblib.load(open('labelencoder_0629.pkl', 'rb'))
    # tokenizer = joblib.load(open('tokenizer_0629.pkl', 'rb'))
    # model = tf.keras.models.load_model('model_classification_0629.h5')

    encoder = joblib.load(open('./model/labelencoder_0629.pkl', 'rb'))

    # tokenizer
    tokenizer = joblib.load(open('./model/tokenizer_0629.pkl', 'rb'))

    # 모델 불러오기
    model = tf.keras.models.load_model("./model/model_classification_0629.h5")


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
    arr = [data1, data2, data3, data4, data5, data6]

    combined_sequence = tokenizer.texts_to_sequences([" ".join(datas)])

    max_len = 36
    combined_padded_sequence = pad_sequences(combined_sequence, maxlen=max_len)

    # 예측
    y_pred = model.predict(combined_padded_sequence)

    y_pred_result = encoder.inverse_transform(np.argmax(y_pred, axis=1))
    # 예측 값 디코딩
    # pred = label_encoders["key2"].inverse_transform(pred)
    return jsonify({"datas": datas, "pred": y_pred_result[0]})

@app.route('/api/item/predict/regression', methods=['POST'])
def home1():
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

    return jsonify({"datas": datas, "pred": round(float(pred[0][0]))}) # 반올림



# 플라스크 5000 번 에서 실행하는 코드. form 으로 4개 입력값을 받은 후에 결과값 확인
@app.route('/item/predict/classify', methods=['POST'])
def home_flask():
    print(os.getcwd())

    # loading pkl file
    encoder = joblib.load(open('labelencoder_0629.pkl', 'rb'))
    tokenizer = joblib.load(open('tokenizer_0629.pkl', 'rb'))
    model = tf.keras.models.load_model('model_classification_0629.h5')

    # form 입력에서 공백 제거
    data1 = request.form.get('a').strip()
    data2 = request.form.get('b').strip()
    data3 = request.form.get('c').strip()
    data4 = request.form.get('d').strip()
    data5 = request.form.get('e').strip()
    data6 = request.form.get('f').strip()

    datas = [data1, data2, data3, data4, data5, data6]
    # arr = [data1, data2, data3, data4, data5, data6]

    combined_sequence = tokenizer.texts_to_sequences([" ".join(datas)])

    max_len = 36
    combined_padded_sequence = pad_sequences(combined_sequence, maxlen=max_len)

    # 예측
    y_pred = model.predict(combined_padded_sequence)

    y_pred_result = encoder.inverse_transform(np.argmax(y_pred, axis=1))
    # 예측 값 디코딩 
    # pred = label_encoders["key2"].inverse_transform(pred)
    return render_template('after.html', datas=datas, pred=y_pred_result[0])


if __name__ == '__main__':
    # Flask 스타트
    app.run(host='0.0.0.0', port=5000, debug=True)