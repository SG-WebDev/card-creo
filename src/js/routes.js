
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
  },
  {
    id: 'scan',
    name: 'scan',
    path: '/scan/',
    component: ScanPage,
  },
  {
    id: 'my-cards',
    name: 'my-cards',
    path: '/my-cards/',
    component: MyCardsPage,
  },
  {
    id: 'card',
    name: 'card',
    path: '/my-cards/:id/',
    component: CardPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
