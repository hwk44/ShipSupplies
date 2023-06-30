import joblib
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences


# scaler
encoder = joblib.load(open('./labelencoder_0629.pkl', 'rb'))

# tokenizer
tokenizer = joblib.load(open('./tokenizer_0629.pkl', 'rb'))

# 모델 불러오기
model = tf.keras.models.load_model("./model_classification_0629.h5")

# string = "CORE CHARGES FOR CYLINDER PACK AS, HAEIN Coporation_Cheonan, NO.2 GENERATOR ENGINE, 8N-6224 PISTON GP-ROD&, 7E-275, 0"
datas = ["CORE CHARGES FOR CYLINDER PACK AS", "HAEIN Coporation_Cheonan", " NO.2 GENERATOR ENGINE",
         "8N-6224 PISTON GP-ROD&", "7E-275", "0"]

combined_padded_sequence = tokenizer.texts_to_sequences([" ".join(datas)])
# print(combined_sequence)

max_len = 36
combined_padded_sequence = pad_sequences(combined_padded_sequence, maxlen = max_len)

# 예측
y_pred = model.predict(combined_padded_sequence)

y_pred_result = encoder.inverse_transform(np.argmax(y_pred, axis=1))

print(y_pred_result[0])

