import React, { Component } from "react";
import styled from "styled-components";

import Ticket from "./Ticket";
import ModalProvider from "../Modals/ModalProvider";
import { CONFIRMATION_MODAL_FOOTER } from "../Modals/ModalFooters";
import { CONFIRMATION_MODAL_HEADER } from "../Modals/ModalHeaders";
import { CONFIRMATION_MODAL_BODY } from "../Modals/ModalBodies";

import DeleteIcon from "../../assets/cross-mark.svg";
import Controller from "./Controller";
import Background from "../../assets/background_3.jpg";

class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTicketDialogOpen: false,
      errorMsg: "",
      ticketNo: "00",
      data: new Array(27).fill(""),
    };
  }

  initialState = () => {
    this.setState({
      isTicketDialogOpen: false,
      ticketNo: "00",
      errorMsg: "",
      data: new Array(27).fill(""),
    });
  };

  handleSave = () => {
    //close, validate and save ticket
    const { data } = this.state;
    if (
      this.countNumbersInRow(data.slice(0, 9)) &&
      this.countNumbersInRow(data.slice(9, 18)) &&
      this.countNumbersInRow(data.slice(18, 27))
    ) {
      const ticket = {
        ticketNo: this.state.ticketNo,
        data: this.state.data,
        isFreezed: false,
      };
      this.props.saveTicket(ticket);
      this.initialState();
    } else {
      this.setState({ errorMsg: "Each row must have exactly 5 numbers!!" });
    }
  };

  countNumbersInRow = (arr) => {
    let count = 0;
    arr.map((item) => {
      if (item !== "") count++;
    });
    if (count === 5) return true;
    return false;
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === "ticketNo") this.setState({ ticketNo: value });
    else {
      let { data } = this.state;
      if (
        value === "" ||
        /\D/.test(value) ||
        parseInt(value) < 1 ||
        parseInt(value) > 90
      )
        data[id] = "";
      else data[id] = parseInt(value);
      this.setState({ data, errorMsg: "" });
    }
  };

  render() {
    const showTicketDialog = (
      <ModalProvider
        isOpen={this.state.isTicketDialogOpen}
        backdrop
        modal={{
          header: () =>
            CONFIRMATION_MODAL_HEADER(this.initialState, "Add New Ticket"),
          body: () => {
            return (
              <TicketFormWrapper>
                <Ticket
                  edit
                  error={this.state.errorMsg}
                  data={this.state.data}
                  ticketNo={this.state.ticketNo}
                  handleTextChange={this.handleChange}
                />
              </TicketFormWrapper>
            );
          },

          footer: () =>
            CONFIRMATION_MODAL_FOOTER(
              "Cancel",
              "Save",
              this.initialState,
              this.handleSave
            ),
        }}
      />
    );
    return (
      <>
        <Button onClick={() => this.setState({ isTicketDialogOpen: true })}>
          Add New Ticket
        </Button>
        {showTicketDialog}
      </>
    );
  }
}

class AddClaims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClaimsDialogOpen: false,
      errorMsg: "",
      data: props.data,
    };
  }

  handleSave = () => {
    //validate and save claims
    const { data } = this.state;
    const newClaims = Object.keys(data).filter((x) => data[x] === true);
    if (newClaims.length > 0) {
      this.props.saveClaims(newClaims);
      this.setState({ isClaimsDialogOpen: false });
    } else {
      this.setState({ errorMsg: "Atleast 1 claim should be selected!!" });
    }
  };

  handleChange = ({ target }) => {
    const { id, checked } = target;
    let { data } = this.state;
    data[id] = checked;
    this.setState({ data, errorMsg: "" });
  };

  render() {
    const { data } = this.state;

    let ClaimsListFormsItems = Object.keys(data).map((item, index) => {
      return (
        <label key={index}>
          <input
            id={item}
            key={index}
            type="checkbox"
            checked={data[item]}
            onChange={this.handleChange}
          />
          {item}
        </label>
      );
    });

    const showClaimsDialog = (
      <ModalProvider
        isOpen={this.state.isClaimsDialogOpen}
        backdrop
        modal={{
          header: () =>
            CONFIRMATION_MODAL_HEADER(
              () => this.setState({ isClaimsDialogOpen: false }),
              "Select Claims"
            ),
          body: () => {
            return (
              <ClaimsFormWrapper>
                <p id="error">{this.state.errorMsg}</p>
                <ClaimsList>{ClaimsListFormsItems}</ClaimsList>
              </ClaimsFormWrapper>
            );
          },

          footer: () =>
            CONFIRMATION_MODAL_FOOTER(
              "Cancel",
              "Save",
              () => this.setState({ isClaimsDialogOpen: false }),
              this.handleSave
            ),
        }}
      />
    );
    return (
      <>
        <Button onClick={() => this.setState({ isClaimsDialogOpen: true })}>
          Select Claims
        </Button>
        {showClaimsDialog}
      </>
    );
  }
}

class GameGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNextDialogOpen: false,
      tickets: [],
      allClaimsList: {
        early4: false,
        early5: false,
        early6: false,
        early7: false,
        line1: false,
        line2: false,
        line3: false,
        younger: false,
        older: false,
        corner: false,
        cornerWithStar: false,
        breakfast: false,
        lunch: false,
        dinner: false,
        frame: false,
        anda: false,
        danda: false,
        smallerGreater: false,
        house1: false,
        house2: false,
        house3: false,
        house4: false,
        house5: false,
        house6: false,
        house7: false,
        house8: false,
      },
      claims: [],
      step: 1,
    };
  }

  AddTicket(ticket) {
    this.setState({ tickets: [...this.state.tickets, ticket] });
  }

  AddClaims(claims) {
    const { allClaimsList } = this.state;
    claims.map((item) => {
      return (allClaimsList[item] = true);
    });
    this.setState({ allClaimsList, claims });
  }

  DeleteTicket(index) {
    let { tickets } = this.state;
    tickets = tickets.filter((x, idx) => (idx !== index ? x : null));
    this.setState({ tickets });
  }

  startGame = () => {
    const { tickets, claims } = this.state;
    if (tickets.length === 0 || claims.length === 0) {
      this.setState({ isNextDialogOpen: true });
    } else {
      this.setState({ isNextDialogOpen: true, step: 2 });
    }
  };

  render() {
    const { tickets, allClaimsList, claims, step } = this.state;
    const showNextDialog = (
      header,
      body,
      buttonLabel,
      positiveAction,
      negativeAction
    ) => {
      return (
        <ModalProvider
          isOpen={this.state.isNextDialogOpen}
          backdrop
          modal={{
            header: () =>
              CONFIRMATION_MODAL_HEADER(
                () => this.setState({ isNextDialogOpen: false }),
                header
              ),
            body: () => CONFIRMATION_MODAL_BODY(body),
            footer: () =>
              CONFIRMATION_MODAL_FOOTER(
                "Cancel",
                buttonLabel,
                negativeAction ||
                  (() => this.setState({ isNextDialogOpen: false })),
                positiveAction
              ),
          }}
        />
      );
    };
    const Tickets = tickets.map((item, index) => {
      return (
        <TicketRow key={index}>
          <Ticket
            key={index}
            data={item.data}
            ticketNo={item.ticketNo}
            edit
            view //just see but not allow to edit or calculate claims
          />
          <img alt="delete ticket" onClick={() => this.DeleteTicket(index)} />
        </TicketRow>
      );
    });

    const ClaimsListItems = claims.map((item, index) => {
      return (
        <p id="item" key={index}>
          {item}
        </p>
      );
    });
    if (step === 1)
      return (
        <Wrapper>
          <TicketWrapper>
            <AddTicket saveTicket={(ticket) => this.AddTicket(ticket)} />
            {Tickets}
          </TicketWrapper>
          <Seperator />
          <TicketWrapper>
            <AddClaims
              data={allClaimsList}
              saveClaims={(claims) => this.AddClaims(claims)}
            />
            <ClaimsList className="view">{ClaimsListItems}</ClaimsList>
          </TicketWrapper>
          <Button className="footer" onClick={this.startGame}>
            Start Game
          </Button>
          {showNextDialog(
            "Oops, something missing !!",
            "Atleast 1 Ticket and 1 Claim should be given to start the game"
          )}
        </Wrapper>
      );
    else if (step === 2)
      return showNextDialog(
        "Remember !!",
        "Once the game starts, you will not be able to add any ticket or claims. Do you want to proceed ?",
        "Proceed",
        () => {
          this.setState({ step: 3 });
        },
        () => {
          this.setState({ step: 1, isNextDialogOpen: false });
        }
      );
    else return <Controller tickets={tickets} claims={claims} />;
  }
}

export default GameGenerator;

const TicketFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketRow = styled.div`
  display: flex;
  img {
    content: url(${DeleteIcon});
    width: 12px;
    height: 12px;
    margin: auto 0 auto 2rem;
    padding: 0.8rem;
    border: solid 1px #ff97b6;
    cursor: pointer;
    background-color: #fff3f3;
  }
`;

const ClaimsFormWrapper = styled.div`
  #error {
    color: red;
    font-family: OpenSansSemiBold;
    font-size: 1.4rem;
    padding: 0;
    margin: 0 0 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 2.4rem;
  justify-content: space-between;
  &::after {
    content: "";
    background: url(${Background});
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

const TicketWrapper = styled.div`
  display: grid;
  width: 45%;
  height: 100%;
  justify-content: start;
  grid-template-rows: auto;
  grid-template-columns: 100%;
`;

const Button = styled.button`
  display: flex;
  margin: 0 auto;
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

  &.footer {
    position: fixed;
    bottom: 4rem;
    right: 4rem;
  }

  &:hover,
  &:active {
    cursor: pointer;
    background-color: #222832;
    color: white;
  }
`;

const Seperator = styled.div`
  width: 0.2rem;
  height: 90vh;
  background-color: #222832;
`;

const ClaimsList = styled.div`
  display: grid;
  align-self: center;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  grid-gap: 2rem;
  label {
    font-family: OpenSansSemiBold;
    text-align: left;
    font-size: 1.4rem;
  }

  &.view {
    margin-top: 1rem;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
  }

  #item {
    font-family: OpenSansSemiBold;
    text-align: left;
    font-size: 1.4rem;
    color: #222832;
  }
`;
