const createSlots = () => {
  const slots = [];
  let id = 1;

  // Nhóm 01–13 (2 lần)
  for (let repeat = 0; repeat < 2; repeat++) {
    for (let i = 1; i <= 13; i++) {
      slots.push({
        id: id++,
        label: i.toString().padStart(2, "0"),
        group: "A"
      });
    }
  }

  // Nhóm 14–30 (2 lần)
  for (let repeat = 0; repeat < 2; repeat++) {
    for (let i = 14; i <= 30; i++) {
      slots.push({
        id: id++,
        label: i,
        group: "B"
      });
    }
  }

  return slots;
};

const slots = createSlots();
export default slots