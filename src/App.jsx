import { useState, useEffect } from 'react';
import { createClient } from 'urql';
// import { GraphQLAbstractType } from 'graphql';
import './App.css';

function App() {
  const [tokens, setTokens] = useState([]);
  console.log('token', tokens);
  const QueryURL =
    'https://gateway.thegraph.com/api/2758d6ae43bae4172af9b8a113396932/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7';
  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }}`;

  const client = createClient({
    url: QueryURL,
  });
  console.log('client', client);

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      if (data) {
        console.log(data);
        setTokens(data.tokens);
      }
    };
    getTokens();
  }, []);
  return (
    <>
      <div>
        Tokens Information
        {tokens !== null &&
          tokens.length > 0 &&
          tokens.map((token, i) => {
            return (
              <div key={i}>
                <div>{token.id}</div>
                <div>{token.name}</div>
                <div>{token.symbol}</div>
                <div>{token.__typename}</div>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default App;
