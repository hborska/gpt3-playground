import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [animalName, setAnimalName] = useState("");
  const [openAIResult, setOpenAIResult] = useState(null);

  const callOpenAiAPI = async (e) => {
    e.preventDefault();

    try {
      const req = await axios.get(`/api/openai?animal=${animalName}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {},
      });
      const data = req.data;
      setOpenAIResult({ res: data.result, name: animalName });
    } catch (error) {
      console.log(error);
    }
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
