import './Pagination.css';

const Pagination = ({ limit, setOffset }) => {
    return (
        <div className="pagination">
            {Array(9).fill().map((_, index) => (
            <a className="page" key={index} onClick={() => setOffset(limit * index)}>
                {index + 1}
            </a>
        ))}
        </div>
    );
};

export default Pagination;