import { Component, ViewChild, ElementRef } from '@angular/core';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-frontend';
  chatForm: FormGroup;
  @ViewChild('htmlStr') htmlStr: ElementRef;
  @ViewChild('typeStr') typeStr: ElementRef;

  constructor( private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  	this.chatForm = this.formBuilder.group({
  		name: [''],
  		message: [''],
  	});

  	socket.on('chat', (data) => {
  		this.typeStr.nativeElement.innerHTML = '';
  		this.htmlStr.nativeElement.innerHTML += `<p><b>${data.name} </b>${data.message}</p>`;
  	});

  	socket.on('typing', (data) => {
  		this.typeStr.nativeElement.innerHTML += `${data.name} is typing....`;
  	});
  }

  send() {
  	let name = this.name.value;
  	let message = this.message.value;
  	socket.emit('chat', { name, message });
  }

  typingText() {
  	let name = this.name.value;
  	socket.emit('typing', { name })
  }

  get name() {
  	return this.chatForm.get('name');
  }

  get message() {
  	return this.chatForm.get('message');
  }
}
