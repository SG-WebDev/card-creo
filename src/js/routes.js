
import CreatePage from '../pages/create.vue';
import ScanPage from '../pages/scan.vue';
import MyCardsPage from '../pages/my-cards.vue';
import CardPage from '../pages/card.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    id: 'index',
    name: 'index',
    path: '/',
    component: CreatePage,
    options : {
      reloadCurrent: true
    },
  },
  {
    id: 'scan',
    name: 'scan',
    path: '/scan/',
    component: ScanPage,
    options : {
      reloadCurrent: true
    },
  },
  {
    id: 'my-cards',
    name: 'my-cards',
    path: '/my-cards/',
    component: MyCardsPage,
    options : {
      reloadCurrent: true
    },
  },
  {
    id: 'card',
    name: 'card',
    path: '/my-cards/:id/',
    component: CardPage,
    options : {
      reloadCurrent: true
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
