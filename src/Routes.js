import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const Routes = () => {
  // Set an initializing state whilst Firebase connects
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [initializing, setInitializing] = useState(true); // decides whether a user is authenticated or not
  // const [user, setUser] = useState(); // use redux dispatch instead

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); // this method is called from the react native firebase library. It listens to the changes when the auth state changes
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
}