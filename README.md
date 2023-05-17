# ShipSupplies
> 선용품 최적 구매발주 데이터
  품목별 발주시간 예측
  품목 분류

## 구조
 - DA, 데이터 분석 관련
 - FE, 사용자 입력 및 시각화 관련
 - BE, 인증 및 권한 그리고 API 관련

### 실행

1. DA 서비스 
```
$ (venv) cd DA
$ (venv) flask run
```
> http://localhost:5000 에서 예시 데이터 입력해주세요.

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

 - DA에서 `localhost:5000/predict `
   ```python
   $
   ```
    
 - BE, `localhost:8080/api/...`
    - 권한(profile)
    - 인증(login)
    - API(user, history,)
    
- FE, `localhost:3000`
    - ...


