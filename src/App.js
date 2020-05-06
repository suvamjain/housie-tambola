import React, { Component } from "react";
import styled from "styled-components";
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";

import Controller from "./features/Housie/Controller";
import GameGenerator from "./features/Housie/GameGenerator";

class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <ModalProvider backgroundComponent={FadingBackground}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/game" component={Controller} />
            </Switch>

            <Switch>
              <Route exact path="/housie" component={GameGenerator} />
            </Switch>
          </div>
        </BrowserRouter>
      </ModalProvider>
    );
  }
}

export default App;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  background-color: ${(props) => props.background};
  transition: opacity ease 200ms;
`;
