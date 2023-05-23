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
            const response = await axios.post("/api/item/predict", { machinery, assembly, partno1, item });
            console.log(response.data); // 서버에서 반환한 데이터 출력
          } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <h3>Classification Prediction</h3>
            <form className="predictionform" onSubmit={handlePred}>
                <div>
                    < input type="text" id="machinery" value={machinery} placeholder="Machinery"
                        onChange={(e) => setMachinery(e.target.value)} required />
                </div>
                <div>
                    < input type="text" id="assembly" value={assembly} placeholder="Assembly"
                        onChange={(e) => setAssembly(e.target.value)} required />
                </div>
                <div>
                    < input type="text" id="partno1" value={partno1} placeholder="Part No.1"
                        onChange={(e) => setPartno1(e.target.value)} required />
                </div>
                <div>
                    < input type="text" id="item" value={item} placeholder="Item"
                        onChange={(e) => setItem(e.target.value)} required />
                </div>
                <button onClick={handlePred}>분류 예측</button>
            </form>
        </>
    );
}
export default PredictionPage;