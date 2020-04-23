import React, { useState, useEffect } from 'react';
import GmailService from '../services/gmail-service';
import { useLocation } from 'react-router-dom';

export default function Gmail() {
  const [isConnected, setIsConnected] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      GmailService.grant(search).then(({connected}) => setIsConnected(connected));
    } else {
      setIsConnected(false)
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      window.close();
    }
  }, [isConnected]);

  return (
    <div>
      <p>Connected: {isConnected ? 'connected' : 'issues when trying to connect with google'}</p>
    </div>
  )
}
