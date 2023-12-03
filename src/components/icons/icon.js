import React from 'react';
import PropTypes from 'prop-types';
import {
  IconAppStore,
  IconBookmark,
  IconCodepen,
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconInstagram,
  IconLinkedin,
  IconLoader,
  IconPersonalBrand,
  IconPlayStore,
  IconStar,
  IconTwitter,
  IconYoutube,
  IconMedium,
  IconAboutMe,
  IconArticles,
  IconVideos,
  IconProjects,
  IconCertificates,
  IconEmail,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'AppStore':
      return <IconAppStore />;
    case 'Bookmark':
      return <IconBookmark />;
    case 'Codepen':
      return <IconCodepen />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'AboutMe':
      return <IconAboutMe />;
    case 'Projects':
      return <IconProjects />;
    case 'Articles':
      return <IconArticles />;
    case 'Videos':
      return <IconVideos />;
    case 'Certificates':
      return <IconCertificates />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Youtube':
      return <IconYoutube />;
    case 'Email':
      return <IconEmail />;
    case 'Medium':
      return <IconMedium />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'PersonalBrand':
      return <IconPersonalBrand />;
    case 'PlayStore':
      return <IconPlayStore />;
    case 'Star':
      return <IconStar />;
    case 'Twitter':
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
