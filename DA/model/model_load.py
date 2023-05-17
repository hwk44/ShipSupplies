import joblib
import numpy as np


with open('model_softmax_0517.pkl', 'rb') as f:
    model = joblib.load(f)
with open('model_label_encoders_0517.pkl', 'rb') as f:
    label_encoders = joblib.load(f)

# 새로운 입력으로 들어올 데이터
data = ['SKIFF BOAT', 'IMPLANTATION INSTRUMENTS', '14.9795', 'EXHAUST GAS TEMPERATURE INDICATOR 0 TO 700℃']
# data = np.array(data)
# print(type(data))

# 새 입력 데이터를 인코딩해서 저장할 list
encoded_data = []
for i in range(len(data)):
    label = list(label_encoders.keys())[i]  # 라벨링할 열의 키
    encoder = label_encoders[label]  # 해당 열의 LabelEncoder 객체
    encoded_value = encoder.transform([data[i]])[0]  # 데이터 라벨링
    encoded_data.append(encoded_value)

# 인코딩 데이터 model에 넣을수 있도록 형태 변환
print(type(encoded_data))
encoded_data = np.array(encoded_data)
encoded_data = encoded_data.reshape((1,4))
print(type(encoded_data))
# encoded_data

# np.array([[148, 1248, 1703, 1887]])

# 예측 값 넣고 디코딩
pred = model.predict(encoded_data)
pred = label_encoders["key2"].inverse_transform(pred)
print(pred)
# print(label_encoders)

