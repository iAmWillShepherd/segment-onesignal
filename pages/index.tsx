import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import OneSignal from "react-onesignal";
import { useEffect } from "react";
import { OneSignalAppId } from "../common/constants";
import TrackAnalyticForm from "../components/TrackAnalyticForm";

const Home: NextPage = () => {
  useEffect(() => {
    initOneSignal();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>OneSignal + Segment</title>
        <meta
          name="description"
          content="Segment integration with OneSignal."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          <a href="https://onesignal.com">OneSignal</a> +{" "}
          <a href="https://segment.com">Segment</a>
        </h1>
      </header>

      <main className={styles.main}>
        <div>
          <input
            type="button"
            onClick={onSendSegmentIdentifyAnalytic}
            value="Send Identify Analytic"
          />
          <input
            type="button"
            onClick={onGetOneSignalDeviceId}
            value="Get Device ID"
          />
          <input
            type="button"
            onClick={onGetOneSignalExternalId}
            value="Get External ID"
          />
          <input
            type="button"
            onClick={onSetOneSignalExternalId}
            value="Set External ID"
          />
        </div>
        <div>
          <TrackAnalyticForm />
        </div>
      </main>
    </div>
  );
};

const onSendSegmentIdentifyAnalytic = async () => {
  const response = await fetch("/api/segment-identify", {
    method: "POST",
  });
  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
};

const initOneSignal = async () => {
  await OneSignal.init({
    appId: OneSignalAppId,
    allowLocalhostAsSecureOrigin: true,
    notifyButton: {
      enable: true,
    },
  });
  console.log("OneSignal initialized.");
};

const onGetOneSignalDeviceId = async () => {
  const deviceId = await OneSignal.getUserId();
  console.log(`OneSignal Device ID: ${deviceId}.`);
};

const onGetOneSignalExternalId = async () => {
  const externalId = await OneSignal.getExternalUserId();
  console.log(`OneSignal External ID: ${externalId}.`);
};

const onSetOneSignalExternalId = async () => {
  const id = "a1b2c3";
  await OneSignal.setExternalUserId(id);
  console.log("OneSignal External ID set.");
};

export default Home;
