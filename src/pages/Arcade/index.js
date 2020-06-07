import React from 'react';
import { Heading } from 'grommet';
import { Layout, Card, CardGrid } from '../../components/index';
import { arcadeContent } from '../../CardData/PageContent';

const Arcade = () => {
  return (
    <Layout background="/img/hack-shack-home-background.png">
      <Heading margin={{ bottom: 'large' }} color="text-strong">
        ARCADE
      </Heading>
      <CardGrid>
        {arcadeContent.map(content => (
          <Card
            title={content.title}
            alt={content.alt}
            background={content.background}
            image={content.image}
            desc={content.desc}
            label={content.label}
            link={content.link}
            path={content.path}
          />
        ))}
      </CardGrid>
    </Layout>
  );
};

export default Arcade;
