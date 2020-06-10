/* (C) Copyright 2019 Hewlett Packard Enterprise Development LP. */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';

export const SubPageHeader = ({ children, title, ...rest }) => {
  return (
    <Box
      align="start"
      width="xlarge"
      direction="column"
      direction="column" pad="xlarge"
      {...rest}
    >
      <Box align="start">
        <Button
          icon={<FormPreviousLink />}
          label="Back to Arcade"
          href="/arcade"
        ></Button>
        <Heading color="text-strong" level="1" margin={{ bottom: 'large', top: 'none' }}>
          {title}
        </Heading>
      </Box>
      {children}
    </Box>
  );
};
export default SubPageHeader;

SubPageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};