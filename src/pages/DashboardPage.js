import {Page} from '../core/Page';
import {$} from '../core/dom/dom';
import {createAllTable} from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'dashboard').html(`
      <header class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </header>
        <div class="dashboard__new">
            <div class="dashboard__view">
                <a 
                href="#excel/${now}" 
                class="dashboard__create">Новая таблица
                </a>
            </div>

        </div>
        <div class="dashboard__table dashboard__view">
            ${createAllTable()}
        </div>
    `)
  }
}
