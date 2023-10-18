export const formatDateToLocale = (date) => {
  return new Date(date)
    .toLocaleDateString("es-CL", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: 'America/Santiago'
    });
}

export const formatDateStandardCL = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL', {timeZone: 'America/Santiago'})
}