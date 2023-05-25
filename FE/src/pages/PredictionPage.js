import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PredictionPage = () => {
  const [machinery, setMachinery] = useState('');
  const [assembly, setAssembly] = useState('');
  const [partno1, setPartno1] = useState('');
  const [item, setItem] = useState('');
  const [prediction, setPrediction] = useState('');

  const token = localStorage.getItem('jwt');
  console.log('token', token);

  const handlePred = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        Machinery : machinery,
        Assembly : assembly,
        PartNo1 : partno1,
        Item : item,
    };

      console.log('requestBody', requestBody); // 확인: requestBody 값 출력

      const response = await axios.post(
        '/api/item/predict/classify',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("카테고리 값",response.data); // 서버에서 반환한 데이터 출력
      setPrediction(response.data); // 카테고리 값을 상태에 저장
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Classification Prediction</h3>
      <form className="predictionform" onSubmit={handlePred}>
        <div>
          <TextField
            id="machinery"
            label="Machinery"
            variant="outlined"
            value={machinery}
            onChange={(e) => setMachinery(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="assembly"
            label="Assembly"
            variant="outlined"
            value={assembly}
            onChange={(e) => setAssembly(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            id="partno1"
            label="Part No.1"
            variant="outlined"
            value={partno1}
            onChange={(e) => setPartno1(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            id="item"
            label="Item"
            variant="outlined"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        <Button variant="contained" size="medium" type="submit">
          분류 예측
        </Button>
      </form>


      {prediction && (
        <div>
          <h4>카테고리</h4>
          <p>{prediction.pred}</p>
        </div>
      )} 


    </>
  );
};

export default PredictionPage;
