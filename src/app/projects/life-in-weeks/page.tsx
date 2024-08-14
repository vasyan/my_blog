import './styles.scss';

interface LovelyDayInLife {
  week: number,
  label: string
}

const rows = Array(52).fill(Array(75).fill(0));
const weeksPass = calculateElapsedTime(new Date('1989-10-16'), new Date());
const lovelyDays: LovelyDayInLife[] = [
  {
    week: weeksPass - calculateElapsedTime(new Date('2015-12-29')),
    label: 'First time travel to Asia'
  },
  {
    week: weeksPass - calculateElapsedTime(new Date('2013-11-03')),
    label: 'First developer job landed'
  },
  {
    week: weeksPass - calculateElapsedTime(new Date('2013-09-07')),
    label: 'Yandex UI development school enrolled'
  },
  {
    week: weeksPass - calculateElapsedTime(new Date('2020-03-13')),
    label: 'Arrived to Thailand'
  },
];

export default function LifeInWeeks() {
  let hueShift = 0;

  return (
    <>
      <main className="main-container life-in-weeks">
        <div className="text-center mb-4">
          <h1>My life in weeks</h1>
        </div>
        <div className="container life-in-weeks-container p-0">
          {rows.flat().map((v, index) => {
            const lovelyDay = lovelyDays.find(v => v.week === index);
            if (lovelyDay) hueShift += 250;
            return (
              <input
                key={index} type="checkbox" checked={index < weeksPass} readOnly
                className={lovelyDay ? 'animate-scale' : ''}
                title={lovelyDay?.label}
                style={{filter: `hue-rotate(${hueShift}deg)`}}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

  // code is heavily inspired by https://github.com/bryanbraun/your-life/blob/gh-pages/your-life.js
  function calculateElapsedTime(from: Date, to = new Date()) {
    const toDate = to;
    const fromDate = from;
    const diff = toDate.getTime() - fromDate.getTime();

    const elapsedYears = (new Date(diff).getUTCFullYear() - 1970);
    const isThisYearsBirthdayPassed = (toDate.getTime() > new Date(toDate.getUTCFullYear(), fromDate.getMonth(), fromDate.getDay()).getTime());
    const birthdayYearOffset = isThisYearsBirthdayPassed ? 0 : 1;
    const dateOfLastBirthday = new Date(toDate.getUTCFullYear() - birthdayYearOffset, fromDate.getMonth(), fromDate.getDay());
    const elapsedDaysSinceLastBirthday = Math.floor((toDate.getTime() - dateOfLastBirthday.getTime()) / (1000 * 60 * 60 * 24));
    return (elapsedYears * 52) + Math.floor(elapsedDaysSinceLastBirthday / 7);
  }
