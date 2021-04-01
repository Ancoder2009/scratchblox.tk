/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.username = 0;
    this.vars.password = 0;
    this.vars.message = 0;

    this.watchers.message = new Watcher({
      label: "Message",
      style: "normal",
      visible: true,
      value: () => this.vars.message,
      x: 245,
      y: 175
    });
  }

  *whenGreenFlagClicked() {
    this.watchers.Message.visible = false;
    var respo = null
    yield* this.askAndWait("Username");
    this.vars.username = this.answer;
    yield* this.askAndWait("Password");
    this.vars.password = this.answer;
    var data = new FormData();
    data.append('username', this.vars.username);
    data.append('password', this.vars.password);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.scratchblox.tk/register', true);
    xhr.onload = function () {
        // do something to response
        this.watchers.mySpriteVar.visible = true;
        respo = this.responseText;
        console.log(respo)
    };
    this.vars.Message = respo
    xhr.send(data);
  }

  *makeAcc() {}
}
