import { useState } from 'react';
import axios from 'axios';

const RegressionPage = () => {
  const [subject, setSubject] = useState("");
  const [shipcarrier, setShipcarrier] = useState(''); 
  const [key2, setKey2] = useState('');
  const [assembly, setAssembly] = useState('');
  const [currency, setCurrency] = useState(''); 
  const [client, setClient] = useState(''); 
  const [regression, setRegression] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState('');

  const handlePred = async (e) => {
    setIsLoading(true); 
    e.preventDefault();

    try {
      const requestBody = {
        subject: subject,
        ship: shipcarrier,
        key2: key2,
        assembly: assembly,
        currency: currency,
        company: client,
      };

      // console.log('requestBody', requestBody); 

      const response = await axios.post(
        '/api/item/predict/regression',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // console.log("카테고리 값", response.data);
      setRegression(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 " >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Leadtime Prediction
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handlePred}>
            <div className="mt-2">
              <input
                id="subject"
                name="subject"
                value={subject}
                type="text"
                required
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="shipcarrier"
                name="shipcarrier"
                value={shipcarrier}
                type="text"
                required
                onChange={(e) => setShipcarrier(e.target.value)}
                placeholder="출고운반선"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="key2"
                name="key2"
                value={key2}
                type="text"
                required
                onChange={(e) => setKey2(e.target.value)}
                placeholder="Key2"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="currency"
                name="currency"
                value={currency}
                type="text"
                required
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="견적화폐"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="client"
                name="client"
                value={client}
                type="text"
                required
                onChange={(e) => setClient(e.target.value)}
                placeholder="발주처"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2">
              <input
                id="item"
                type="text"
                value={item}
                required
                onChange={(e) => setItem(e.target.value)}
                placeholder="청구품목"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isLoading? '리드타임을 예측하고 있습니다...': '리드타임 예측'}
              </button>
            </div>
          </form>
        </div>

        {regression && (
        <>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-row justify-center">
            <p className="text-xl font-semibold leading-7 tracking-tight text-blue-500 ">{item}</p>
            &nbsp;&nbsp;
            <p className="text-xl leading-7 tracking-tight text-gray-900">의</p>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-row justify-center">
            <p className="text-xl  leading-7 tracking-tight text-gray-900">예상 리드타임은 </p> &nbsp;&nbsp; 
            <p className="text-2xl font-semibold leading-7 text-blue-500">
              {regression.pred}일
            </p>&nbsp;&nbsp;
            <p className="text-xl ">입니다.</p> 
          </div>
          </>  
          

          )}

      </div>
    </>
  );
}
export default RegressionPage;