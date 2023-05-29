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
        Machinery: machinery,
        Assembly: assembly,
        PartNo1: partno1,
        Item: item,
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

      console.log("카테고리 값", response.data); // 서버에서 반환한 데이터 출력
      setPrediction(response.data); // 카테고리 값을 상태에 저장
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      {/* <h3>Classification Prediction</h3>
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
      </form> */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Classification Prediction
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handlePred}>
            <div className="mt-2">
              <input
                id="machinery"
                name="machinery"
                value={machinery}
                type="text"
                required
                onChange={(e) => setMachinery(e.target.value)}
                placeholder="Machinery"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="assembly"
                name="assembly"
                value={assembly}
                type="text"
                required
                onChange={(e) => setAssembly(e.target.value)}
                placeholder="Assembly"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="partno1"
                name="partno1"
                value={partno1}
                type="text"
                required
                onChange={(e) => setPartno1(e.target.value)}
                placeholder="Part No.1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="item"
                name="item"
                value={item}
                type="text"
                required
                onChange={(e) => setItem(e.target.value)}
                placeholder="Item"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                분류 예측
              </button>
            </div>
          </form>
        </div>
      </div>


      {prediction && (
        <div className="sm:max-w-lg">
          <h4>카테고리</h4>
          <p className="mt-4 text-xl text-gray-500">
            {prediction.pred}
          </p>
        </div>
      )}


    </>
  );
};

export default PredictionPage;
