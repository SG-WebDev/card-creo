
import CreatePage from '../pages/create.vue';
import AboutPage from '../pages/about.vue';
import ScanPage from '../pages/scan.vue';
import MyCardsPage from '../pages/my-cards.vue';
import CardPage from '../pages/card.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    name: 'index',
    path: '/',
    component: CreatePage,
  },
  {
    name: 'about',
    path: '/about/',
    component: AboutPage,
  },
  {
    name: 'scan',
    path: '/scan/',
    component: ScanPage,
  },
  {
    name: 'my-cards',
    path: '/my-cards/',
    component: MyCardsPage,
  },
  {
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
