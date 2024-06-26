import './reset.css';
import './style.css';

const BOX_DATA = [
  [1, 1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function initApp() {
  //* store the box item
  const boxItemMap = new Map<number, HTMLButtonElement>();
  //* track the number of selected box
  let counter = 0;
  //* track the number of valid box
  let validBoxAmount = 0;

  let shutdown = false;

  const boxList = document.createElement('ul');
  boxList.classList.add('box-list');

  BOX_DATA.forEach((row) => {
    const rowElement = document.createElement('ul');
    rowElement.classList.add('row');

    boxList.appendChild(rowElement);

    row.forEach((cell) => {
      const cellElement = document.createElement('li');
      cellElement.classList.add('cell');

      const boxItem = document.createElement('button');
      boxItem.classList.add('box');

      cellElement.appendChild(boxItem);
      rowElement.appendChild(cellElement);

      if (cell === 0) {
        boxItem.setAttribute('data-empty', 'true');
        return;
      }

      validBoxAmount++;

      boxItem.addEventListener('click', () => {
        if (shutdown || boxItem.dataset.selected === 'true') return;

        boxItem.setAttribute('data-selected', 'true');
        boxItemMap.set(counter, boxItem);
        counter += 1;

        console.log({ boxItemMap });

        if (counter === validBoxAmount) {
          let intervalCounter = 0;

          shutdown = true;

          const boxItemMapKeys = () => {
            boxItemMap.get(intervalCounter)?.removeAttribute('data-selected');
          };

          boxItemMapKeys();

          const interval = setInterval(() => {
            intervalCounter++;
            boxItemMapKeys();

            if (intervalCounter === validBoxAmount - 1) {
              clearInterval(interval);
              boxItemMap.clear();
              counter = 0;
              shutdown = false;
            }
          }, 1000);
          // boxItemMap.forEach((item, index) => {
          //   setTimeout(() => {
          //     item.removeAttribute('data-selected');
          //   }, 1000 * index);
          // });
        }
      });
    });
  });

  const app = document.getElementById('app');
  app?.appendChild(boxList);
}

initApp();
