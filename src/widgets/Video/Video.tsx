import styles from "./Video.module.css";

export const Video = () => {
  return (
    <section className={styles.section}>
      <video
        className={styles.video}
        src="/video/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </section>
  );
};
