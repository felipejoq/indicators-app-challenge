const url = `https://mindicador.cl/api`;

const cleanIndicatorsData = (result) => {
  const indicatorsMap = [];
  for (const indicator in result) {
    indicatorsMap.push(result[indicator]);
  }
  return indicatorsMap.filter(indicator => indicator["codigo"]);
}

export const getIndicators = async () => {
  const response = await fetch(`${url}`);
  const result = await response.json();
  return cleanIndicatorsData(result);
}

export const getIndicatorByCode = async (codigo) => {
  const response = await fetch(`${url}/${codigo}`);
  return await response.json();
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
    if (indicator["unidad_medida"] === unit) {
      return indicator;
    }
  });
}