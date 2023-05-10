import pandas as pd
import numpy as np


# df = pd.read_csv('D:/ShipSupplies/DA/data/raw_postpro.csv', encoding='cp949')
df = pd.read_csv('../ShipSupplies/DA/data/raw_postpro.csv', encoding='cp949')

print(df.head())

# dataframe 라벨인코딩
from sklearn import preprocessing
from sklearn.model_selection import train_test_split

df = df.apply(preprocessing.LabelEncoder().fit_transform)
df
X = df[['Machinery', 'Assembly' , "Part No.1","청구품목"]]
y = df["key2"]
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=40, shuffle=True, test_size=0.3)

import xgboost as xgb
from sklearn.metrics import accuracy_score

# xgboost 모델 생성
model = xgb.XGBClassifier(objective='multi:softmax', num_class=61)

# 모델 학습
model.fit(X_train, y_train)

# 예측 결과 출력
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

from sklearn.metrics import f1_score
# 모델 예측
y_pred = model.predict(X_test)

# F1-score 계산
f1 = f1_score(y_test, y_pred, average='weighted')
print("F1-score:", f1)


import joblib
# 모델 pkl로 저장
joblib.dump(model, 'D:/ShipSupplies/DA/model/model_softmax.pkl')