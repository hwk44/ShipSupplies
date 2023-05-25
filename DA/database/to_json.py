import pandas as pd
import numpy as np

df = pd.read_csv('../data/raw_postpro.csv')

y = df["key2"]
sorted_df_y = y.sort_values( ascending=True)
y = sorted_df_y.unique()
# ndarray를 리스트로 변환
y = y.tolist()
print(y)
import json

# JSON 파일 경로
file_path = './category.json'

# 리스트를 JSON 형식으로 직렬화하여 파일에 저장
with open(file_path, 'w') as file:
    json.dump(y, file)

z = df["청구품목"]

z = df["청구품목"].str.strip()
sorted_df_z = z.sort_values(ascending=True)
z = sorted_df_z.unique()
# ndarray를 리스트로 변환
z = z.tolist()
print(z)
print(len(z))

import json

# JSON 파일 경로
file_path = './items.json'

# 리스트를 JSON 형식으로 직렬화하여 파일에 저장
with open(file_path, 'w') as file:
    json.dump(z, file)

import json

# 좌우 공백, " , ' 제거
df["청구품목"] = df["청구품목"].str.strip()
df["청구품목"] = df["청구품목"].str.replace('"', '')
df["청구품목"] = df["청구품목"].str.replace("'", "")


# 중복 항목 제거
df_unique = df.drop_duplicates(subset=["key2", "청구품목"])

# 아이템 그룹화
grouped_data = df_unique.groupby("key2")["청구품목"].apply(list).reset_index()
grouped_data_dict = dict(zip(grouped_data["key2"], grouped_data["청구품목"]))
# print(grouped_data_dict)
sum = 0
for category, items in grouped_data_dict.items():
    print(f"{category}: {len(items)}")
    sum += len(items)
print(sum)

# JSON 파일로 저장
# JSON 파일로 저장
with open("items.json", "w") as file:
    json.dump(grouped_data_dict, file, indent=4)