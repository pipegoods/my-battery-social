import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

const SOCIALS_LEVELS = [
  {
    emoji: '😞',
    color: '#c10e00',
  },
  {
    emoji: '😣',
    color: '#ff3934',
  },
  {
    emoji: '😔',
    color: '#f1595c',
  },
  {
    emoji: '😐',
    color: '#f6cf07',
  },
  {
    emoji: '😊',
    color: '#cdd46c',
  },
  {
    emoji: '😄',
    color: '#7bbb7f',
  },
  {
    emoji: '🤩',
    color: '#6fa31d',
  },
];

function App() {
  const [socialBattery, setSocialBattery] = useState(3);
  const [isWebShareSupported, setIsWebShareSupported] =
    useState(false);

  useEffect(() => {
    // Verificar si la API de Web Share es compatible con el navegador
    if (navigator.share) {
      setIsWebShareSupported(true);
    } else {
      setIsWebShareSupported(false);
    }
  }, []);

  useEffect(() => {
    document.title = `${SOCIALS_LEVELS[socialBattery].emoji} | My Social Battery | Andrés Vizcaíno`;
    document.body.style.setProperty(
      '--social-battery-color',
      SOCIALS_LEVELS[socialBattery].color
    );
  }, [socialBattery]);

  const handleShareClick = async () => {
    const imagePath = `/${socialBattery}.webp`;

    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const moodImageFile = new File([blob], 'moodImage.webp', {
        type: 'image/webp',
      });

      const shareData = {
        title: '¡Hoy me siento en Baterial Social!',
        text: `¿Cómo te sientes hoy?`,
        url: 'https://battery.andresvizcaino.com/',
        files: [moodImageFile],
      };

      await navigator.share(shareData);
      console.log('Contenido compartido con éxito');
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  return (
    <section>
      <article className="social-battery-container">
        <h1>MY SOCIAL BATTERY</h1>

        <div className="social-battery">
          <input
            type="range"
            min="0"
            max="6"
            value={socialBattery}
            onChange={(e) => setSocialBattery(e.target.value)}
          />

          <div className="social-battery-level">
            {SOCIALS_LEVELS.map((level, index) => (
              <span key={index} style={{ '--bg': level.color }}>
                {level.emoji}
              </span>
            ))}
          </div>
        </div>
      </article>

      {isWebShareSupported && (
        <div className="social-battery-share">
          <button
            onClick={handleShareClick}
            className="social-battery-share-button"
          >
            Compartir
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
