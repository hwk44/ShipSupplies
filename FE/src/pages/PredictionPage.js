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

        const token = localStorage.getItem('jwt');
        axios.post("/api/item/predict/classify", { machinery, assembly, partno1, item }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data); // 서버에서 반환한 데이터 출력
                // 성공적인 응답에 대한 추가 처리
            })
            .catch((error) => {
                console.log(error);
                // 요청 실패 시 에러 처리
            });
    };


    return (
        <>
            <h3>Classification Prediction</h3>
            <form className="predictionform" onSubmit={handlePred}>
                <div>
                    <TextField id="outlined-basic" label="Machinery" variant="outlined" value={machinery} onChange={(e) => setMachinery(e.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-basic" label="Assembly" variant="outlined" value={assembly} onChange={(e) => setAssembly(e.target.value)} required />
                </div>
                <div>
                    <TextField id="outlined-basic" label="Part No.1" variant="outlined" value={partno1} onChange={(e) => setPartno1(e.target.value)} required />
                </div>
                <div>
                    <TextField id="outlined-basic" label="Item" variant="outlined" value={item} onChange={(e) => setItem(e.target.value)} required />
                </div>
                <Button variant="contained" size="medium" type="submit">
                    분류 예측
                </Button>
            </form>
        </>
    );
}
export default PredictionPage;