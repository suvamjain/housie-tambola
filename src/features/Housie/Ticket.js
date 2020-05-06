import React, { Component } from "react";
import styled from "styled-components";

import ClaimedIcon from "../../assets/claimed.svg";

let cut = 0,
  msg = "";

class Ticket extends Component {
  state = {
    isFreezed: false,
  };

  constructor(props) {
    super(props);
    const { data, edit } = props;

    if (!edit) {
      let anda = [],
        danda = [],
        line1 = [],
        line2 = [],
        line3 = [],
        breakfast = [],
        lunch = [],
        dinner = [],
        younger = [],
        older = [],
        frame = [],
        cornerWithStar = [],
        smaller = 100,
        greater = 0;

      //calculate claim values for this ticket
      data.map((item, index) => {
        //if cell is not blank
        if (item !== "") {
          //anda danda calculation
          if ((item + "").includes("0")) anda.push(item);
          if ((item + "").includes("1")) danda.push(item);

          //lines 1,2,3 calculation
          if (index >= 0 && index < 9) line1.push(item);
          else if (index >= 9 && index < 18) line2.push(item);
          else line3.push(item);

          //breakfast lunch dinner calculation
          if ([0, 1, 2, 9, 10, 11, 18, 19, 20].includes(index))
            breakfast.push(item);
          else if ([3, 4, 5, 12, 13, 14, 21, 22, 23].includes(index))
            lunch.push(item);
          else dinner.push(item);

          //younger, older calculation,  originally <= 45
          if (item > 0 && item <= 49) younger.push(item);
          else older.push(item);

          //frame calculation, middle line extreme numbers
          if (index === 9 || index === 17) frame.push(item);

          //smaller greater calculation
          if (item < smaller) smaller = item;
          if (item > greater) greater = item;
        }
      });

      //cws calculation
      cornerWithStar.push(line1[0]);
      cornerWithStar.push(line1[line1.length - 1]);
      cornerWithStar.push(line3[0]);
      cornerWithStar.push(line3[line3.length - 1]);
      cornerWithStar.push(line2[2]); //i.e. 3rd no. of middle line for making star

      //frame calculation
      frame.push(...line1);
      frame.push(...line3);

      this.state = {
        anda,
        danda,
        line1,
        line2,
        line3,
        breakfast,
        lunch,
        dinner,
        younger,
        older,
        smaller,
        greater,
        frame,
        cornerWithStar,
      };
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isFreezed: nextProps.isFreezed,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //check if prev and current both state are false means ticket is freezed and icon is shown, so stop any render updates
    return !(this.state.isFreezed && nextState.isFreezed);
  }

  checkClaims = () => {
    let result = "";
    const { table, claims } = this.props;

    Object.keys(claims).map((item) => {
      //if any claim is still false (i.e not yet claimed)
      if (!claims[item]) {
        if (this.cut >= 7 && item === "early7") result += item + "  ";

        if (this.cut >= 6 && item === "early6") result += item + "  ";

        if (this.cut >= 5 && item === "early5") result += item + "  ";

        if (this.cut >= 4 && item === "early4") result += item + "  ";

        //check for smallerGreater
        if (
          item === "smallerGreater" &&
          table[this.state.smaller] &&
          table[this.state.greater]
        ) {
          result += item + "  ";
        }

        //check for corner
        if (
          item === "corner" &&
          this.checkArray(this.state["cornerWithStar"].slice(0, 4))
        ) {
          result += item + "  ";
        }

        //check for a house
        if (
          this.cut === 15 &&
          item.includes("house") &&
          !result.includes("house")
        ) {
          result += item + "  ";
        }

        //check for remaining all other claims like anda, danda, cws ...
        if (Array.isArray(this.state[item])) {
          if (this.checkArray(this.state[item])) result += item + "  ";
        }
      }
    });

    this.msg = result;
    // console.log(this.msg);
  };

  //method to check if a claim array is fulfilled
  checkArray = (arr) => {
    const { table } = this.props;
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (!table[arr[i]]) return false;
      }
      return true;
    }
    return false;
  };

  render() {
    const { edit, data, ticketNo, table } = this.props;
    this.cut = 0;

    let TicketCells = [];

    // only show when game starts
    if (!edit) {
      TicketCells = data.map((item, index) => {
        if (item === "") return <Cell key={index} readOnly />;
        else {
          if (table[item]) this.cut++;
          return (
            <Cell key={index} active={table[item]} value={item} readOnly />
          );
        }
      });
      if (!this.props.isFreezed) this.checkClaims();
    }
    // show on edit or preview page
    else {
      TicketCells = data.map((item, index) => {
        return (
          <Cell
            id={"" + index}
            onChange={this.props.handleTextChange}
            type="text"
            maxLength="2"
            key={index}
            value={item}
            readOnly={this.props.view}
          />
        );
      });
    }

    return (
      <Wrapper>
        {edit ? (
          <>
            {/* show when ticket is in edit or preview */}

            <p id="ticketNo">
              {"T.No. - "}
              <input
                id="ticketNo"
                onChange={this.props.handleTextChange}
                type="text"
                value={ticketNo}
                readOnly={this.props.view}
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  color: "#49788d",
                  width: "4.5rem",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  margin: "0",
                }}
              />
            </p>
            <TicketWrapper>{TicketCells}</TicketWrapper>

            <p id="claims">{this.props.error}</p>
          </>
        ) : (
          <>
            {/* show when ticket is in game mode */}
            <TopSection>
              <p id="ticketNo">{"T.No. - " + ticketNo}</p>
              <p
                id="cancel"
                onClick={
                  this.props.freezeTicket
                  // () =>
                  // this.setState({ isFreezed: !this.state.isFreezed })
                }
              >
                {this.props.isFreezed ? "Unfreeze ticket" : "Freeze ticket"}
              </p>
            </TopSection>
            <TicketWrapper>
              {this.props.isFreezed ? <ClaimedImage /> : null}
              {TicketCells}
            </TicketWrapper>
            <p id="claims">{"Claims - " + this.msg}</p>
          </>
        )}
      </Wrapper>
    );
  }
}

export default Ticket;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  #claims {
    width: 450px;
    align-self: flex-start;
    font-size: 1.4rem;
    text-align: left;
    font-family: OpenSansSemiBold;
    white-space: pre-line;
    color: red;
  }
  #ticketNo,
  #cancel {
    align-self: flex-start;
    font-size: 1.4rem;
    font-family: OpenSansSemiBold;
    text-align: left;
    white-space: nowrap;
    color: #49788d;
    border: solid 1px #49788d;
    margin: 1rem 0;
    background-color: #e5f1f7;
  }

  #cancel {
    cursor: pointer;
    align-self: flex-end;
    color: #ff97b6;
    background-color: #fff3f3;
    border: none;

    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;

const TopSection = styled.div`
  display: flex;
  align-self: flex-start;
  width: 450px;
  align-items: center;
  justify-content: space-between;
`;

const ClaimedImage = styled.img`
  content: url(${ClaimedIcon});
  height: 90%;
  position: absolute;
  top: 50%;
  left: 35%;
  opacity: 0.75;
  transform: translate(-35%, -50%);
`;

const TicketWrapper = styled.div`
  display: grid;
  position: relative;
  align-items: flex-start;
  grid-template-rows: repeat(3, 50px);
  grid-template-columns: repeat(9, 50px);
`;

const Cell = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  font-family: OpenSansSemiBold;
  border: 2px solid #000000;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  outline: none;
  background-color: ${(props) => (props.active ? "cyan" : "white")};
`;
