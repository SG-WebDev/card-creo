
import CreatePage from '../pages/create.vue';
import AboutPage from '../pages/about.vue';
import ScanPage from '../pages/scan.vue';
import MyCardsPage from '../pages/my-cards.vue';
import CardPage from '../pages/card.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: CreatePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/scan/',
    component: ScanPage,
  },
  {
    path: '/my-cards/',
    component: MyCardsPage,
  },
  {
    path: '/my-cards/:id/',
    component: CardPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
