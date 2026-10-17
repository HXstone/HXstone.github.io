/**
 * Centralised raw input. Gameplay reads from this object; menus and modals
 * are DOM-driven, which keeps keyboard handling predictable.
 */
export class Input {
  constructor(element) {
    this.element = element;
    this.locked = false;
    this.keys = new Set();
    this.pressedKeys = new Set();
    this.mouse = { left: false, right: false, leftPressed: false, rightPressed: false };
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
    this.enabled = false;
    this.onLockChange = null;
    this.onLockError = null;
    this._bind();
  }

  _bind() {
    this._onKeyDown = (event) => {
      const code = event.code;
      if (
        ['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyR', 'KeyQ', 'KeyF', 'Tab', 'ShiftLeft'].includes(code) &&
        this.locked
      ) {
        event.preventDefault();
      }
      if (!event.repeat) this.pressedKeys.add(code);
      this.keys.add(code);
    };

    this._onKeyUp = (event) => {
      this.keys.delete(event.code);
    };

    this._onMouseDown = (event) => {
      if (!this.locked) return;
      if (event.button === 0) {
        this.mouse.left = true;
        this.mouse.leftPressed = true;
      }
      if (event.button === 2) {
        this.mouse.right = true;
        this.mouse.rightPressed = true;
      }
    };

    this._onMouseUp = (event) => {
      if (event.button === 0) this.mouse.left = false;
      if (event.button === 2) this.mouse.right = false;
    };

    this._onMouseMove = (event) => {
      if (!this.locked) return;
      this.mouseDX += event.movementX || 0;
      this.mouseDY += event.movementY || 0;
    };

    this._onWheel = (event) => {
      if (!this.locked) return;
      event.preventDefault();
      this.wheel += Math.sign(event.deltaY);
    };

    this._onContextMenu = (event) => {
      if (this.locked) event.preventDefault();
    };

    this._onBlur = () => this.releaseAll();

    this._onPointerLockChange = () => {
      const locked = document.pointerLockElement === this.element;
      if (locked === this.locked) return;
      this.locked = locked;
      document.body.classList.toggle('is-locked', locked);
      if (!locked) {
        this.releaseAll();
      } else {
        // The click that grants pointer lock may still be in flight. Do not
        // treat it as a held trigger once the viewport is captured.
        this.mouse.left = false;
        this.mouse.right = false;
        this.mouse.leftPressed = false;
        this.mouse.rightPressed = false;
      }
      if (this.onLockChange) this.onLockChange(locked);
    };

    this._onPointerLockError = () => {
      if (this.onLockError) this.onLockError();
    };

    window.addEventListener('keydown', this._onKeyDown, { passive: false });
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('wheel', this._onWheel, { passive: false });
    window.addEventListener('contextmenu', this._onContextMenu);
    window.addEventListener('blur', this._onBlur);
    document.addEventListener('pointerlockchange', this._onPointerLockChange);
    document.addEventListener('pointerlockerror', this._onPointerLockError);
  }

  _waitForLock(timeout = 700) {
    if (document.pointerLockElement === this.element) return Promise.resolve(true);
    return new Promise((resolve) => {
      let timer = 0;
      const done = (result) => {
        clearTimeout(timer);
        document.removeEventListener('pointerlockchange', onChange);
        document.removeEventListener('pointerlockerror', onError);
        resolve(result);
      };
      const onChange = () => done(document.pointerLockElement === this.element);
      const onError = () => done(false);
      document.addEventListener('pointerlockchange', onChange);
      document.addEventListener('pointerlockerror', onError);
      timer = window.setTimeout(() => done(document.pointerLockElement === this.element), timeout);
    });
  }

  async requestLock() {
    if (this.locked) return true;
    const lockResult = this._waitForLock();
    try {
      const promise = this.element.requestPointerLock({
        unadjustedMovement: true,
      });
      // Chrome returns a promise; Firefox/Safari may return undefined.
      if (promise && typeof promise.then === 'function') {
        await promise.catch(() => {});
      }
    } catch {
      try {
        this.element.requestPointerLock();
      } catch {
        if (this.onLockError) this.onLockError();
        return false;
      }
    }
    return lockResult;
  }

  exitLock() {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  isDown(code) {
    return this.keys.has(code);
  }

  wasPressed(code) {
    return this.pressedKeys.has(code);
  }

  consumeMouseDelta() {
    const delta = { x: this.mouseDX, y: this.mouseDY };
    this.mouseDX = 0;
    this.mouseDY = 0;
    return delta;
  }

  consumeWheel() {
    const value = this.wheel;
    this.wheel = 0;
    return value;
  }

  releaseAll() {
    this.keys.clear();
    this.pressedKeys.clear();
    this.mouse.left = false;
    this.mouse.right = false;
    this.mouse.leftPressed = false;
    this.mouse.rightPressed = false;
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
  }

  endFrame() {
    this.pressedKeys.clear();
    this.mouse.leftPressed = false;
    this.mouse.rightPressed = false;
  }

  dispose() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('wheel', this._onWheel);
    window.removeEventListener('contextmenu', this._onContextMenu);
    window.removeEventListener('blur', this._onBlur);
    document.removeEventListener('pointerlockchange', this._onPointerLockChange);
    document.removeEventListener('pointerlockerror', this._onPointerLockError);
  }
}
