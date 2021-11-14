const size = 4;
let currentIdSquare = null;
let point = 0;

const getEl = (el) => document.querySelector(el);
const getElList = (el) => document.querySelectorAll(el);

const handleClickSquare = ({ target }) => {
  const idSquare = parseInt(target.getAttribute('id-square'));

  if (currentIdSquare === null) {
    currentIdSquare = idSquare;
    target.innerHTML = `<img alt='' src='./img/squareImg/${idSquare}.png'>`;
    target.onclick = null;
  } else {
    if (currentIdSquare === idSquare) {
      const listElDuplicate = getElList(`div[id-square='${idSquare}']`);
      console.log('handleClickSquare ~ listElDuplicate', listElDuplicate);
      for (let e of listElDuplicate) {
        e.style.visibility = 'hidden';
        e.onclick = null;
      }
      point += 1;
      getEl('#point > p:last-child').innerHTML = point;
      if (point === 8) return alert('YOU WIN');
    } else {
      const listSquareEl = getElList('.square');
      currentIdSquare = idSquare;
      for (let s of listSquareEl) {
        s.innerHTML = '';
        s.onclick = handleClickSquare;
      }
      target.innerHTML = `<img alt='' src='./img/squareImg/${idSquare}.png'>`;
    }
  }
};

const renderSquare = () => {
  let listNumber = [...Array.from(Array(size * 2).keys()), ...Array.from(Array(size * 2).keys())];

  let listRandomId = [];
  let lengthListNumber = listNumber.length;
  let j = 0;

  while (lengthListNumber--) {
    j = Math.floor(Math.random() * (lengthListNumber + 1));
    listRandomId.push(listNumber[j]);
    listNumber.splice(j, 1);
  }

  let listSquare = '';
  for (let i = 0; i < listRandomId.length; i++) {
    listSquare += `<div class='square' id-square='${listRandomId[i]}'></div>`;
  }
  getEl('#playground').innerHTML = listSquare;
  getEl('#playground').style.width = `${size * 200}px`;

  const listSquareEl = getElList('.square');
  for (let s of listSquareEl) {
    s.onclick = handleClickSquare;
  }
};

renderSquare();
