import './scss/main.scss'
import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Tabl} from '@/components/Table/Tabl';
import {createStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {debounce, storage} from './core/utils';
import {initialState} from './redux/initialState';
const store = createStore(rootReducer, initialState)
const stateListener = debounce(state =>{
  storage('excel-state', state)
  console.warn('App state', state);
}, 300)
store.subscribe(stateListener)
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Tabl],
  store
})
excel.render()
