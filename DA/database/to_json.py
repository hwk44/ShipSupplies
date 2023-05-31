import pandas as pd
import numpy as np

df = pd.read_csv('../data/raw_postpro.csv', encoding='cp949')

df["청구품목"] = df["청구품목"].str.strip()
df["청구품목"] = df["청구품목"].str.replace('"', '')
df["청구품목"] = df["청구품목"].str.replace("'", "")


# 각 컬럼의 중복 제거된 값들을 모은 딕셔너리 생성
unique_dict = {}
for col in ['발주처', '청구품목', 'key2']:
    unique_dict[col] = df[col].drop_duplicates().tolist()

(unique_dict)

for k in unique_dict.keys() :
    # print(unique_dict[k])
    print(k)

# import json
# # # JSON 파일 경로
# file_path = './datas.json'
# # 리스트를 JSON 형식으로 직렬화하여 파일에 저장
# with open(file_path, 'w',  encoding='utf-8') as file:
#      json.dump(unique_dict, file, ensure_ascii=False, indent=4)



# y = df["key2"]
# sorted_df_y = y.sort_values( ascending=True)
# y = sorted_df_y.unique()
# # ndarray를 리스트로 변환
# y = y.tolist()
# print(y)
#
# import json
# # JSON 파일 경로
# file_path = './category.json'
#
# # 리스트를 JSON 형식으로 직렬화하여 파일에 저장
# with open(file_path, 'w') as file:
#     json.dump(y, file)



import json

# 청구품목만 js 파일로 저장
# 좌우 공백, " , ' 제거
# df["청구품목"] = df["청구품목"].str.strip()
# df["청구품목"] = df["청구품목"].str.replace('"', '')
# df["청구품목"] = df["청구품목"].str.replace("'", "")
# df_unique = df.drop_duplicates(subset=["청구품목"])["청구품목"].tolist()
# print(len(df_unique))

# import json
# JSON 파일 경로
# file_path = './itemnames.json'

# 리스트를 JSON 형식으로 직렬화하여 파일에 저장
# with open(file_path, 'w',  encoding='utf-8') as file:
#     json.dump(df_unique, file, ensure_ascii=False, indent=4)



# 발주처 json 파일 저장
# df["발주처"] = df["발주처"].str.strip()
# df_unique = df.drop_duplicates(subset=["발주처"])["발주처"].tolist()
# print(df_unique)
#
# import json
# JSON 파일 경로
# file_path = './company.json'

# 리스트를 JSON 형식으로 직렬화하여 파일에 저장
# with open(file_path, 'w', encoding='utf-8') as file:
#     json.dump(df_unique, file, ensure_ascii=False, indent=4)

# # 중복 항목 제거
# df_unique = df.drop_duplicates(subset=["key2", "청구품목"])
#
# # 아이템 그룹화
# grouped_data = df_unique.groupby("key2")["청구품목"].apply(list).reset_index()
# grouped_data_dict = dict(zip(grouped_data["key2"], grouped_data["청구품목"]))
# # print(grouped_data_dict)
# sum = 0
# for category, items in grouped_data_dict.items():
#     print(f"{category}: {len(items)}")
#     sum += len(items)
# print(sum)
#
# # JSON 파일로 저장
# with open("items.json", "w") as file:
#     json.dump(grouped_data_dict, file, indent=4)



