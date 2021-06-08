import React, { useState, useContext } from 'react';
import ReactPlayer from 'react-player/vimeo';
import { Box, Heading, Text, Avatar, ResponsiveContext, Button } from 'grommet';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SignupLayer, SuccessLayer } from '../Card/ScheduleCard';
import { Linkedin, Twitter, Link as GrommetLink } from 'grommet-icons';

const Video = ({
  videolink,
  avatar,
  desc,
  presenter,
  role,
  title,
  id,
  setCurrent,
  current,
  replaysLength,
  autoplay,
  notebook,
  sessionType,
  location,
  capacity,
  workshopTitle,
  replayId
}) => {
  const [signupLayer, setSignupLayer] = useState(false);
  const [successLayer, setSuccessLayer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    title: workshopTitle,
    notebook,
    sessionType: sessionType,
    location: location,
    termsAndConditions: false,
    proxy: 'hackshack',
  });
  const [toolTip, setToolTip] = useState('Click to copy the URL to clipboard');
  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      title: workshopTitle,
      notebook,
      sessionType: sessionType,
      location: location,
      termsAndConditions: false,
      proxy: 'hackshack',
    });
  };
  const size = useContext(ResponsiveContext);
  const optionsLarge = { width: '640px', height: '380px' };
  const optionsSmall = {
    maxWidth: '280px',
    minWidth: '280px',
    width: '280px',
    maxHeight: '180px',
    height: '180px',
  };
  const hostName = window.location.host;
  return (
    <Box>
      <ReactPlayer
        controls
        url={videolink}
        playing={autoplay}
        style={size === 'small' ? optionsSmall : optionsLarge}
        onEnded={() => {
          if (current >= replaysLength - 1) {
            setCurrent(0);
          } else {
            setCurrent(id + 1);
          }
        }}
      />
      <Box fill="horizontal" border={{ side: 'bottom' }}>
        <Box direction="column">
          <Box direction="column">
            <Box
              direction={size === 'large' ? 'row' : 'column'}
              justify="between"
              margin={{ vertical: 'small' }}
            >
              <Heading
                color="text-strong"
                margin="none"
                level={3}
              >
                {title}
              </Heading>
              {
                notebook &&
                sessionType &&
                location &&
                <Box width={capacity === 0 ? '350px' : '110px'}>
                  <Button
                    size="small"
                    onClick={() => setSignupLayer(true)}
                    margin={{ vertical: size === 'large' ? '0px' : 'small' }}
                    disabled={capacity === 0}
                    label={
                      <Text color="text-strong" size="large">
                        {capacity === 0
                          ? 'Currently full, please try again later'
                          : 'Register'}
                      </Text>
                    }
                    primary
                  >
                  </Button>
                </Box>
              }
            </Box>
            <Box
              direction="row"
              justify="between"
            >
              <Box pad={{ vertical: 'small' }} gap="small" direction="row">
                {avatar ? (
                  <Avatar src={avatar} />
                ) : (
                  <Avatar src="/img/SpeakerImages/defaultAvatar.svg" />
                )}
                <Box justify="center">
                  <Text
                    weight="bold"
                    size="large"
                  >
                    {presenter}
                  </Text>
                  <Text>{role}</Text>
                </Box>
              </Box>
              <Box
                direction="row"
                alignSelf="center"
                justify="evenly"
              >
                <Button
                  icon={<Linkedin size="medium" />}
                  target="_blank"
                  rel="noopener noreferrer"
                  a11yTitle="Share on LinkedIn"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${hostName}/replays/${replayId}`}
                />
                <Button
                  margin={{ horizontal: "20px" }}
                  icon={<Twitter size='medium' />}
                  target="_blank"
                  rel="noopener noreferrer"
                  a11yTitle="Share on Twitter"
                  href={`https://twitter.com/intent/tweet?url=${hostName}/replays/${replayId}`}
                />
                <Button
                  icon={<GrommetLink size='medium' />}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setToolTip('Copied!');
                  }}
                  tip={{
                    dropProps: { align: { left: 'right' } },
                    content: toolTip,
                  }}
                />
              </Box>
            </Box>
          </Box>
          {signupLayer && (
            <SignupLayer
              formData={formData}
              reset={resetFormData}
              setFormData={setFormData}
              setLayer={setSignupLayer}
              setSuccess={setSuccessLayer}
              title={title}
              size={size}
              sessionType={sessionType}
            />
          )}
          {successLayer && (
            <SuccessLayer
              setLayer={setSuccessLayer}
              name={formData.name}
              size={size}
              title={title}
              reset={resetFormData}
              sessionType={sessionType}
            />
          )}
          <Box gap="small">
            <Text color="text-strong" size="22px">
              {desc}
            </Text>
            <Text color="text-strong" margin={{ bottom: 'large' }} size="22px">
              If you liked this video and would like to get some real, hands-on
              experience,{' '}
              <Link style={{ color: '#FFF' }} color="white" to="/workshops">
                register for this workshops-on-demand.
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Video.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.string,
  presenter: PropTypes.string,
  role: PropTypes.string,
  desc: PropTypes.string,
  videolink: PropTypes.string,
  current: PropTypes.number,
  replaysLength: PropTypes.number,
  id: PropTypes.number,
  setCurrent: PropTypes.func,
};

export default Video;
