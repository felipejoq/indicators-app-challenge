export const clpFormat = (value) => {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 2
  });

  return formatter.format(value)
}

export const usdFormat = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  });

  return formatter.format(value)
}

export const percentFormat = (value) => {
  return `${Number(parseFloat(value))} %`
}

export const valueFormat = (value, un) => {
  if(un === "Pesos"){
    return clpFormat(value);
  }
  if(un === "Dólar"){
    return usdFormat(value)
  }
  if (un === "Porcentaje") {
    return percentFormat(value)
  }

  return value;
}