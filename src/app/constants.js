import {
  Instagram,
  LinkedIn,
  Twitter as X,
  Facebook,
} from '@mui/icons-material';
import { FaTiktok } from 'react-icons/fa';

export const SIDEBAR_MENU_OPTIONS = [
  { label: 'Our Story', path: 'ourStory' },
  { label: 'Become a shef', path: 'becomeAShef' },
  { label: 'Profile', path: 'profile' },
  { label: 'Settings', path: 'settings' },
  { label: 'Help Center', path: 'helpCenter' },
];

export const LOGIN_FIELDS = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
];

export const REGISTRATION_FIELDS = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  { name: 'phone', label: 'Phone Number', type: 'text', required: false },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
];

export const FOOTER_ELEMENT_L = [
  { name: 'footer.ourServices', path: 'ourServices' },
  { name: 'footer.becomeChef', path: 'becomeChef' },
  { name: 'footer.faq', path: 'faq' },
];
export const FOOTER_ELEMENT_R = [
  { name: 'footer.account', path: 'account' },
  { name: 'footer.termsOfService', path: 'termsOfService' },
  { name: 'footer.privacyPolicy', path: 'privacyPolicy' },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    platform: 'Instagram',
    path: 'https://www.instagram.com/',
    icon: Instagram,
  },
  {
    platform: 'Tiktok',
    path: 'https://www.tiktok.com/',
    icon: FaTiktok,
    className: 'text-2xl',
  },
  { platform: 'Facebook', path: 'https://www.facebook.com/', icon: Facebook },
  {
    platform: 'Linkedin',
    path: 'https://www.linkedin.com/feed/',
    icon: LinkedIn,
  },
  { platform: 'Twitter', path: 'https://x.com/', icon: X },
];

export const LOGIN_METHODS = ['facebookLogin', 'googleLogin'];

export const DEFAULT_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again.';

export const ROSHOON_AUTH_TOKEN = 'roshoon_auth_token';
export const ROSHOON_ACCESS_TOKEN = 'roshoon_access_token';

export const SIGN_UP_FIELDS = [
  {
    name: 'phone_email',
    label: 'Email or Phone',
    type: 'text',
    required: true,
  },
  { name: 'first_name', label: 'First name', type: 'text', required: true },
  { name: 'last_name', label: 'Last name', type: 'text', required: false },
  { name: 'password', label: 'Password', type: 'password', required: true },
  {
    name: 'repeat_password',
    label: 'Repeat Password',
    type: 'password',
    required: true,
  },
];
