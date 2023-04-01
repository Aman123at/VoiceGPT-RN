import React, {useState} from 'react';
import Splash from './src/SplashScreen/Splash';
import Navigation from './src/pages/Navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const [showSplash, setShowSplash] = useState<Boolean>(true);

  setTimeout(() => {
    setShowSplash(false);
  }, 1000);

  return showSplash ? (
    <Splash />
  ) : (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
