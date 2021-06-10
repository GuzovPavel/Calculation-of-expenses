let allTasks = [];
let valueInput = '';
let input1 = null;
let input2 = null;
let input3 = null;
let valueNumber = 0;
let sum = 0;
let valueDate = '';
indexEdit = null;
let isEditingText = null;
let isEditingDate = null;
let isEditingSum = null;

window.onload = async function init() {
  input1 = document.getElementById('add-task1');
  input1.addEventListener('change', updateValue);
  input2 = document.getElementById('add-task2');
  input2.addEventListener('change', updateValue1);
  input3 = document.getElementById('date-for-task');
  input3.addEventListener('change', updateValue2);
  input1.addEventListener('keyup', pushAll);
  input2.addEventListener('keyup', pushAll);
  input3.addEventListener('keyup', pushAll);

  SumResult = document.getElementById('calc');

  const response = await fetch('http://localhost:4000/allTasks', {
    method: 'GET'
  });
  let result = await response.json();
  allTasks = result.data;
  render()
}

onClickButton = async () => {
  if (valueInput.trim() && valueNumber && valueDate) {

    const resp = await fetch('http://localhost:4000/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        text: valueInput.trim(),
        date: valueDate,
        sum: valueNumber,
      })
    })
    let result = await resp.json();
    allTasks.push(result.data);

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
    onClickButton();
  };
};

render = () => {
  let totalCount = 0;

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
      if (isEditingText !== index) {
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


      if (isEditingDate !== index) {
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

      if (isEditingSum !== index) {
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

    totalCount += Number(item.sum);
  });
  SumResult.innerText = `Итого: ${totalCount} р.`;

};

onClickEdit = (index) => {
  indexEdit = index;
  render();
};

onClickDone = async (newText, newDate, newSum, index) => {
  allTasks[index].text = newText;
  allTasks[index].date = newDate;
  allTasks[index].sum = newSum;
  indexEdit = null;
  const response = await fetch('http://localhost:4000/changeTask', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      text: newText,
      date: newDate, 
      sum: newSum,
      _id: allTasks[index]._id
    })
  });
  render();
};


onClickClose = (index) => {
  indexEdit = index;
  render();
};

onClickDel = async (index) => {
  const response = await fetch(`http://localhost:4000/deleteTask?_id=${allTasks[index]._id}`, {
    method: 'DELETE'
  });
  let result = await response.json();
  allTasks = result.data;
  render();
};

onClickShops = (index) => {
  isEditingText = index;
  render();
};

onClickDate = (index) => {
  isEditingDate = index;
  render();
}

onClicSumm = (index) => {
  isEditingSum = index;
  render();
};

onKeyShop = async (newText, index) => {
  allTasks[index].text = newText;
  isEditingText = null;
  const response = await fetch('http://localhost:4000/changeTask', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      text: newText,
      _id: allTasks[index]._id
    })
  });

  let result = await response.json();
  allTasks = result.data;
  render();
};

onKeyDate = async (newD, index) => {
  allTasks[index].date = newD;
  isEditingDate = null;
  const response = await fetch('http://localhost:4000/changeTask', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      date: newD,
      _id: allTasks[index]._id
    })
  });

  let result = await response.json();
  allTasks = result.data;
  render();
};

onKeySumm = async (newSum, index) => {
  allTasks[index].sum = newSum;
  isEditingSum = null;
  const response = await fetch('http://localhost:4000/changeTask', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      sum: newSum,
      _id: allTasks[index]._id
    })
  });
  let result = await response.json();
  allTasks = result.data;
  render();
};


onClickMiniCloseT = (index) => {
  isEditingText = null;
  render();
};

onClickMiniCloseD = (index) => {
  isEditingDate = null;
  render();
};

onClickMiniCloseC = (index) => {
  isEditingSum = null;
  render();
};