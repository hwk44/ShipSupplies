import LeadtimeCount from '../components/charts/LeadtimeCount';
import CategoryCount from '../components/charts/CategoryCount';

const DataPage = () => {

  return (
    <div className = "flex flex-col p-12 justify-center items-center">
      <div className="flex flex-col justify-items-center items-center w-10/12 mb-11">
        <div className="text-lg text-center border w-fit p-3 rounded-xl border-blue-400 border-2">리드타임별 선용품 개수</div>
        <LeadtimeCount />
      </div>

      <div className="flex flex-col justify-items-center items-center w-10/12">
        <div className="text-lg text-center border w-fit p-3 rounded-xl border-green-600 border-2">카테고리별 선용품 개수</div>
        <CategoryCount />
      </div>
    </div>
  );
}
export default DataPage;