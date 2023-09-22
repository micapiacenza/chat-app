import { Component, OnInit } from '@angular/core';
import {SocketioService} from "../../common/services/socket/socketio.service";

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css']
})
export class MainChatComponent implements OnInit {
// @ts-ignore
  public wss;

  constructor(private socketioService: SocketioService) {
    socketioService.setupSocketConnection().then(ws => {
      this.wss = ws;
    });
  }

  ngOnInit(): void {
  }

  public pushMessage() {
    // @ts-ignore
    this.wss.send(JSON.stringify('alksjdflkajsdf'));
    // this.wss.send(JSON.stringify({roomId: 'alksjdflkajsdf', userId:'aksdjfkajsdf', message:'', onEvent:'join'}));
  }



}
