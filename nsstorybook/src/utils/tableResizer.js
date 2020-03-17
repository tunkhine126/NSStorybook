/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-void */
/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */

export default function resizableGrid(e, color) {
  const t = e.getElementsByTagName('tr')[0];
  const n = t ? t.children : void 0;
  const eventsToRemove = [];
  if (n) {
    for (let i = e.offsetHeight, o = 0; o < n.length - 1; o++) {
      const r = s(i);
      r.style.borderRight = `1px solid ${color}`;
      r.style.marginRight = '5px';
      n[o].appendChild(r), eventsToRemove.push(d(r));
    }
  }
  function d(e) {
    let t;
    let n;
    let i;
    let o;
    let r;

    const mouseDownEvent = e => {
      (n = e.target.parentElement), (i = n.nextElementSibling), (t = e.pageX);
      const d = (function(e) {
        if (l(e, 'box-sizing') === 'border-box') return 0;
        const t = l(e, 'padding-left');
        const n = l(e, 'padding-right');
        return parseInt(t) + parseInt(n);
      })(n);
      (o = n.offsetWidth - d), i && (r = i.offsetWidth - d);
    };

    const mouseMoveEvent = e => {
      if (n) {
        const d = e.pageX - t;
        i && (i.style.width = `${r - d}px`), (n.style.width = `${o + d}px`);
      }
    };

    const mouseUpEvent = e => {
      (n = void 0), (i = void 0), (t = void 0), (r = void 0), (o = void 0);
    };

    e.addEventListener('mousedown', mouseDownEvent),
    document.addEventListener('mousemove', mouseMoveEvent),
    document.addEventListener('mouseup', mouseUpEvent);

    // Return events to remove on component dismount (preventing memory leaks)
    return [
      {
        event: 'mousedown',
        element: e,
        fn: mouseDownEvent,
      },
      {
        event: 'mousemove',
        element: document,
        fn: mouseMoveEvent,
      },
      {
        event: 'mouseup',
        element: document,
        fn: mouseUpEvent,
      },
    ];
  }
  function s(e) {
    const t = document.createElement('div');
    return (
      (t.style.top = 0),
      (t.style.right = 0),
      (t.style.width = '5px'),
      (t.style.position = 'absolute'),
      (t.style.cursor = 'col-resize'),
      (t.style.userSelect = 'none'),
      (t.style.height = `100%`),
      t
    );
  }
  function l(e, t) {
    return window.getComputedStyle(e, null).getPropertyValue(t);
  }

  const dismount = () => {
    eventsToRemove.forEach(column => {
      column.forEach(({ element, event, fn }) => {
        element.removeEventListener(event, fn);
      });
    });
  };

  return {
    dismount,
  };
}
