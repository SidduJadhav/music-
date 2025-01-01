// pages/api/spotify-token.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const CLIENT_ID  = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      return res.status(500).json({ error: 'Missing Spotify credentials' });
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
      body: params,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.error_description || 'Failed to authenticate with Spotify' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching Spotify token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
