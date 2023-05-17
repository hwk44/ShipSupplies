import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
# df = pd.read_csv('./data/raw_postpro.csv', encoding='cp949')
# df1 = df[['Machinery', 'Assembly' , "Part No.1","청구품목", 'key2']]

# print(df1)
# new_data = np.array(['SKIFF BOAT', 'IMPLANTATION INSTRUMENTS', '14.9795', 'EXHAUST GAS TEMPERATURE INDICATOR 0 TO 700℃'])
# col_name = ['Machinery', 'Assembly' , "Part No.1","청구품목", 'key2']
# for a,b in zip(new_data, col_name):
    # a = label_encoders[b].fit(a)

model = joblib.load(open('./model/model_softmax_0517.pkl', 'rb'))
label_encoders = joblib.load(open('./model/model_label_encoders_0517.pkl', 'rb'))
def encoding(arr):
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

arr = ['SKIFF BOAT', 'IMPLANTATION INSTRUMENTS', '14.9795', 'EXHAUST GAS TEMPERATURE INDICATOR 0 TO 700℃']
arr = encoding(arr)
pred = model.predict(arr)
pred = label_encoders["key2"].inverse_transform(pred)
print(pred)
# print(model.predict(arr))