let allTasks = [];
let valueInput = '';
let input1 = null;
let input2 = null;
let input3 = null;
let valueNumber = 0;
let valueDate = '';
let sum = 0;
indexEdit = null;



window.onload = init = () => {
  input1 = document.getElementById('add-task1');
  input1.addEventListener('change', updateValue);
  input2 = document.getElementById('add-task2');
  input2.addEventListener('change', updateValue1);
  input3 = document.getElementById('date-for-task');
  input3.addEventListener('change', updateValue2);
  input1.addEventListener('keyup', pushAll);
  input2.addEventListener('keyup', pushAll);
  input3.addEventListener('keyup', pushAll);
  input1.addEventListener('keyup', closeEl);
  input2.addEventListener('keyup', closeEl);
  input3.addEventListener('keyup', closeEl);
}

onClickButton = () => {
  if (valueInput.trim() && valueNumber && valueDate) {
    allTasks.push({
      text: valueInput.trim(),
      date: valueDate,
      sum: valueNumber,
      isEditingText: false,
      isEditingDate: false,
      isEditingSum: false
    });
    valueInput = '';
    valueDate = '';
    input1.value = '';
    input2.value = '';
    input3.value = '';
  };

  render();
};

const updateValue = (event) => {
  valueInput = event.target.value;
};
const updateValue1 = (event) => {
  valueNumber = event.target.value;
};
const updateValue2 = (event) => {
  valueDate = event.target.value;
};

const pushAll = (event) => {
  if (event.keyCode === 13) {
    return onClickButton();
  };
};

closeEl = (event) => {
  if (event.keyCode === 27) {
    return onClickMiniClose(index);
  };
}

calculation = (value) => {
  let newSum = 0;
  newSum = Number(value);
  sum = sum + newSum;
  return sum;
}


