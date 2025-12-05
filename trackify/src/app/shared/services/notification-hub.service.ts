import { Injectable, inject } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationHubService {
  private hubConnection!: signalR.HubConnection;
  private notificationService = inject(NotificationService);

  notifications = this.notificationService.notifications;

  constructor() {
    this.startConnection();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7027/notificationHub`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Signal R connected'))
      .catch((err) => console.log('Error connecting to signal R'));

    this.hubConnection.on('ReceiveNotification', (message) => {
      console.log(message);
      console.log(message.newNotification);
      this.notifications.update((prev) => [message.newNotification, ...prev]);

    });
  }
}
