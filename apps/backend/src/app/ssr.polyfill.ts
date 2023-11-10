import * as domino from 'domino';
import {existsSync, readFileSync} from 'fs';
import * as path from 'path';

function mockWindow(indexHtml: string): void {
  const template = readFileSync(indexHtml).toString();
  // for mock global window by domino
  const win = domino.createWindow(template);
  // mock
  // eslint-disable-next-line @typescript-eslint/dot-notation
  global['window'] = win as any;
  // not implemented property and functions
  Object.defineProperty(win.document.body.style, 'transform', {
    value: () => ({
      enumerable: true,
      configurable: true
    })
  });

  // mock requestAnimationFrame
  Object.defineProperty(win, 'requestAnimationFrame', {
    value: () => {
      // do nothing just for avoid error
    }
  });

  // mock document
  // eslint-disable-next-line @typescript-eslint/dot-notation
  global['document'] = win.document;
  // mock navigator
  // eslint-disable-next-line @typescript-eslint/dot-notation
  global['navigator'] = win.navigator;
}

export function setupDomino(clientPath: string): void {
  const indexHtml = path.join(clientPath, 'browser', 'index.html');
  // wait for the frontend directory to be created (only dev)
  if (process.env.NODE_ENV === 'development') {
    const timerId = setInterval(() => {
      if (existsSync(indexHtml)) {
        mockWindow(indexHtml);
        clearInterval(timerId);
      }
    }, 500);
  } else {
    mockWindow(indexHtml);
  }
}

