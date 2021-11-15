import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get("/eat/:item", (req, res) => {
  const thing = req.params.item;
  res.json({
    message: `Yum yum - you ate a ${thing}!`,
  });
});

app.get<{ exampleRouteParameter: string }>(
  "/echo/:exampleRouteParameter",
  (req, res) => {
    const echoContent = req.params.exampleRouteParameter;
    res.json({
      echo: echoContent,
      message: `I am echoing back to you: ${echoContent}`,
    });
  }
);

app.get<{ word: string }>("/shout/:word", (req, res) => {
  const uppercasedWord = req.params.word.toUpperCase();
  res.json({
    message: {
      shout: uppercasedWord,
      result: `I am shouting back to you: ${uppercasedWord}!`,
    },
  });
});

app.get<{ numOne: number; numTwo: number; numThree?: number }>(
  "/add/:numOne/:numTwo/:numThree?",
  (req, res) => {
    const { numOne, numTwo, numThree } = req.params;
    const addition = numThree
      ? +numOne + +numTwo + +numThree
      : +numOne + +numTwo;
    res.json({
      original: `${numOne} + ${numTwo} + ${numThree}`,
      result: addition,
    });
  }
);

app.get<{ numOne: number; numTwo: number }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = numOne * numTwo;
    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
