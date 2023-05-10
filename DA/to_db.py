# pip install pymysql sqlalchemy
from sqlalchemy import create_engine
import pymysql
import pandas as pd
db_connection_str = 'mysql+pymysql://root:qwer1234@localhost/upbit'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()
df_bitcoin.to_sql(name='upbit', con=db_connection, if_exists='append',index=False)