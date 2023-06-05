import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { PostContent } from '../components/PostContent';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = useCallback(async () => {
    await oktaAuth.signInWithRedirect();
  }, [oktaAuth]);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      // If user is not authenticated, redirect to Okta login
      login();
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth, login]);

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  //uncommented code below to show postContent 
  return (
    <div>
      {/* <PostContent postId="1" />
      <PostContent postId="2" /> */}
      <ul>
      </ul>
    </div>
  );
};
export default Home;