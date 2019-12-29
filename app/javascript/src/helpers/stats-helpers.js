export function calcDataForContactsStats(stats) {
  let data = [];

  stats.periods.forEach((_el, i) => {
    data.push({
      x: stats.periods[i],
      y: stats.counts[i],
    })
  })

  return data;
}
