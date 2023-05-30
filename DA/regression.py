# from flask import Flask, request, jsonify, render_template, request, url_for
# import pickle
import joblib
import tensorflow as tf
# import tensorflow.compat.v1 as tf
# import tensorflow_probability as tfp

# scaler
scaler = joblib.load(open('./model/scaler.pkl', 'rb'))

# tokenizer
tokenizer = joblib.load(open('./model/tokenizer.pkl', 'rb'))

# 모델 불러오기
model = tf.keras.models.load_model("./model/model_regression.h5")

# 모델 로드
# with open("./model/model_regression_architecture.json", "r") as json_file:
#     loaded_model_architecture = json_file.read()
#
# model = model_from_json(loaded_model_architecture)
# model.load_weights("./model/model_regression_weights.h5")


# x 는 6개 입력을 받음
# Subject,출고운반선, key2, Assembly, 견적화폐, 발주처

# DEO-E-210512-01, 0, COOLER, 2N4727 INSTRUMNT PANEL GP,
# KRW,HAEIN Coporation_Cheonan
#

# new_X = ["DEO-E-210512-01", "0", "COOLER", "2N4727 INSTRUMNT PANEL GP", "KRW", "HAEIN Coporation_Cheonan"]

new_X = [
    "DEO-E-210512-01",
    "0",
    "COOLER",
    "2N4727 INSTRUMNT PANEL GP",
    "KRW",
    "HAEIN Coporation_Cheonan"
]
new_X = [" ".join(row) for row in new_X]

combined_sequence = tokenizer.texts_to_sequences([new_X])

# 시퀀스 패딩
combined_padded_sequence = pad_sequences(combined_sequence, maxlen=100)

# 예측
y_pred = model.predict(combined_padded_sequence)
# 원래 스케일로 되돌리기
y_pred_test = scaler.inverse_transform(y_pred)

print(y_pred_test[0][0])

'''
# loading pkl file
# 회귀 모델
import tensorflow as tf

# experimental_io_device 옵션 설정
load_options = tf.saved_model.LoadOptions(experimental_io_device='/job:localhost')

# 지정된 옵션으로 모델 로드
# model = tf.saved_model.load('./model/model_regression.pkl', options=load_options)
# model = joblib.load(open('./model/model_regression.pkl', 'rb'))

# SavedModel 디렉토리의 올바른 경로를 제공합니다.
model_path = './model/model_regression'

# SavedModel 로드
model = tf.saved_model.load(model_path)


print(new_X)
# x 값을 벡터화 하는 시퀀스
# sequences = joblib.load(open('../model/sequences.pkl', 'rb'))

# tokenizer
tokenizer = joblib.load(open('./model/tokenizer.pkl', 'rb'))

# tokenizer = Tokenizer()
tokenizer.fit_on_texts(new_X)
sequences = tokenizer.texts_to_sequences(new_X)
#
from tensorflow.keras.preprocessing.sequence import pad_sequences
new_padded_sequences = pad_sequences(sequences, maxlen=100)

print(new_padded_sequences)
pred = model.predict(new_padded_sequences)
print(pred)
#
# # 정규화객체 scaler
# scaler = joblib.load(open('./model/scaler.pkl', 'rb'))
'''