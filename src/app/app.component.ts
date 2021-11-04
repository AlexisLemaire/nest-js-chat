import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pseudo? = localStorage.getItem('pseudo');
  messages?: any[];
  form!: FormGroup;
  form2!: FormGroup;
  message?: { author: string, message: string };

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('pseudo', this.pseudo);
    this.getMessages();

    this.form = this.fb.group({
      pseudo: ['', Validators.required]
    })

    this.form2 = this.fb.group({
      message: ['', Validators.required]
    })
  }

  async setPseudo() {
    await localStorage.setItem('pseudo', this.form.value.pseudo);
    location.reload();
  }

  sendMessage() {
    this.message = { author: this.pseudo || "", message: this.form2.value.message };
    this.http.post("https://nest-js-chat.herokuapp.com/messages", this.message).subscribe( res => console.log(res));
    location.reload();
  }

  getMessages() {
    this.http.get("https://nest-js-chat.herokuapp.com/messages").subscribe( (res : any) => this.messages = res);
  }
}
