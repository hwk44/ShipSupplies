# 데이터 설명 
    이미 라벨링이 되어있는 데이터를 사용해야 하므로 동원산업통합_분류_1_RE.csv를 사용했습니다.

## 데이터 후처리
    동원산업통합_분류_1_RE.csv =>  notebooks/postprocessing.ipynb =>  data/raw_postpro.csv


### 모델 생성 및 피클 저장

    model/model1.py를 실행하면 model_label_encoders.pkl, model_softmax.pkl 생성
    `model_label_encoders` 는 LabelEncoder 객체가 담긴 -`딕셔너리 객체`가 저장되어 있고
    `model_softmax`는 인코딩 된 독립변수로 인코딩된 종속변수를 `분류하는 모델`이 저장되어 있습니다.

## 분류모델 예측 

  - 독립변수 : 기업에서 선용품을 구분하는 4개의 컬럼  "Machinery", "Assembly", "Part No.1", "청구품목"
  - 종속변수 : 라벨링 되어있는 컬럼 "key2"
 DA 폴더에서 `flask run` 명령어 => http://localhost:5000/ 접속 후 form Machinery, Assembly,Part No.1, 청구품목,을 입력하여 학습된 분류모델의 결과를 확인해주세요. 
 

## DataBase
    BE 담당자 요청으로 기존 데이터 중 필요로 하는 컬럼만을 db에 저장했습니다. (추후 중복 데이터 삭제 필요)
    database/to_db.py 실행하면 item table이 생성됩니다.
    