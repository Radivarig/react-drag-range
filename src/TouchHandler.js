export class TouchHandler {
  constructor (element) {
    this.element = element
  }

  handler = (e) => {
    const touches = e.changedTouches
    const first = touches[0]
    let type = ""
    switch(e.type) {
    case "touchstart": type = "mousedown"; break
    case "touchmove": type = "mousemove"; break
    case "touchend": type = "mouseup"; break
    default: return
    }

    // initMouseEvent(
    //   type, canBubble, cancelable, view, clickCount,
    //   screenX, screenY, clientX, clientY, ctrlKey,
    //   altKey, shiftKey, metaKey, button, relatedTarget)

    const simulatedEvent = this.element.createEvent ("MouseEvent")
    simulatedEvent.initMouseEvent (
      type, true, true, window, 1,
      first.screenX, first.screenY,
      first.clientX, first.clientY, false,
      false, false, false, 0/*left*/, null
    )

    first.target.dispatchEvent (simulatedEvent)
    event.preventDefault ()
  }

  init = () => {
    this.element.addEventListener ("touchstart", this.handler, true)
    this.element.addEventListener ("touchmove", this.handler, true)
    this.element.addEventListener ("touchend", this.handler, true)
    this.element.addEventListener ("touchcancel", this.handler, true)
  }

  deinit = () => {
    this.element.removeEventListener ("touchstart", this.handler)
    this.element.removeEventListener ("touchmove", this.handler)
    this.element.removeEventListener ("touchend", this.handler)
    this.element.removeEventListener ("touchcancel", this.handler)
  }
}
