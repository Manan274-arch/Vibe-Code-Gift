import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { finalLetter, letters, memories, reasons, treasureHunt } from "./data/loveUniverseData.js";

const screens = {
  landing: "landing",
  password: "password",
  menu: "menu",
  memories: "memories",
  reasons: "reasons",
  letters: "letters",
  treasure: "treasure",
  final: "final",
};

const menuItems = [
  { title: "Memory Constellation", subtitle: "A sky of tiny forever moments", screen: screens.memories },
  { title: "Reasons Galaxy", subtitle: "Little reasons orbiting one big truth", screen: screens.reasons },
  { title: "Open When Letters", subtitle: "Soft places for every kind of day", screen: screens.letters },
  { title: "Treasure Hunt", subtitle: "A playful path to the last secret", screen: screens.treasure },
];

const reasonIcons = ["💌", "🦋", "🌙", "✨", "🌷", "💖", "🌸", "🪄", "☁️", "⭐"];
const letterIcons = ["💌", "🌧️", "🕊️", "🌙", "😊", "💖"];

function App() {
  const [screen, setScreen] = useState(screens.landing);
  const [passwordAccepted, setPasswordAccepted] = useState(false);
  const [activeMemory, setActiveMemory] = useState(null);
  const [openReason, setOpenReason] = useState(null);
  const [openLetter, setOpenLetter] = useState(null);
  const [huntStep, setHuntStep] = useState(0);
  const [huntMessage, setHuntMessage] = useState("");
  const [huntAnswered, setHuntAnswered] = useState(false);
  const [huntCorrect, setHuntCorrect] = useState(false);
  const [finalUnlocked, setFinalUnlocked] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        delay: (index % 11) * 0.35,
        size: 1 + (index % 4),
      })),
    []
  );

  const acceptPassword = (event) => {
    event.preventDefault();
    setPasswordAccepted(true);
    window.setTimeout(() => setScreen(screens.menu), 7000);
  };

  const chooseTreasure = (option) => {
    const current = treasureHunt[huntStep];
    if (option !== current.answer) {
      setHuntMessage(current.retry);
      setHuntAnswered(true);
      setHuntCorrect(false);
      return;
    }

    setHuntMessage("Correct. The universe is opening a little more.");
    setHuntAnswered(true);
    setHuntCorrect(true);
  };

  const goToNextTreasure = () => {
    if (huntStep === treasureHunt.length - 1) {
      setFinalUnlocked(true);
      setScreen(screens.final);
      return;
    }

    setHuntStep((step) => step + 1);
    setHuntMessage("");
    setHuntAnswered(false);
    setHuntCorrect(false);
  };

  return (
    <main className="app-shell">
      <CosmicBackdrop particles={particles} />

      <AnimatePresence mode="wait">
        {screen === screens.landing && (
          <Page key="landing" className="landing-page">
            <motion.p className="eyebrow landing-brand" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              A Universe I Built For You
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              Some people get flowers. You get a whole universe.
            </motion.h1>
            <motion.button
              className="primary-button"
              onClick={() => setScreen(screens.password)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Enter
            </motion.button>
          </Page>
        )}

        {screen === screens.password && (
          <Page key="password" className="center-page">
            <TopBar onBack={() => setScreen(screens.landing)} label="Back to entrance" />
            <GlassPanel>
              <h2>guees for me love</h2>
              <form className="password-form" onSubmit={acceptPassword}>
                <input aria-label="Magic password" placeholder="Guess the password my love" autoFocus />
                <motion.button className="primary-button small" whileTap={{ scale: 0.96 }}>
                  Submit
                </motion.button>
              </form>
              <AnimatePresence>
                {passwordAccepted && (
                  <motion.p
                    className="success-message"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Correct. Because my baby is always correct.
                  </motion.p>
                )}
              </AnimatePresence>
            </GlassPanel>
          </Page>
        )}

        {screen === screens.menu && (
          <Page key="menu" className="menu-page">
            <TopBar onBack={() => setScreen(screens.landing)} label="Back to entrance" />
            <SectionHeader title="Choose a constellation" text="Every door leads to a little piece of my heart." />
            <div className="menu-grid">
              {menuItems.map((item, index) => (
                <motion.button
                  className="celestial-card"
                  key={item.title}
                  onClick={() => setScreen(item.screen)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="card-orbit" />
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </motion.button>
              ))}
            </div>
            {finalUnlocked && <button className="text-button" onClick={() => setScreen(screens.final)}>Return to the final letter</button>}
          </Page>
        )}

        {screen === screens.memories && (
          <Page key="memories" className="feature-page">
            <TopBar onBack={() => setScreen(screens.menu)} />
            <SectionHeader title="Memory Constellation" text="Tap the stars. I saved little pieces of us in them." />
            <div className="constellation">
              <div className="constellation-ring ring-one" />
              <div className="constellation-ring ring-two" />
              <div className="constellation-ring ring-three" />
              <motion.div
                className="memory-core"
                animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>💖</span>
                <strong>Our little sky</strong>
                <small>six memories, one universe</small>
              </motion.div>
              {memories.map((memory, index) => (
                <motion.button
                  className="memory-star"
                  key={memory.title}
                  style={{ left: `${memory.x}%`, top: `${memory.y}%` }}
                  onClick={() => setActiveMemory(memory)}
                  animate={{ scale: [1, 1.22, 1], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.25 }}
                  aria-label={`Open memory ${memory.title}`}
                >
                  <span>{index + 1}</span>
                </motion.button>
              ))}
              <div className="memory-chip-row">
                {memories.map((memory, index) => (
                  <button key={`${memory.title}-chip`} className="memory-chip" onClick={() => setActiveMemory(memory)}>
                    <span>{index + 1}</span>
                    {memory.title}
                  </button>
                ))}
              </div>
            </div>
          </Page>
        )}

        {screen === screens.reasons && (
          <Page key="reasons" className="feature-page">
            <TopBar onBack={() => setScreen(screens.menu)} />
            <SectionHeader title="Reasons Galaxy" text="I could keep going forever. This is just the beginning." />
            <div className="reasons-space">
              {reasons.map((reason, index) => (
                <motion.button
                  className="reason-orb"
                  key={reason}
                  onClick={() => setOpenReason(index)}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, index % 2 ? -8 : 8, 0],
                  }}
                  transition={{ delay: index * 0.07, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
                >
                  <span className="reason-number">Reason {index + 1}</span>
                  <span className="reason-icon">{reasonIcons[index]}</span>
                  <span>{openReason === index ? reason : "Tap to reveal"}</span>
                </motion.button>
              ))}
            </div>
          </Page>
        )}

        {screen === screens.letters && (
          <Page key="letters" className="feature-page">
            <TopBar onBack={() => setScreen(screens.menu)} />
            <SectionHeader title="Open When Letters" text="For the days when you need me tucked into words." />
            <div className="letter-grid">
              {letters.map((letter, index) => (
                <motion.button
                  className="envelope"
                  key={letter.title}
                  onClick={() => setOpenLetter(letter)}
                  initial={{ opacity: 0, rotateX: -20, y: 26 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <span />
                  <em>{letterIcons[index]}</em>
                  <strong>{letter.title}</strong>
                </motion.button>
              ))}
            </div>
          </Page>
        )}

        {screen === screens.treasure && (
          <Page key="treasure" className="center-page">
            <TopBar onBack={() => setScreen(screens.menu)} />
            <GlassPanel>
              <p className="step-count">Clue {huntStep + 1} of {treasureHunt.length}</p>
              <h2>{treasureHunt[huntStep].clue}</h2>
              <div className="option-stack">
                {treasureHunt[huntStep].options.map((option) => (
                  <motion.button
                    key={option}
                    className="option-button"
                    onClick={() => chooseTreasure(option)}
                    whileTap={{ scale: 0.97 }}
                    disabled={huntCorrect}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {huntMessage && (
                  <motion.p className="hint-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {huntMessage}
                  </motion.p>
                )}
              </AnimatePresence>
              {huntAnswered && huntCorrect && (
                <motion.button className="primary-button next-button" onClick={goToNextTreasure} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  {huntStep === treasureHunt.length - 1 ? "Open the final letter" : "Next clue"}
                </motion.button>
              )}
            </GlassPanel>
          </Page>
        )}

        {screen === screens.final && (
          <Page key="final" className="final-page">
            <TopBar onBack={() => setScreen(screens.menu)} />
            <motion.article className="final-letter" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                {finalLetter.title}
              </motion.h2>
              {finalLetter.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.55, duration: 0.8 }}
                >
                  {paragraph}
                </motion.p>
              ))}
              <motion.strong initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}>
                {finalLetter.signature}
              </motion.strong>
            </motion.article>
          </Page>
        )}
      </AnimatePresence>

      <Modal item={activeMemory} onClose={() => setActiveMemory(null)} type="memory" />
      <Modal item={openLetter} onClose={() => setOpenLetter(null)} type="letter" />
    </main>
  );
}

function CosmicBackdrop({ particles }) {
  return (
    <div className="cosmic-backdrop" aria-hidden="true">
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="star-field">
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      <span className="shooting-star shooting-one" />
      <span className="shooting-star shooting-two" />
      <span className="shooting-star shooting-three" />
    </div>
  );
}

function Page({ children, className = "" }) {
  return (
    <motion.section
      className={`page ${className}`}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.section>
  );
}

function GlassPanel({ children }) {
  return <motion.div className="glass-panel" initial={{ y: 24 }} animate={{ y: 0 }}>{children}</motion.div>;
}

function SectionHeader({ title, text }) {
  return (
    <header className="section-header">
      <p className="eyebrow">A Universe I Made For You</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  );
}

function TopBar({ onBack, label = "Back to universe" }) {
  return (
    <nav className="top-bar">
      <button className="text-button" onClick={onBack}>{label}</button>
    </nav>
  );
}

function Modal({ item, onClose, type }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal-card" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}>
            <button className="close-button" onClick={onClose} aria-label="Close">x</button>
            <p className="eyebrow">{type === "memory" ? item.date : "A letter for you"}</p>
            <h3>{item.title}</h3>
            <p>{item.text || item.body}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
