import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.bgWord}>Sleep</div>

      <div className={styles.wrap}>
        <header className={styles.header}>
          <a href="/" className={styles.logoMark}>
            <span className={styles.logoDot} />
            <span className={styles.logoText}>SleepSense</span>
          </a>
          <span className={styles.statusPill}>Open Beta</span>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <p className={styles.preLabel}>Sleep apnea screening</p>
            <h1 className={styles.h1}>
              Breathe easier.<br /><em>Know sooner.</em>
            </h1>
          </div>
          <div className={styles.heroRight}>
            <p className={styles.bodyCopy}>
              A new kind of OSA screening — built on the physiological signals your wearable
              already captures. No referral. No sleep lab. Just wear your device for 14 nights
              and get a clear picture of your risk.
            </p>
            <Link href="/demo" className={styles.cta}>
              Try the demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>

        <div className={styles.divider} />

        <div className={styles.statsStrip}>
          <div className={styles.stat}>
            <div className={styles.statNum}>936M</div>
            <div className={styles.statLabel}>People affected worldwide</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>80%</div>
            <div className={styles.statLabel}>Go undiagnosed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>14 nights</div>
            <div className={styles.statLabel}>To a confident result</div>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>© 2026 SleepSense · University of Maryland</span>
          <span>DREAMT Dataset · Research Preview</span>
        </footer>
      </div>
    </div>
  );
}
