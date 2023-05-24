import { useState, useEffect, Link } from 'react';


const SearchBar = () => {
    let [search, setSearch] = useState([]);

    const mydata = [
        'apple',
        'banana',
        'coding',
        'javascript',
        '원티드',
        '프리온보딩',
        '프론트엔드',
    ]

    const updateChange = (e) => {
        let data = e.target.value;
        let filterData = mydata.filter((i) =>
            i.name.toLowerCase().includes(data.toLowerCase())
        );
        if (data.length === 0) {
            filterData = [];
        }
        setSearch(filterData);
    };

    return (
        <div className="search">
            <input
                className="seacrh-bar"
                style={{
                    width: "100%",
                    height: "40px",
                    maxWidth: "800px",
                    border: "1px solid white",
                }}
                placeholder="검색어를 입력하세요."
                onChange={(e) => updateChange(e)}
            ></input>
            {search.map((item) => {
                return (
                    <>
                        <div className="search-result">
                            <Link to={"/info/" + item.id}>
                                <p onClick={() => setSearch([])}>
                                    {item.name} ({item.kor_name})
                                </p>
                            </Link>
                        </div>
                    </>
                );
            })}
        </div>
    );
}
export default SearchBar;