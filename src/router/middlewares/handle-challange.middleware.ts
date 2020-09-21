import { Request, Response } from 'express';
import { struct } from 'superstruct';


const validate = struct({
  type: 'string',
  token: 'string',
  challenge: 'string'
});

export function handleChallange(req: Request, res: Response, next: () => void): void {
  try {
    if (req.body?.type === 'url_verification') {
      validate(req.body);
      res.json({ challenge: req.body.challenge });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ error: 'internal error' });
  }
}