render = () => {
  sum = 0;

  const SumResult = document.getElementById('calc');

  const content = document.getElementById('content-page')
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allTasks.map((item, index) => {

    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task-container';



    if (index === indexEdit) {
      const shops = document.createElement('input');
      shops.className = 'shop';
      shops.type = 'text';
      shops.value = item.text;
      container.appendChild(shops);

      const newDate = document.createElement('input');
      newDate.className = 'dateNew';
      newDate.type = 'date';
      newDate.value = item.date;
      container.appendChild(newDate);

      const costs = document.createElement('input');
      costs.className = 'cost';
      costs.type = 'text';
      costs.value = item.sum;
      container.appendChild(costs);

      const imgDone = document.createElement('img');
      imgDone.src = 'images/done.png';
      imgDone.onclick = () => {
        onClickDone(shops.value, newDate.value, costs.value, index);
      };

      container.appendChild(imgDone);

      const imgClose = document.createElement('img');
      imgClose.src = 'images/close.png';
      imgClose.onclick = () => {
        onClickClose();
      };
      container.appendChild(imgClose);


    } else {
      if (!allTasks[index].isEditingText) {
        const text = document.createElement('p');
        text.innerText = `${index + 1 }) Магазин "${item.text}"`;
        text.className = 'text';
        text.ondblclick = () => {
          onClickShops(index)
        };
        container.appendChild(text);
      } else {
        const shops = document.createElement('input');
        shops.className = 'shop';
        shops.type = 'text';
        shops.autofocus = true;
        shops.value = item.text;
        shops.onkeypress = (event) => {
          if (event.keyCode === 13) {
            onKeyShop(shops.value, index);
          };
        };
        container.appendChild(shops);

        const imgDone = document.createElement('img');
        imgDone.src = 'images/done.png';
        imgDone.onclick = () => {
          onKeyShop(shops.value, index);
        };

        container.appendChild(imgDone);

        const imgClose = document.createElement('img');
        imgClose.src = 'images/close.png';
        imgClose.onclick = () => {
          onClickMiniCloseT(index);
        };
        container.appendChild(imgClose);
      };

      if (!allTasks[index].isEditingDate) {
        const purchaseDate = document.createElement('p');
        purchaseDate.innerText = item.date;
        purchaseDate.className = 'date';
        purchaseDate.ondblclick = () => {
          onClickDate(index)
        }
        container.appendChild(purchaseDate);
      } else {
        const newDate = document.createElement('input');
        newDate.className = 'dateNew';
        newDate.type = 'date';
        newDate.value = item.date;
        newDate.onkeypress = (event) => {
          if (event.keyCode === 13) {
            onKeyDate(newDate.value, index);
          };
        }
        container.appendChild(newDate);

        const imgDone = document.createElement('img');
        imgDone.src = 'images/done.png';
        imgDone.onclick = () => {
          onKeyDate(newDate.value, index);
        };

        container.appendChild(imgDone);

        const imgClose = document.createElement('img');
        imgClose.src = 'images/close.png';
        imgClose.onclick = () => {
          onClickMiniCloseD(index);
        };
        container.appendChild(imgClose);

      };

      if (!allTasks[index].isEditingSum) {
        const summ = document.createElement('p');
        summ.innerText = `${item.sum} р.`;
        summ.className = 'summ';
        summ.ondblclick = () => {
          onClicSumm(index);
        }
        container.appendChild(summ);
      } else {
        const costs = document.createElement('input');
        costs.className = 'cost';
        costs.type = 'text';
        costs.autofocus = true;
        costs.value = item.sum;
        costs.onkeypress = (event) => {
          if (event.keyCode === 13) {
            onKeySumm(costs.value, index);
          };
        }
        container.appendChild(costs);

        const imgDone = document.createElement('img');
        imgDone.src = 'images/done.png';
        imgDone.onclick = () => {
          onKeySumm(costs.value, index);
        };

        container.appendChild(imgDone);

        const imgClose = document.createElement('img');
        imgClose.src = 'images/close.png';
        imgClose.onclick = () => {
          onClickMiniCloseC(index);
        };
        container.appendChild(imgClose);

      };

      const newContainer = document.createElement('div');
      newContainer.className = 'imgDiv';

      const imgEdit = document.createElement('img');
      imgEdit.src = 'images/edit.png';
      imgEdit.onclick = () => {
        onClickEdit(index);
      };
      newContainer.appendChild(imgEdit);

      const imgDel = document.createElement('img');
      imgDel.src = 'images/delete.png';
      imgDel.onclick = () => {
        onClickDel(index)
      }
      newContainer.appendChild(imgDel);
      container.appendChild(newContainer);
    }

     content.appendChild(container);

    let resultSum = calculation(item.sum);
    SumResult.innerText = `Итого ${resultSum} р.`

  });

};

// Основные кнопки
onClickEdit = (index) => {
  indexEdit = index;
  render();
};

onClickDone = (val, val1, val2, index) => {
  allTasks[index].text = val;
  allTasks[index].date = val1;
  allTasks[index].sum = val2;

  indexEdit = null;
  render()
};


onClickClose = (index) => {
  indexEdit = index;
  render();
}

onClickDel = (index) => {
  allTasks.splice(index, 1);
  render();
}

// Доп кнопки
onClickShops = (index) => {
  allTasks[index].isEditingText = true;

  render();
}

onClickDate = (index) => {
  allTasks[index].isEditingDate = true;
  render();
}

onClicSumm = (index) => {
  allTasks[index].isEditingSum = true;
  render();
}

onKeyShop = (newText, index) => {
  allTasks[index].text = newText;
  allTasks[index].isEditingText = false;
  render()
}

onKeyDate = (newD, index) => {
  allTasks[index].date = newD;
  allTasks[index].isEditingDate = false;
  render()
}

onKeySumm = (newSum, index) => {
  allTasks[index].sum = newSum;
  allTasks[index].isEditingSum = false;
  render()
}



onClickMiniCloseT = (index) => {
  allTasks[index].isEditingText = false;
  render();
}

onClickMiniCloseD = (index) => {
  allTasks[index].isEditingDate = false;
  render();
}

onClickMiniCloseC = (index) => {
  allTasks[index].isEditingSum = false;
  render();
}