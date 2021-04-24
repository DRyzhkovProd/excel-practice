import {Page} from '../core/Page';
import {createStore} from '../core/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initialState';
import {debounce, storage} from '../core/utils';
import {Excel} from '../components/Excel/Excel';
import {Header} from '../components/Header/Header';
import {Toolbar} from '../components/Toolbar/Toolbar';
import {Formula} from '../components/Formula/Formula';
import {Tabl} from '../components/Table/Tabl';
function storageName(param) {
  return 'excel:' + param
}
export class ExcelPage extends Page {
  getRoot() {
    const params = this.params()
      ? this.params()
      : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListener = debounce(state =>{
      storage(storageName(params), state)
    }, 300)
    store.subscribe(stateListener)
    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Tabl],
      store
    })
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
