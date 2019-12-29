class DataPeriodModel {
  constructor({ periods, counts, id, name, color }) {
    this.periods = periods;
    this.counts = counts;
    this.id = id;
    this.name = name;
    this.color = color || this.randomizeColor();
  }

  randomizeColor = () => {
    const palette = [
      '#E8C06D',
      '#FFCA85',
      '#FF9A7B',
      '#FF6E8B',
      '#DA91FF',
      '#FF85CF',
      '#87A7E8',
      '#7AFFB9',
      '#6FE8CA',
      '#38FFD0',
      '#33E88A'
    ];

    return palette[Math.floor(Math.random() * palette.length)];
  }

  periodsChartsXYData = () => {
    let data = [];

    periods.forEach((_el, i) => {
      data.push({
        x: userPeriod.periods[i],
        y: userPeriod.counts[i],
      })
    });

    return data;
  }
}

export default DataPeriodModel;