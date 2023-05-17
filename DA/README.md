# 데이터 설명 

## 데이터 전,후처리
1. 원본데이터(excel 파일 3개)  =>  data/original.py  =>  data/raw.csv

2. 데이터 전처리 raw.csv => notebooks/postprocessing.ipynb  => data/raw_postpro.csv

### 모델 생성 및 피클 저장

    model/model2.py를 실행하면 model_label_encoders.pkl, model_softmax.pkl 생성
    - `model_label_encoders` 는 LabelEncoder 객체가 담긴 -`딕셔너리 객체`가 저장되어 있고
    `model_softmax`는 인코딩 된 독립변수로 인코딩된 종속변수를 `분류하는 모델`이 저장되어 있습니다.

## 분류모델 예측 
 DA 폴더에서 `flask run` 명령어 => http://localhost:5000/ 접속 후 form Machinery, Assembly,Part No.1, 청구품목,을 입력하여 학습된 분류모델의 결과를 확인해주세요. 
 

## DataBase
    BE 담당자 요청으로 기존 데이터 중 필요로 하는 컬럼만을 db에 저장했습니다. (추후 중복 데이터 삭제 필요)
    database/to_db.py 실행하면 item table이 생성됩니다.
    