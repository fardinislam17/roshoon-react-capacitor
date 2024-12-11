import {
  Instagram,
  LinkedIn,
  Twitter as X,
  Facebook,
} from '@mui/icons-material';
import { FaTiktok } from 'react-icons/fa';
import { fetchCities, fetchStates } from 'src/utils/statesAndCities';

export const SIDEBAR_MENU_OPTIONS = [
  { label: 'Our Story', path: 'ourStory' },
  { label: 'Become a shef', path: 'becomeAShef' },
  { label: 'Profile', path: 'profile' },
  { label: 'Settings', path: 'settings' },
  { label: 'Help Center', path: 'helpCenter' },
];

export const LOGIN_FIELDS = [
  {
    name: 'email',
    label: 'Phone number or email address',
    type: 'text',
    required: true,
  },
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
  { name: 'phoneOrEmail', type: 'text', required: true },
  { name: 'firstName', type: 'text', required: true },
  { name: 'lastName', type: 'text', required: false },
  { name: 'password', type: 'password', required: true },
  { name: 'repeatPassword', type: 'password', required: true },
];

export const ADDRESS_FIELDS = [
  { name: 'street', type: 'text', required: true },
  { name: 'buildingNo', type: 'text', required: true },
  {
    name: 'state',
    type: 'dropdown',
    required: true,
    loadOptions: fetchStates,
    onChange: async (value, setDependentOptions) => {
      const cities = await fetchCities(value);
      setDependentOptions('city', cities);
    },
  },
  {
    name: 'city',
    type: 'dropdown',
    required: true,
    loadOptions: () => [], // Initially empty until state is selected
  },
  { name: 'zipCode', type: 'text', required: true },
  {
    name: 'country',
    type: 'text',
    required: true,
    readonly: true,
    defaultValue: 'United States',
  },
];
