import { Link } from '@chakra-ui/react';
import { withRouter } from 'react-router-dom';

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    console.log(history.location.pathname);
    return { color: '#50DBB4' };
  } else {
    return { color: 'white' };
  }
};

const NavLink = (props) => {
  const { url, children, history } = props;
  return (
    <Link
      px={4}
      py={2}
      colorScheme={currentTab(history, url)}
      fontSize={18}
      textDecoration={'none'}
      _hover={{
        textDecoration: 'none',
        outline: 'none',
      }}
      href={url ? url : '#'}
    >
      {children}
    </Link>
  );
};

export default withRouter(NavLink);
