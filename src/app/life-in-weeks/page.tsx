import './styles.scss';

const rows = Array(52).fill(Array(75).fill(0));
const weeksPass = calculateElapsedTime();

export default function LifeInWeeks() {
  return (
    <>
      <main className="main-container life-in-weeks">
        <div className="text-center mb-4">
          <h1>My life in weeks</h1>
        </div>
        <div className="container life-in-weeks-container p-0">
          {rows.flat().map((v, index) => {
            return (
              <input key={index} type="checkbox" checked={index < weeksPass} readOnly />
            );
          })}
        </div>
      </main>
    </>
  );
}

  // code is heavily inspired by https://github.com/bryanbraun/your-life/blob/gh-pages/your-life.js
  function calculateElapsedTime() {
    const currentDate = new Date();
    const dateOfBirth = new Date('1989-10-16');
    const diff = currentDate.getTime() - dateOfBirth.getTime();

    const elapsedYears = (new Date(diff).getUTCFullYear() - 1970);
    const isThisYearsBirthdayPassed = (currentDate.getTime() > new Date(currentDate.getUTCFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDay()).getTime());
    const birthdayYearOffset = isThisYearsBirthdayPassed ? 0 : 1;
    const dateOfLastBirthday = new Date(currentDate.getUTCFullYear() - birthdayYearOffset, dateOfBirth.getMonth(), dateOfBirth.getDay());
    const elapsedDaysSinceLastBirthday = Math.floor((currentDate.getTime() - dateOfLastBirthday.getTime()) / (1000 * 60 * 60 * 24));
    return (elapsedYears * 52) + Math.floor(elapsedDaysSinceLastBirthday / 7);
  }
