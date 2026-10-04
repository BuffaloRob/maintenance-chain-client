import moment from 'moment';

// Due status worked out from the getItems cache the same way the API's
// /past_due and /upcoming do it: a category's latest log is the one with the
// latest due date. It is past due once that date (midnight UTC) has passed and
// upcoming when it falls within the next 30 days.
const DAY = 24 * 60 * 60 * 1000;
const UPCOMING_DAYS = 30;

const dueTime = log => Date.parse(`${String(log.date_due).slice(0, 10)}T00:00:00Z`);

// The API's log order: latest due date first, then lowest id
const byDueDateDesc = (a, b) => dueTime(b) - dueTime(a) || a.id - b.id;

export const latestLog = (item, categoryId) =>
  item.logs.filter(log => log.category_id === categoryId && log.date_due).sort(byDueDateDesc)[0];

// 'overdue' | 'soon' | 'ok', or 'none' for a category with no logs
export const statusOf = log => {
  if (!log) return 'none';
  const now = Date.now();
  const due = dueTime(log);
  if (due <= now) return 'overdue';
  if (due <= now + UPCOMING_DAYS * DAY) return 'soon';
  return 'ok';
};

// Each of the item's categories with its latest log and status
export const categoryStatuses = item =>
  item.categories.map(category => {
    const log = latestLog(item, category.id);
    return { item, category, log, status: statusOf(log) };
  });

export const allCategoryStatuses = items => items.flatMap(categoryStatuses);

// Soonest (or longest overdue) first; categories without logs last
export const mostUrgentFirst = statuses =>
  [...statuses].sort((a, b) => {
    if (!a.log || !b.log) return (a.log ? 0 : 1) - (b.log ? 0 : 1);
    return dueTime(a.log) - dueTime(b.log);
  });

const RANK = { overdue: 0, soon: 1, ok: 2, none: 3 };
export const worstStatus = statuses =>
  statuses.reduce((worst, { status }) => (RANK[status] < RANK[worst] ? status : worst), 'none');

export const formatDate = date => moment(date).format('MMM Do YYYY');

// "today", "in 12 days", "3 months ago"
export const fromToday = date => {
  const today = moment().startOf('day');
  const day = moment(date).startOf('day');
  return day.isSame(today) ? 'today' : day.from(today);
};

// "Due today", "Due in 12 days", "Due 3 months ago"
export const dueText = log => `Due ${fromToday(log.date_due)}`;

export const costOf = log => Number(log.cost) || 0;
export const totalCost = logs => logs.reduce((sum, log) => sum + costOf(log), 0);
// "$52", "$48.50"
export const formatMoney = amount => {
  const digits = Number.isInteger(amount) ? 0 : 2;
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
};

// Sort comparator: most recently performed log first
export const byRecentlyPerformed = (a, b) =>
  moment(b.date_performed).diff(moment(a.date_performed)) || b.id - a.id;

// Average time between services, e.g. "6 months"; null with fewer than two logs
export const typicalInterval = logs => {
  const dates = logs.map(log => moment(log.date_performed)).filter(d => d.isValid()).sort((a, b) => a - b);
  if (dates.length < 2) return null;
  const days = dates[dates.length - 1].diff(dates[0], 'days') / (dates.length - 1);
  return moment.duration(days, 'days').humanize();
};

// Days between when a log was performed and when it was next due
export const dueInterval = log => {
  if (!log || !log.date_performed || !log.date_due) return null;
  const days = moment(log.date_due).diff(moment(log.date_performed), 'days');
  return days > 0 ? days : null;
};
