export function createQuery({
  location,
  page,
  itemPerPage,
  sortByName,
}): String {
  let query = '';
  if (location) {
    const formattedLocation = location.replace(/ /g, '+');
    query += `&q=${formattedLocation}`;
  }

  if (itemPerPage && !isNaN(itemPerPage)) {
    query += `&rows=${itemPerPage}`;
  }

  if (!isNaN(page) && !isNaN(itemPerPage) && page > 0) {
    query += `&start=${(page - 1) * itemPerPage}`;
  }

  if (sortByName) {
    const sortValue = sortByName === 'desc' ? '-stop_name' : 'stop_name';
    query += `&sort=${sortValue}`;
  }
  return query;
}
