// In-memory stand-in for maintenance_chain_api, served through page.route().
// Endpoints and payload shapes mirror src/store/api/maintenanceApi.js.

// Unroutable host: anything the mock doesn't answer fails instead of reaching a real server.
export const API_URL = 'http://api.test/api';

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': '*',
};

export const users = {
  alice: { id: 1, email: 'alice@example.com', email_verified: true },
  bob: { id: 2, email: 'bob@example.com', email_verified: true },
};

// The ID token the fake Google sign-in button (see fixtures.js) hands the app,
// for alice's Google account
export const GOOGLE_CREDENTIAL = 'google-id-token-for-alice';

// The token in the link of user `id`'s verification email
export const verificationToken = id => `verify-${id}`;

// The token in the link of user `id`'s password reset email
export const resetToken = id => `reset-${id}`;

const seedItems = () => ({
  [users.alice.id]: [
    {
      id: 1,
      name: 'Civic',
      categories: [{ id: 10, name: 'Oil change' }, { id: 11, name: 'Tires' }],
      logs: [
        { id: 100, category_id: 10, date_performed: '2024-01-05', date_due: '2024-07-05', cost: 25, notes: 'Synthetic 5W-30', tools: 'Filter wrench' },
        { id: 101, category_id: 11, date_performed: '2025-03-01', date_due: '2099-03-01', cost: 400, notes: null, tools: null },
      ],
    },
  ],
  [users.bob.id]: [
    {
      id: 2,
      name: 'Lawn mower',
      categories: [{ id: 20, name: 'Blade sharpening' }],
      logs: [{ id: 200, category_id: 20, date_performed: '2024-04-01', date_due: '2024-10-01', cost: 0, notes: null, tools: null }],
    },
  ],
});

// A 30×40 PNG, the photo of the receipt alice keeps with her Jan 5th 2024 oil change
export const RECEIPT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoCAIAAABmcd1FAAAALUlEQVR42u3MMQ0AAAgDsGnCDf418KOCg6RJ72a6jkStVqvVarVarVar1f/rBW51CGocVxjhAAAAAElFTkSuQmCC',
  'base64'
);

