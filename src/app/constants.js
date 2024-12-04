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
  { name: 'Our Services', path: '' },
  { name: 'Become chef', path: '' },
  { name: 'FAQ', path: '' },
];
export const FOOTER_ELEMENT_R = [
  { name: 'Account', path: '' },
  { name: 'Terms of Service', path: '' },
  { name: 'Privacy Policy', path: '' },
];

export const LOGIN_METHODS = ['facebookLogin', 'googleLogin'];

export const DEFAULT_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again.';

export const ROSHOON_AUTH_TOKEN = 'roshoon_auth_token';
export const ROSHOON_ACCESS_TOKEN = 'roshoon_access_token';
