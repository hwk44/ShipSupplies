import pandas as pd
df = pd.read_csv('../data/raw_postpro.csv')
df["견적화폐"] = df["견적화폐"].astype(str).str.strip()
df["견적단가"] = df["견적단가"].astype(str).str.replace(",", "")
df["견적단가"] = df["견적단가"].astype(int)
df["청구품목"] = df["청구품목"].str.strip()
df["청구품목"] = df["청구품목"].str.replace('"', '')
df["청구품목"] = df["청구품목"].str.replace("'", "")

df_product = df[["Assembly" ,"key2", "발주처", "견적화폐","청구품목", '리드타임',"Machinery" ,"Part No.1","Part No.2", "견적단가", '출고운반선','Subject','발주']].copy()
df_product['id'] = df_product.index
# 여러 컬럼명 변경
df_product.rename(columns={'청구품목': 'item',
                           '발주처': 'company',
                           "견적화폐": "currency",
                           '발주' : "date",
                           'Part No.1': 'part_No1',
                            'Part No.2' :'part_No2',
                           "리드타임" : "leadtime",
                           "key2" : "category",
                           "견적단가": "price",
                           "Subject" : "subject",
                           "출고운반선" : "ship"}, inplace=True)
df_product = df_product.set_index('id').reset_index()

from sqlalchemy import create_engine

# # MySQL 서버에 연결
engine = create_engine('mysql+mysqlconnector://root:1234@localhost:3306/ship')
#
# # 데이터프레임을 MySQL 데이터베이스에 저장
df_product.to_sql(name='item', con=engine, if_exists='append', index=False)