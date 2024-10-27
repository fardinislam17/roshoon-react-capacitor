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

export const LOGIN_METHODS = ['facebookLogin', 'googleLogin'];

export const DEFAULT_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again.';

export const ROSHOON_AUTH_TOKEN = 'roshoon_auth_token';
