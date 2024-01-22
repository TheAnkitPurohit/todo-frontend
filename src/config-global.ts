import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

export const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;

export const PATH_AFTER_REGISTER = paths.auth.jwt.login;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
