import { expect } from 'chai'
import convert from 'convert-units'
import round from '../src/utils/round'

describe('convert-units', () => {
  describe('pounds to kilos', () => {
    it ('converts 0 lbs to 0 kg', () => {
      const res = convert(0).from('lb').to('kg')
      expect(res).to.equal(0)
    })

    it('converts 200 lbs to 91~ kg', () => {
      const kilos = convert(200).from('lb').to('kg')
      const rounded = round(kilos, 0)
      expect(rounded).to.equal(91);
    })

    it('converts back to 350lbs after being converted to kg', () => {
      const kg = convert(350).from('lb').to('kg')
      const pounds = convert(kg).from('kg').to('lb')

      expect(pounds).to.equal(350)
    })
  })
})