// Receipts by log id
const seedReceipts = () => ({
  100: [{ id: 500, log_id: 100, content_type: 'image/png', data: RECEIPT_PNG }],
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const today = () => new Date().toISOString().slice(0, 10);

export function createMockApi() {
  const accounts = Object.values(users).map(u => ({ ...u }));
  const itemsByUser = seedItems();
  const receiptsByLog = seedReceipts();
  let nextId = 1000;

  // Every request the app made: { method, path, body, auth }. An uploaded
  // image's body is { type, data }, data being a Buffer.
  const requests = [];
  // Test-controlled responses, matched before the normal routes
  const overrides = [];

  // Make matching requests fail, stall or never answer, e.g.
  //   override({ method: 'POST', path: '/items', status: 500, body: { message: 'Nope' } })
  //   override({ method: 'POST', path: '/items', delay: 1000 })  (then handled normally)
  //   override({ method: 'POST', path: '/logout', hang: true })
  //   override({ method: 'GET', path: '/items', abort: true })  (network failure)
  const override = spec => overrides.push(spec);

  // Returns [status, payload], or [status, Buffer, content type] for an image
  const route = async (method, path, body, user) => {
    const items = user && itemsByUser[user.id];
    const findItem = id => items.find(i => i.id === Number(id));
    let m;

    if (method === 'POST' && (path === '/login' || path === '/signup')) {
      const email = body?.user?.email;
      let account = accounts.find(a => a.email === email);
      if (path === '/signup' && !account) {
        account = { id: nextId++, email, email_verified: false };
        accounts.push(account);
        itemsByUser[account.id] = [];
      }
      if (!account) return [401, { message: 'Invalid email or password' }];
      return [200, { jwt: `token-${account.id}`, user: account }];
    }
    if (method === 'POST' && path === '/auth/google') {
      if (body?.credential !== GOOGLE_CREDENTIAL) return [401, { message: "Couldn't sign in with Google" }];
      const account = accounts.find(a => a.id === users.alice.id);
      return [200, { jwt: `token-${account.id}`, user: account }];
    }
    if (method === 'POST' && path === '/verify_email') {
      const account = accounts.find(a => body?.token === verificationToken(a.id));
      if (!account) return [422, { message: 'This link is invalid or has expired' }];
      account.email_verified = true;
      return [204];
    }
    if (method === 'POST' && path === '/forgot_password') return [204];
    if (method === 'POST' && path === '/reset_password') {
      const account = accounts.find(a => body?.token === resetToken(a.id));
      if (!account) return [422, { message: 'This link is invalid or has expired' }];
      if (!body.password) return [422, { message: "Password can't be blank" }];
      account.email_verified = true;
      return [200, { jwt: `token-${account.id}`, user: account }];
    }
    if (!user) return [401, { message: 'Please log in' }];

    if (method === 'GET' && path === '/user') return [200, { user }];
    if (method === 'POST' && path === '/logout') return [200, {}];
    if (method === 'POST' && path === '/resend_verification_email') return [204];
    if (!user.email_verified) return [403, { message: 'Please verify your email address' }];

    if (path === '/past_due' || path === '/upcoming') {
      const due = items.flatMap(item =>
        item.logs.map(log => {
          const category = item.categories.find(c => c.id === log.category_id);
          return { ...log, category: { ...category, item_id: item.id } };
        })
      );
      const pastDue = path === '/past_due';
      return [200, due.filter(log => (log.date_due < today()) === pastDue)];
    }

    if (path === '/items') {
      if (method === 'GET') return [200, items];
      if (method === 'POST') {
        const item = { id: nextId++, name: body.name, categories: [], logs: [] };
        items.push(item);
        return [201, item];
      }
    }
    if ((m = path.match(/^\/items\/(\d+)$/))) {
      const item = findItem(m[1]);
      if (!item) return [404, { message: 'Not found' }];
      if (method === 'PUT') return [200, Object.assign(item, { name: body.name })];
      if (method === 'DELETE') {
        items.splice(items.indexOf(item), 1);
        return [200, {}];
      }
    }
    if ((m = path.match(/^\/items\/(\d+)\/categories(?:\/(\d+))?$/))) {
      const item = findItem(m[1]);
      const category = item && m[2] && item.categories.find(c => c.id === Number(m[2]));
      if (!item || (m[2] && !category)) return [404, { message: 'Not found' }];
      if (method === 'POST' && !m[2]) {
        const created = { id: nextId++, name: body.name };
        item.categories.push(created);
        return [201, created];
      }
      if (method === 'PUT') return [200, Object.assign(category, { name: body.name })];
      if (method === 'DELETE') {
        item.categories.splice(item.categories.indexOf(category), 1);
        item.logs = item.logs.filter(l => l.category_id !== category.id);
        return [200, {}];
      }
    }
    if ((m = path.match(/^\/items\/(\d+)\/categories\/(\d+)\/logs(?:\/(\d+))?$/))) {
      const item = findItem(m[1]);
      const log = item && m[3] && item.logs.find(l => l.id === Number(m[3]));
      if (!item || (m[3] && !log)) return [404, { message: 'Not found' }];
      if (method === 'POST' && !m[3]) {
        const created = { id: nextId++, category_id: Number(m[2]), ...body };
        item.logs.push(created);
        return [201, created];
      }
      if (method === 'PUT') return [200, Object.assign(log, body)];
      if (method === 'DELETE') {
        item.logs.splice(item.logs.indexOf(log), 1);
        return [200, {}];
      }
    }
    if ((m = path.match(/^\/items\/(\d+)\/categories\/(\d+)\/logs\/(\d+)\/receipts(?:\/(\d+))?$/))) {
      const item = findItem(m[1]);
      const log = item && item.logs.find(l => l.id === Number(m[3]) && l.category_id === Number(m[2]));
      if (!log) return [404, { message: 'Not found' }];
      const receipts = (receiptsByLog[log.id] ??= []);
      const receipt = m[4] && receipts.find(r => r.id === Number(m[4]));
      if (m[4] && !receipt) return [404, { message: 'Not found' }];
      // Listed without the image
      const listed = ({ data, ...rest }) => rest;
      if (method === 'GET' && !m[4]) return [200, receipts.map(listed)];
      if (method === 'POST' && !m[4]) {
        const created = { id: nextId++, log_id: log.id, content_type: body.type, data: body.data };
        receipts.push(created);
        return [201, listed(created)];
      }
      if (method === 'GET') return [200, receipt.data, receipt.content_type];
      if (method === 'DELETE') {
        receipts.splice(receipts.indexOf(receipt), 1);
        return [204];
      }
    }
    return [404, { message: 'Not found' }];
  };

  const handle = async pwRoute => {
    const request = pwRoute.request();
    const method = request.method();
    if (method === 'OPTIONS') return pwRoute.fulfill({ status: 204, headers: CORS });

    const path = new URL(request.url()).pathname.replace(/^\/api/, '');
    const type = request.headers()['content-type'];
    const body = type?.startsWith('image/')
      ? { type, data: request.postDataBuffer() }
      : request.postData() ? JSON.parse(request.postData()) : null;
    const auth = request.headers().authorization ?? null;
    requests.push({ method, path, body, auth });

    const spec = overrides.find(o => o.method === method && o.path === path);
    if (spec?.hang) return; // leave the request pending
    if (spec?.abort) return pwRoute.abort('connectionrefused');
    if (spec?.delay) await sleep(spec.delay);

    let status, payload, payloadType;
    if (spec?.status) {
      [status, payload] = [spec.status, spec.body ?? {}];
    } else {
      const user = accounts.find(a => auth === `Bearer token-${a.id}`);
      [status, payload, payloadType] = await route(method, path, body, user);
    }
    if (status === 204) return pwRoute.fulfill({ status, headers: CORS });
    if (Buffer.isBuffer(payload)) return pwRoute.fulfill({ status, headers: CORS, contentType: payloadType, body: payload });
    await pwRoute.fulfill({ status, headers: CORS, contentType: 'application/json', body: JSON.stringify(payload) });
  };

  return { handle, override, requests };
}
