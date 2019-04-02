/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Wiki from './Wiki';
import Navigation from './Navigation'
import LandingPage from './LandingPage'
import {name as appName} from './app.json';
import Translate from './Translate';

AppRegistry.registerComponent(appName, () => LandingPage);
