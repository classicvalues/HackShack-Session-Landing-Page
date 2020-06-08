import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import { ResponsiveLayout } from './styles';
import { Footer, Header, SideNav } from '../index';

const handleViewport = size => {
  if (size === 'small') {
    return { minWidth: '400px', minHeight: '750px' };
  }
  return { minWidth: '1500px', minHeight: '900px' };
};

const Layout = ({ children, background, page }) => {
  const size = useContext(ResponsiveContext);
  const viewport = handleViewport(size);
  return (
    <ResponsiveLayout
      viewport={viewport}
      background={{
        image: `url(${background})`,
        size: 'cover',
        position: 'fixed',
      }}
      height={page === 'Home' ? '100%' : 'auto'}
      justify="between"
    >
      <Box>
        <Header />
        <Box direction="row">
          {size !== 'small' && (
            <Box margin={{ top: 'xlarge', left: 'large' }}>
              <SideNav />{' '}
            </Box>
          )}
          {children}
        </Box>
      </Box>
      <Footer />
    </ResponsiveLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string.isRequired,
  page: PropTypes.string,
};

export default Layout;