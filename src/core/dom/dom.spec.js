import {$} from './dom';
describe('dom:', ()=> {
  let dom
  beforeEach(()=> {
    dom = $.create('div')
  })
  test('should be defined', ()=> {
    expect(dom).toBeDefined()
  })

})

