import React, { Component } from "react";
import styled from "styled-components";

import Ticket from "./Ticket";

class Controller extends Component {
  constructor(props) {
    super(props);
    let table = {};
    for (var i = 1; i <= 90; i++) {
      table[i] = false;
    }

    let claims = {};
    props.claims.map((item) => {
      return (claims[item] = false);
    });

    this.state = {
      table,
      tickets: props.tickets,
      claims,
    };
  }

  // mark/unmark table numbers
  toggleNumber = (number) => {
    let { table } = this.state;
    table[number] = !table[number];
    this.setState({ table });
  };

  handleCheckbox = ({ target }) => {
    const { id, checked } = target;
    let { claims } = this.state;
    claims[id] = checked;
    this.setState({ claims });
  };

  resetGame = () => {
    let table = {},
      claims = {},
      tickets = [];
    for (var i = 1; i <= 90; i++) {
      table[i] = false;
    }
    this.props.claims.map((item) => {
      return (claims[item] = false);
    });

    this.props.tickets.map((t, index) => {
      t.isFreezed = false;
      return tickets.push(t);
    });

    this.setState({ table, claims, tickets });
  };

  freezeTicket = (index) => {
    const { tickets } = this.state;
    tickets[index].isFreezed = !tickets[index].isFreezed;
    this.setState({ tickets });
  };

  render() {
    const { table, claims } = this.state;

    const TableList = Object.keys(table).map((item, index) => {
      return (
        <Cell
          key={index}
          active={table[item]}
          onClick={() => this.toggleNumber(item)}
        >
          {item}
        </Cell>
      );
    });

    const ClaimsListItems = Object.keys(claims).map((item, index) => {
      return (
        <label key={index}>
          <input
            id={item}
            key={index}
            type="checkbox"
            checked={claims[item]}
            onChange={this.handleCheckbox}
          />
          {item}
        </label>
      );
    });

    const Tickets = this.state.tickets.map((item, index) => {
      return (
        <Ticket
          key={index}
          data={item.data}
          ticketNo={item.ticketNo}
          table={table}
          claims={claims}
          isFreezed={item.isFreezed}
          freezeTicket={() => this.freezeTicket(index)}
        />
      );
    });

    return (
      <Wrapper>
        <TicketWrapper>{Tickets}</TicketWrapper>
        <RightWrapper>
          <Table>{TableList}</Table>
          <ClaimsList>{ClaimsListItems}</ClaimsList>
        </RightWrapper>
        <ButtonWrapper>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            End Game
          </Button>
          <Button onClick={this.resetGame}>Reset</Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default Controller;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 5rem;
  position: relative;
`;

const RightWrapper = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 4rem;
  right: 5rem;
`;

const ClaimsList = styled.div`
  display: grid;
  width: 450px;
  align-self: center;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
  grid-gap: 1rem;
  margin-top: 2rem;

  label {
    text-align: left;
    font-size: 1.4rem;
    font-family: OpenSansRegular;
  }
`;

const Table = styled.div`
  display: grid;
  align-self: center;
  grid-template-rows: repeat(9, 50px);
  grid-template-columns: repeat(10, 50px);
  border: 1px solid #000;
`;

const Cell = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-family: OpenSansSemiBold;
  border: 1px solid #000;
  width: 50px;
  height: 50px;
  padding: auto;
  outline: none;
  cursor: pointer;
  background-color: white;

  ${(props) =>
    props.active ? { "background-color": "#222832", color: "white" } : null};

  &:hover {
    background-color: ${(props) => (props.active ? "" : "#eeeeee")};
  }
`;

const TicketWrapper = styled.div`
  display: grid;
  width: 45%;
  grid-template-rows: auto;
  grid-template-columns: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-between;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  max-width: 15rem;
  height: 4.4rem;
  justify-content: center;
  font-size: 1.4rem;
  font-family: OpenSansSemiBold;
  color: #222832;
  border-radius: 2px;
  border: 1px solid #222832;
  padding: 1rem;
  outline: none;
  background-color: white;

  &:not(last-child) {
    margin-right: 1.6rem;
  }

  &:hover,
  &:active {
    cursor: pointer;
    background-color: #222832;
    color: white;
  }
`;
