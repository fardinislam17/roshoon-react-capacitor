import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const EmbeddedVerification = ({ clientSecret }) => {
  useEffect(() => {
    const startVerification = async () => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
      );
      await stripe.verifyIdentity(clientSecret);
    };
    if (clientSecret) startVerification();
  }, [clientSecret]);

  return (
    <div id="identity-element" style={{ width: '100%', height: '500px' }} />
  );
};

export default EmbeddedVerification;
