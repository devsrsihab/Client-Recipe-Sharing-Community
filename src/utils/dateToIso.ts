interface IDate {
  calendar: {
    identifier: string;
  };
  era: string;
  year: number;
  month: number;
  day: number;
}

const dateToISO = (date: IDate) => {
  // if date does not exist send current date
  if (!date) return new Date().toISOString();

  // if date exist convert it
  return new Date(`${date.month}-${date.day}-${date.year}`).toISOString();
};

export default dateToISO;
