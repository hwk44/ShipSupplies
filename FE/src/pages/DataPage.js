import LeadtimeCount from '../components/charts/LeadtimeCount';
import CategoryCount from '../components/charts/CategoryCount';

const DataPage = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '100px' }}>

      <div style={{marginBottom: '60px'}}>
        <h2>리드타임별 선용품 개수</h2>
        <LeadtimeCount style={{ width: '80%' }} />
      </div>

      <div>
        <h2>카테고리별 선용품 개수</h2>
        <CategoryCount />
      </div>
    </div>
  );
}
export default DataPage;