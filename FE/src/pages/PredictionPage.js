import { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
            <h3>Classification Prediction</h3>
            <form className="predictionform" onSubmit={handlePred}>
                <div>
                    <TextField id="outlined-basic" label="Machinery" variant="outlined" onChange={(e) => setMachinery(e.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-basic" label="Assembly" variant="outlined" onChange={(e) => setAssembly(e.target.value)} required />
                </div>
                <div>
                    <TextField id="outlined-basic" label="Part No.1" variant="outlined" onChange={(e) => setPartno1(e.target.value)} required/>
                </div>
                <div>
                    <TextField id="outlined-basic" label="Item" variant="outlined" onChange={(e) => setItem(e.target.value)} required/>
                </div>
                <Button variant="contained" size="medium" type="submit">
                    분류 예측
                </Button>
            </form>
        </>
    );
}
export default PredictionPage;