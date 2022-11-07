import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useState, useEffect } from "react";

export default function Home() {
  const [animalName, setAnimalName] = useState("");
  const [openAIResult, setOpenAIResult] = useState(null);

  const callOpenAiAPI = async (e) => {
    e.preventDefault();

    fetch(`/api/openai?animal=${animalName}`)
      .then((r) => r.json())
      .then((data) => {
        setOpenAIResult({ name: animalName, res: data.result });
        setAnimalName("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>GPT3 Playground</h1>

        <br />
        <p className={styles.description}>
          <b>Suggest three names for an animal that is a superhero.</b> <br />
          For example: <br />
          Animal: Cat {`=>`} Names: Captain Sharpclaw, Agent Fluffball, The
          Incredible Feline <br />
          Animal: Dog {`=>`} Names: Ruff the Protector, Wonder Canine, Sir
          Barks-a-Lot
        </p>
        <form onSubmit={callOpenAiAPI}>
          <label className={styles.description}>
            Enter animal name:
            <input
              type="text"
              name="Name"
              value={animalName}
              className={styles.description}
              onChange={(e) => setAnimalName(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Generate Name"
            className={styles.description}
          />
        </form>
        {openAIResult && (
          <p className={styles.description}>
            Superhero Name for {openAIResult.name}: {openAIResult.res}
          </p>
        )}
      </main>
    </div>
  );
}
