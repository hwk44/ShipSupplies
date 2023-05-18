# ShipSupplies
> 선용품 최적 구매발주 데이터 로 선용품의 카테고리를 분류하고
<br> 품목별 예상되는 리드타임을 예측 하는 것이 목표입니다.

## 구조
 - DA, 데이터 분석 관련
 - FE, 사용자 입력 및 시각화 관련
 - BE, 인증 및 권한 그리고 API 관련

### 실행

1. DA 서비스 
```
$ .\venv\Scripts\activate
$ (venv) cd DA
$ (venv) pip install -r requirements.txt
$ (venv) flask run
```
> http://localhost:5000/predict 에서 분류모델 예측

2. BE 서비스 실행
```
1. 이 레포지토리를 git clone합니다.
2. IDE를 실행하여 ShipSupplies -> BE -> shiplsupply 폴더를 여세요.
3. application.yml에서 아래와 같이 수정합니다
    spring:
      datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/ship?serverTimezone=Asia/Seoul
        username: root
        password: 1234
4. MySQL 워크벤치를 켜서 ship 데이터베이스를 생성합니다.
5. 스프링부트 서버를 실행하면 데이터베이스에 테이블이 자동으로 생성됩니다.
```
3. FE 서비스 실행
```
  cd FE
  npm start
```


