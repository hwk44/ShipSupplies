import { useEffect, useState } from 'react';
import axios from 'axios';

const RegressionPage = () => {
  const [subject, setSubject] = useState("");
  const [shipcarrier, setShipcarrier] = useState(''); // 출고운반선
  const [key2, setKey2] = useState('');
  const [assembly, setAssembly] = useState('');
  const [currency, setCurrency] = useState(''); // 견적화폐
  const [client, setClient] = useState(''); // 발주처
  const [regression, setRegression] = useState('');

  const token = localStorage.getItem('jwt');
  console.log('token', token);

  const handlePred = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        Subject: subject,
        ship: shipcarrier,
        key2: key2,
        Assembly: assembly,
        currency: currency,
        company: client,
      };

      console.log('requestBody', requestBody); // 확인: requestBody 값 출력

      const response = await axios.post(
        '/api/item/predict/regression',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("카테고리 값", response.data);
      setRegression(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Regression
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
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                placeholder="Shipcarrier"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                placeholder="Currency"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                placeholder="Client"
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                회귀 예측
              </button>
            </div>
          </form>
        </div>

        {regression && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-row">
            <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">예상 리드타임 -</h3> &nbsp;
            <h3 className="text-lg font-semibold leading-7 text-indigo-600">
              {regression.pred}일
            </h3>
          </div>
        )}

      </div>
    </>
  );
}
export default RegressionPage;