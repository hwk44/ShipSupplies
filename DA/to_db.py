import pandas as pd
df = pd.read_csv('./data/raw_postpro.csv', encoding='cp949')
df_product = df[["Assembly" ,"key2", "발주처","청구품목", '리드타임',"Machinery" ,"Part No.1"]].copy()
df_product['seq'] = df_product.index
# 여러 컬럼명 변경
df_product.rename(columns={'청구품목': 'item', '발주처': 'company', 'Part No.1': 'partNo1',"리드타임" : "leadtime", "key2" : "category"}, inplace=True)
df_product = df_product.set_index('seq').reset_index()

from sqlalchemy import create_engine

# # MySQL 서버에 연결
engine = create_engine('mysql+mysqlconnector://root:1234@localhost:3306/project')
#
# # 데이터프레임을 MySQL 데이터베이스에 저장
df_product.to_sql(name='product', con=engine, if_exists='replace', index=False)