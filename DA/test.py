import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
df = pd.read_csv('./data/raw_postpro.csv', encoding='cp949')
df1 = df[['Machinery', 'Assembly' , "Part No.1","청구품목", 'key2']]

print(df1)
# new_data = np.array(['SKIFF BOAT', 'IMPLANTATION INSTRUMENTS', '14.9795', 'EXHAUST GAS TEMPERATURE INDICATOR 0 TO 700℃'])
# col_name = ['Machinery', 'Assembly' , "Part No.1","청구품목", 'key2']
# for a,b in zip(new_data, col_name):
    # a = label_encoders[b].fit(a)