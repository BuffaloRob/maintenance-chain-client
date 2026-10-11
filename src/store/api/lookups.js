import { useGetItemsQuery } from './maintenanceApi';
import { allCategoryStatuses } from './dueStatus';

// The API has no per-record GET endpoints: items arrive with their categories and
// logs, so single records are looked up in the getItems cache. Each hook also
// returns the request's isLoading/error, so a missing record can be told apart
// from one that is still loading or failed to load.
const sameId = (a, b) => String(a) === String(b);

const useItemsLookup = (select, options) =>
  useGetItemsQuery(undefined, {
    ...options,
    selectFromResult: ({ data, isLoading, error }) => ({ ...(data && select(data)), isLoading, error }),
  });

export const useItem = itemId =>
  useItemsLookup(items => ({ item: items.find(i => sameId(i.id, itemId)) }));

export const useCategory = (itemId, categoryId) =>
  useItemsLookup(items => {
    const item = items.find(i => sameId(i.id, itemId));
    return { item, category: item && item.categories.find(c => sameId(c.id, categoryId)) };
  });

// Without an itemId (the /log/:id route) the owning item is found by the log id
export const useLog = (logId, itemId) =>
  useItemsLookup(items => {
    const item = items.find(i =>
      itemId ? sameId(i.id, itemId) : i.logs.some(l => sameId(l.id, logId))
    );
    const log = item && item.logs.find(l => sameId(l.id, logId));
    return { item, log, category: log && item.categories.find(c => c.id === log.category_id) };
  });

// How many categories are past due and coming due, for the header. skip for
// users the API turns away (unverified email addresses): the header is shown
// to them, unlike the app pages.
export const useDueCounts = ({ skip } = {}) =>
  useItemsLookup(items => {
    const statuses = allCategoryStatuses(items);
    return {
      overdueCount: statuses.filter(s => s.status === 'overdue').length,
      soonCount: statuses.filter(s => s.status === 'soon').length,
    };
  }, { skip });
