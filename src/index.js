import './scss/main.scss'
import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Tabl} from '@/components/Table/Tabl';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Tabl]
})
excel.render()
