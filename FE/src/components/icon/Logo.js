import {useNavigate} from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    return(
        <div className="logodiv" onClick={goHome}>
            <h1 className="h1" style={{fontSize : "1.4rem", marginTop : "20px", marginLeft : "-20px"}}>선용품 최적 구매발주 서비스</h1>
        </div>
    );
}
export default Logo;