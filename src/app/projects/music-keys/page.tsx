const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
const alts = [4, 1, 5, 2, 6, 3, 7];
const marks = ['b', '#'];

const getMajor = (note: keyof typeof notes) => {

}
export default function Page () {
  return (
    <div style={{paddingTop: 100}}>
      {Array(12).fill(null).map((value, keyIndex) => {
        return (
          <div key={keyIndex}>
            {getFromIndex(notes, keyIndex).map((value, noteIndex) => {
              return (
                <span key={value}>{value}{[...alts].splice(0, keyIndex).includes(noteIndex + 1) ? '+' : ''}</span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}


const getFromIndex = (arr: typeof notes, index: number) => {
  return [...arr].splice(index).concat([...arr].splice(0, index <= arr.length ? index : index - arr.length));
}
