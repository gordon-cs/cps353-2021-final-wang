import './App.css';
import React,{ Component} from 'react';
import Axios from 'axios';

export default class App extends Component{
  url = "https://labs.bible.org/api/?passage=";

  state = {data: null};

  componentDidMount(){
    this.getData('Hebrews',12,1);
  }

  getData(book,chapter,verse) {
    if(verse===null) {
      Axios.get(this.url+book+"%20"+chapter+"&type=json").then((abc) => {
        console.log(abc);

        this.setState({ data: abc.data})
      });
    } else {
      Axios.get(this.url+book+"%20"+chapter+':'+verse+"&type=json").then((abc) => {
        console.log(abc);

        this.setState({ data: abc.data})
      });
    }
  }
  
  showContent(){
    return this.state.data.map((verse, index) => {
      return (
      <div key={index} className="verse">
        <span>{verse.bookname + ' '+
              + verse.chapter + ':'+
               verse.verse  }</span>
        <br></br>
        <span> {verse.text}</span>
      </div> 
      );
    });
  }
  
  // showButton(index){
  //   if(true) {
  //     return  (<button id="front" class="textBox" onClick={()=> this.getData(this.state.data[0].bookname,
  //     this.state.data[0].chapter-1,
  //     this.state.data[0].verse)}> 
  //     index
  //     </button>);
      
  //   } else {
  //     return
  //      <button id="front" class="textBox" > 
  //     index
  //     </button>;
  //   }
  // }

  showPre(){
    if(true) {
      return  (<button id="pre" class="textBox" onClick={()=> this.getData(this.state.data[0].bookname,
      this.state.data[0].chapter-1,
      this.state.data[0].verse)}> 
      PRE
      </button>);
      
    } else {
      return
       <button id="front" class="textBox" > 
      NEXT
      </button>;
    }
  }

  showNext(){
    if(true) {
      return  (<button id="next" class="textBox" onClick={()=> this.getData(this.state.data[0].bookname,
      this.state.data[0].chapter-(-1),
      this.state.data[0].verse)}> 
      NEXT
      </button>);
      
    } else {
      return
       <button id="front" class="textBox" > 
      NEXT
      </button>;
    }
  }
  
  render(){
    if (!this.state.data) return<div>Sorry can't find the verse.</div>;

    return (
      <div class="main">
        <div class="text"> 
          {this.showPre()}
            <input type="text" id="bookName" class="textBox"/>
            <span> </span>
            <input type="text" id="chapter" class="textBox" />
            <span>:</span>
            <input type="text" id="verse" class="textBox"/>
    
          <button id="search" class="textBox" onClick={()=> this.getData(document.getElementById("bookName").value,
                                            document.getElementById("chapter").value,
                                            document.getElementById("verse").value)}> 
          Search
          </button>
          <button id="front" class="textBox" onClick={()=> this.getData(this.state.data[0].bookname,
          this.state.data[0].chapter,
          this.state.data[0].verse-5)}> 
          Full Chapter
          </button>
          {this.showNext()}
        </div>
        <div class="content">{this.showContent()}</div>
      </div>
    );
  }
}

