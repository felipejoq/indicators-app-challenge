export const clpFormat = (value) => {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 2
  });

  return formatter.format(value)
}

export const percentFormat = (value) => {
  return `${Number(parseFloat(value))} %`
}