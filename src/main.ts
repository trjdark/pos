import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import {
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Divider,
    Input,
    InputNumber,
    DatePicker,
    Select,
    Option,
    Form,
    FormItem,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Tree,
    Upload,
    Checkbox,
    CheckboxGroup,
    CheckboxButton,
    Button,
    ButtonGroup,
    MessageBox,
    Message,
    Popover,
    Row,
} from 'element-ui';

import './scss/main.scss';
import './scss/theme.scss';

Vue.config.productionTip = false;

Vue.component(Menu.name, Menu);
Vue.component(Row.name, Row);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Divider.name, Divider);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.component(Dialog.name, Dialog);
Vue.component(Tree.name, Tree);
Vue.component(Upload.name, Upload);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(CheckboxButton.name, CheckboxButton);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
Vue.component(Popover.name, Popover);







new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
