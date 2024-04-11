import { NextApiHandler } from 'next';
import * as LineUserApi from '~/server/handlers/next-api/lineUser';

const connects = [LineUserApi.connect, LineUserApi.individualConnect];

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { all },
  } = req;

  if (!Array.isArray(all)) {
    res.status(404).end();
    return;
  }

  const connect = connects.find((c) => {
    const path = c.pathname.split('/').filter((p) => p !== '');
    return all.every((a, i) => path[i] === a || /^\[(.*?)\]$/.test(path[i]));
  });

  if (!connect) {
    res.status(404).end();
    return;
  }

  connect.run(req, res);
};

export default handler;
