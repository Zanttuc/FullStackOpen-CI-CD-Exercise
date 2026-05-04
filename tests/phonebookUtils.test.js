const test = require('node:test')
const assert = require('node:assert/strict')

const {
  buildInfoMessage,
  isValidPhoneNumber,
} = require('../modules/phonebookUtils')

test('isValidPhoneNumber accepts phonebook numbers', () => {
  assert.equal(isValidPhoneNumber('12-345678'), true)
  assert.equal(isValidPhoneNumber('123-4567'), true)
})

test('isValidPhoneNumber rejects invalid numbers', () => {
  assert.equal(isValidPhoneNumber('12345678'), false)
  assert.equal(isValidPhoneNumber('12-34-5678'), false)
})

test('buildInfoMessage includes count and date', () => {
  const date = new Date('2026-05-04T12:00:00.000Z')

  assert.equal(
    buildInfoMessage(2, date),
    `<p>Phonebook has info for 2 people</p><p>${date}</p>`,
  )
})
