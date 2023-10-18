export const Search = ({textSearch, handleSearchInputText}) => {
  return (
    <div className="col-12">
      <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>&nbsp;&nbsp;&nbsp;Buscar
            </span>
        <input
          type="text"
          className="form-control"
          placeholder="Escribir aquí..."
          onChange={handleSearchInputText}
          value={textSearch}
        />
      </div>
    </div>

  );
};