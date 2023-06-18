import LeadtimeCount from '../components/data/LeadtimeCount';
import CategoryCount from '../components/data/CategoryCount';

const DataPage = () => {

  return (
      <div style={{display : 'flex', flexDirection : 'column', padding : '100px'}}>
        <h2>리드타임별 선용품 개수</h2>
        <LeadtimeCount style={{width:'80%'}} />
        <h2>카테고리별 선용품 개수</h2>
        <CategoryCount />
      </div>
  );
}
export default DataPage;