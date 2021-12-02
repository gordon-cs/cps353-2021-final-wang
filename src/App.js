import './App.css';
import React,{ Component} from 'react';
import Axios from 'axios';

export default class App extends Component{
  url = "https://labs.bible.org/api/?passage=";

  state = {data: null};

  componentDidMount(){
    this.getData('Genesis',1,1);
  }

  getData(book,chapter,verse){
    Axios.get(this.url+book+"%20"+chapter+':'+verse+"&type=json").then((abc) => {
      console.log(abc);

      this.setState({ data: abc.data})
    });
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
  
  render(){
    if (!this.state.data) return<div>Sorry can't find the verse.</div>;

    return (
      <div class="main">
        <div class="text"> 
          <input type="text" id="bookName" class="textBox"/>
          <span> </span>
          <input type="text" id="chapter" class="textBox" />
          <span>:</span>
          <input type="text" id="verse" class="textBox"/>
          <button id="search" class="textBox" onClick={()=> this.getData(document.getElementById("bookName").value,
                                            document.getElementById("chapter").value,
                                            document.getElementById("verse").value)}> 
            search
          </button>
        </div>
        <div class="content">{this.showContent()}</div>
      </div>
    );
  }
}

