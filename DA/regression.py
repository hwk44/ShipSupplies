# from flask import Flask, request, jsonify, render_template, request, url_for
# import pickle
import joblib
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

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

new_X = ["DEO-E-210512-01", "0", "COOLER", "2N4727 INSTRUMNT PANEL GP", "KRW", "HAEIN Coporation_Cheonan"]

new_X = " ".join(new_X)

combined_sequence = tokenizer.texts_to_sequences([new_X])

# 시퀀스 패딩
combined_padded_sequence = pad_sequences(combined_sequence, maxlen=100)

# 예측
y_pred = model.predict(combined_padded_sequence)
# 원래 스케일로 되돌리기
y_pred_test = scaler.inverse_transform(y_pred)

print(round(y_pred_test[0][0]))
