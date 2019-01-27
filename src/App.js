import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import banner from './images/YodaSpeakBanner.png';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  max-width: 700px;
  width: 100%;
  height: 500px;
  margin-top: 50px
  background-color: #2A2B26;
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  height: 500px;
  width: 100%;
`;

const Banner = styled.img`
  max-width: 350px;
  width: 100%;
`;

const AboutText = styled.div`
  color: #F9D71C;
  max-width: 300px;
  width: 100%;
  a{
    text-decoration: none;
    color: #4BD5EE;
    &:hover{
      color: #900000;
    }
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  height: 500px;
  width: 100%;
  background-color: #000000;
`;

const InputTop = styled.div`
  height: 250px;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBottom = styled.div`
  height: 250px;
  max-width: 300px;
  width: 100%;
  color: #4BD5EE;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

const Input = styled.input`
  border: none;
  border-radius: 8px;
  font-size: 24px;
  max-width: 250px;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: 1px solid #F9D71C;
  border-radius: 8px;
  font-size: 24px;
  background: linear-gradient(to right, #2FF923 50%, #000000 50%);
  background-size: 202% 100%;
  background-position: right bottom;
  transition: all .3s ease-out;
  color: #F9D71C;
  &:hover{
    background-position: left bottom;
    border: 1px solid #000000;
    color: #FFFFFF;
  }
`;

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: '',
      yodaText: '',
      history: []
    };
  };

  changeHandler = e => {
    this.setState({
      text: e.target.value
    });
  };

  getYodaSpeak = e => {
    axios({method: 'get',
            url:`https://cors-anywhere.herokuapp.com/http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURIComponent(this.state.text)}`,
            headers: {'Origin': 'https://example.com'}})
        .then(response => {
          this.setState({
            yodaText: response.data.yodish,
            history: [...this.state.history, response.data.yodish],
            text: ''
          });
          window.responsiveVoice.speak(this.state.yodaText, 'US English Male');
        })
        .catch(err => console.log(err));
  };

  render() {
    return (
      <AppContainer>
        <AboutSection>
          <Banner src={banner}/>
          <AboutText>
            <p>Not that long ago, in galaxy not so far away, this very galaxy actually, I was bored and decided to create this. Just input some text and hit the "Yodafy Me!" button, and hear it like Yoda would say it (kinda). Not all phrases will work.</p>
            <p>Built in React, it uses the <a href='https://github.com/richchurcher/yoda-api'>yoda-api</a> by Rick Churcher to translate into Yodish and <a href='https://responsivevoice.org/api/'>ResponsiveVoice.js</a> for text to speech.</p>
            <a href='https://github.com/xpuentes'>- xpuentes</a>
          </AboutText>
        </AboutSection>
        <InputSection>
          <InputTop>
            <Input placeholder='Do or do not...' onChange={this.changeHandler} value={this.state.text}/>
            <Button onClick={this.getYodaSpeak}>Yodafy Me!</Button>
          </InputTop>
          <InputBottom>
            {this.state.history.map(phrase => <div>{phrase}</div>)}
          </InputBottom>
        </InputSection>
      </AppContainer>
    );
  }
}

export default App;
