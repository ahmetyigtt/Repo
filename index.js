/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { UserContextProvider } from './src/Context/UserContext';

const provider=() => {
    return (
        <UserContextProvider>
            <App/>
        </UserContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => provider);
