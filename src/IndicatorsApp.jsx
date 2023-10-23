import {IndicatorCard} from "./components/IndicatorCard.jsx";
import {IndicatorDetails} from "./components/IndicatorDetails.jsx";
import {formatDateToLocale} from "./helpers/dateFormatter.js";
import {Loading} from "./components/Loader.jsx";
import {Footer} from "./components/Footer.jsx";
import {InfoMessage} from "./components/Alert.jsx";
import {Filters} from "./components/Filters.jsx";
import {Search} from "./components/Search.jsx";
import {useIndicators} from "./hooks/useIndicators.js";

const IndicatorsApp = () => {

  const {
    data,
    indicatorDetail,
    textSearch,
    loader,
    showDetails,
    hasErrors,
    handleSearchInputText,
    filterByUnit,
    handleShowDetails,
    handleClickIndicatorDetail
  } = useIndicators();

  const {loadingPage, loadingDetails} = loader;

  return (
    <div className="container my-4 bg-light rounded p-4">
      <h1>Indicadores Económicos Chile 🇨🇱</h1>
      <h4><i className="bi bi-calendar4"></i> {formatDateToLocale(new Date())}</h4>
      <hr/>
      <div className="row">
        <Search
          textSearch={textSearch}
          handleSearchInputText={handleSearchInputText}
        />
        <Filters
          filterByUnit={filterByUnit}
        />
      </div>
      <hr/>
      <div className="row row-cols-3">
        {
          loadingPage ?
            <Loading/> :
            data.map(indicator => (
              <IndicatorCard
                key={indicator["codigo"]}
                indicator={indicator}
                showDetails={showDetails}
                handleClickIndicatorDetail={handleClickIndicatorDetail}
                handleCloseDetails={handleShowDetails}
                handleShowDetails={handleShowDetails}
                indicatorDetail={indicatorDetail}
              />
            ))
        }
        {
          (data.length === 0) &&
          <InfoMessage message={'No hay resultados...'} variant={"info"}/>
        }
        {
          hasErrors.error &&
          <InfoMessage message={hasErrors.message} variant={"danger"}/>
        }
      </div>

      <IndicatorDetails
        showDetails={showDetails}
        handleCloseDetails={handleShowDetails}
        indicatorDetail={indicatorDetail}
        loadingDetails={loadingDetails}
      />

      <Footer/>
    </div>
  )
}

export default IndicatorsApp
