const isValidPhoneNumber = (number) => /^\d{2,3}-\d+$/.test(number)

const buildInfoMessage = (personCount, date = new Date()) => {
  return `<p>Phonebook has info for ${personCount} people</p><p>${date}</p>`
}

module.exports = {
  isValidPhoneNumber,
  buildInfoMessage,
}
