import { useEffect, useState } from 'react';
import axios from 'axios';


const PredictionPage = () => {
    const [machinery, setMachinery] = useState("");
    const [assembly, setAssembly] = useState("");
    const [partno1, setPartno1] = useState("");
    const [item, setItem] = useState("");

    const handlePred = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/item/predict/classify", { machinery, assembly, partno1, item });
            console.log(response.data); // 서버에서 반환한 데이터 출력
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Classification Prediction
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" onSubmit={handlePred}>
                    <div>
                        <label htmlFor="machinery" className="block text-sm font-medium leading-6 text-gray-900">
                            Machinery
                        </label>
                        <div className="mt-2">
                            <input
                                id="machinery"
                                name="machinery"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setMachinery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="assembly" className="block text-sm font-medium leading-6 text-gray-900">
                            Assembly
                        </label>
                        <div className="mt-2">
                            <input
                                id="assembly"
                                name="assembly"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setAssembly(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="partno1" className="block text-sm font-medium leading-6 text-gray-900">
                            Part No.1
                        </label>
                        <div className="mt-2">
                            <input
                                id="partno1"
                                name="partno1"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPartno1(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="item" className="block text-sm font-medium leading-6 text-gray-900">
                            Item
                        </label>
                        <div className="mt-2">
                            <input
                                id="item"
                                name="item"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setItem(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handlePred}
                        >
                            분류 예측
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
export default PredictionPage;