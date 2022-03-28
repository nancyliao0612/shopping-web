import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PageHero = (props) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {props.id ? (
            <span>
              <Link to="/products"> / Products</Link> / {props.title}
            </span>
          ) : (
            <span>/ {props.title}</span>
          )}
        </h3>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  h3 {
    font-size: 1.5rem;
  }

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`;

export default PageHero;
