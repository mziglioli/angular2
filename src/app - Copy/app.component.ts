import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
   //FIXME remove test only
    title: string;
    someProperty = true;
    anotherProperty = true;
    
    constructor() {
        
    }
    
    ngOnInit(){
        this.title = 'Title';
    }
    
    setClasses(){
        let classes = {
                extraclass: this.someProperty,
                anotherclass: this.anotherProperty
        };
        return classes;
    }
    
    changeColor(){
        this.anotherProperty = !this.anotherProperty;
    }
    
    setStyles(){
        let styles = {
            'font-style' : this.someProperty ? 'italic' : 'normal',
            'background' : this.anotherProperty ? 'black' : 'green'
        };
        return styles;
    }

}