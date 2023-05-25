import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
df = pd.read_csv('../data/raw_postpro.csv')
df1 = df[['Machinery', 'Assembly' , "Part No.1","청구품목", 'key2']].copy()
print(df1)

from sklearn.preprocessing import LabelEncoder

# # 기존 데이터프레임의 라벨 인코딩 방식 확인
label_encoders = {}  # 각 열에 대한 LabelEncoder를 저장하기 위한 딕셔너리
columns_to_encode = ['Machinery', 'Assembly' , "Part No.1","청구품목", 'key2']  # 인코딩을 수행할 열의 이름 리스트

for column in columns_to_encode:
    le = LabelEncoder()
    le.fit(df1[column])
    label_encoders[column] = le # 딕셔너리에 저장
    df1[column+"_encoded"] = le.transform(df1[column]) # 새로운 encoding 된 컬럼 추가

print(df1)
print(type(label_encoders))

X = df1[['Machinery_encoded', 'Assembly_encoded', "Part No.1_encoded", '청구품목_encoded']] # 학습할 독립변수
y = df1["key2_encoded"] # 학습할 정답
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=40, shuffle=True, test_size=0.3)
#
import xgboost as xgb

# xgboost 모델 생성
model = xgb.XGBClassifier(objective='multi:softmax', num_class=61)

# 모델 학습
model.fit(X_train, y_train)

import joblib
# 모델 pkl로 저장
joblib.dump(model, './model_softmax.pkl')
# label_encoders 딕셔너리 pkl 저장
joblib.dump(label_encoders, './model_label_encoders.pkl')