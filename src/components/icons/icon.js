import React from 'react';
import PropTypes from 'prop-types';
import {
  IconExternal,
  IconFolder,
  IconGitHub,
  IconLinkedin,
  IconYoutube,
  IconMedium,
  IconAboutMe,
  IconArticles,
  IconVideos,
  IconLogo,
  IconProjects,
  IconCertificates,
  IconEmail,
  IconGallery,
  IconClose,
  IconDownArrowIndicator,
  IconLeftArrow,
  IconMinimize,
  IconReduceScreen,
  IconReload,
  IconRightArrow,
  IconSmallClose,
  IconWorldWide,
} from '@components/icons';
import IconHamburger from './hamburger';

const Icon = ({ name }) => {
  switch (name) {
    case 'AboutMe':
      return <IconAboutMe />;
    case 'Articles':
      return <IconArticles />;
    case 'Certificates':
      return <IconCertificates />;
    case 'Close':
      return <IconClose />;
    case 'DownArrowIndicator':
      return <IconDownArrowIndicator />;
    case 'Email':
      return <IconEmail />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Gallery':
      return <IconGallery />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Hamburger':
      return <IconHamburger />;
    case 'LeftArrow':
      return <IconLeftArrow />;
    case 'Logo':
      return <IconLogo />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Medium':
      return <IconMedium />;
    case 'Minimize':
      return <IconMinimize />;
    case 'Projects':
      return <IconProjects />;
    case 'ReduceScreen':
      return <IconReduceScreen />;
    case 'Reload':
      return <IconReload />;
    case 'RightArrow':
      return <IconRightArrow />;
    case 'SmallClose':
      return <IconSmallClose />;
    case 'Videos':
      return <IconVideos />;
    case 'WorldWide':
      return <IconWorldWide />;
    case 'Youtube':
      return <IconYoutube />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
