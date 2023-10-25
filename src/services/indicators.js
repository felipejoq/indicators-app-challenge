const errorMessage = 'Error al obtener los datos del servicio. Intente más tarde.'

const cleanIndicatorsData = (result) => {
  const indicatorsMap = [];
  for (const indicator in result) {
    indicatorsMap.push(result[indicator]);
  }
  return indicatorsMap.filter(indicator => indicator["codigo"]);
}

export const getIndicators = async (url, all = true) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage)
  }
  if (all) {
    return cleanIndicatorsData(await response.json());
  } else {
    return await response.json();
  }
}

export const getIndicatorByTerm = (term, indicators = []) => {
  return indicators.filter(indicator => {
    for (const key in indicator) {
      if (indicator[key].toString().toLowerCase().includes(term.toLowerCase().trim())) {
        return indicator;
      }
    }
  });
}

export const getIndicatorByUnit = (unit, indicators) => {
  return indicators.filter(indicator => {
    if (unit !== "Todos") {
      if (indicator["unidad_medida"] === unit) {
        return indicator;
      }
    } else {
      return indicators;
    }
  });
}