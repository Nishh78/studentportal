// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'incharge',
    path: '/incharge',
    icon: icon('ic_user'),
  },
  {
    title: 'remarks',
    path: '/remarks',
    icon: icon('ic_user'),
  },
  {
    title: 'incharge Info',
    path: '/incharge_info',
    icon: icon('ic_user'),
  },
  {
    title: 'student',
    path: '/student',
    icon: icon('ic_user'),
  },
  {
    title: 'student Result',
    path: '/student_result',
    icon: icon('ic_user'),
  },
  {
    title: 'Add Student Result',
    path: '/add_result',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;