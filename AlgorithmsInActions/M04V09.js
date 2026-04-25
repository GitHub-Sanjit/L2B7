// selectionSort([5, 3, 8, 4, 2]);

const selectionSort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    console.log("State of arr:", array);
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // let temp = array[i];
      // array[i] = array[minIndex];
      // array[minIndex] = temp;

      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    console.log(`After pass ${i + 1}`, array);
  }
};

selectionSort([5, 3, 8, 4, 2]);