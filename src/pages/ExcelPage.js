import {Page} from '../core/page/Page';
import {createStore} from '../core/store/createStore';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initialState';
import {Excel} from '../components/Excel/Excel';
import {Header} from '../components/Header/Header';
import {Toolbar} from '../components/Toolbar/Toolbar';
import {Formula} from '../components/Formula/Formula';
import {Tabl} from '../components/Table/Tabl';
import {StateProcessor} from '../core/page/processor';
import {LocalStorageClient} from '../core/shared/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
    this.storSub = null
  }
  async getRoot() {
    const state = await this.processor.get()
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState)

    this.storSub = store.subscribe(this.processor.listen)
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
    this.storSub.unsubscribe()
  }
}
