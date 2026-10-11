// Readable text for a failed RTK Query request. Server errors arrive as
// { status, data }; a request that never reached the server as { status: 'FETCH_ERROR' }.
const humanize = field => field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');

export const errorMessage = error => {
  const data = error && error.data;
  if (data && data.message) return data.message;
  if (data && Array.isArray(data.errors)) return data.errors.join('. ');
  if (data && data.errors && typeof data.errors === 'object') {
    // Rails-style validation errors: { name: ['has already been taken'] }
    return Object.entries(data.errors)
      .map(([field, messages]) => `${humanize(field)} ${[].concat(messages).join(', ')}`)
      .join('. ');
  }
  if (error && error.status === 'FETCH_ERROR') {
    return "Couldn't reach the server. Check your connection and try again.";
  }
  if (error && typeof error.status === 'number') return `Something went wrong (error ${error.status})`;
  return 'Something went wrong';
};
