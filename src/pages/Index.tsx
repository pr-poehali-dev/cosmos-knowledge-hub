import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NEBULA_IMG = "https://cdn.poehali.dev/projects/f039dd6d-687e-48a3-835a-1a3ddd936a3b/files/0537366b-1c51-4c46-a17d-62d29b3f3538.jpg";
const GALAXY_IMG = "https://cdn.poehali.dev/projects/f039dd6d-687e-48a3-835a-1a3ddd936a3b/files/70930704-ed01-4861-8b3b-cb7298b0c5ab.jpg";

const SECTIONS = ["home", "galaxies", "planets", "mythology", "mysteries"];
const NAV_LABELS: Record<string, string> = {
  home: "Главная",
  galaxies: "Галактики",
  planets: "Планеты",
  mythology: "Мифология",
  mysteries: "Загадки",
};

const PLANETS = [
  {
    name: "Меркурий", diameter: "4 879 км", distance: "57.9 млн км",
    color: "from-gray-400 to-gray-600", fact: "Самая быстрая планета — год длится всего 88 земных дней",
    desc: "Ближайшая к Солнцу планета без атмосферы, покрытая кратерами. Температура колеблется от −173°C ночью до +427°C днём.",
    moons: 0, emoji: "🪨"
  },
  {
    name: "Венера", diameter: "12 104 км", distance: "108.2 млн км",
    color: "from-yellow-300 to-orange-400", fact: "Самая горячая планета — 465°C из-за парникового эффекта",
    desc: "Планета-близнец Земли по размеру, но с адской атмосферой из CO₂. Сутки здесь длиннее года.",
    moons: 0, emoji: "🌕"
  },
  {
    name: "Земля", diameter: "12 742 км", distance: "149.6 млн км",
    color: "from-blue-400 to-green-500", fact: "Единственная известная планета с жизнью во Вселенной",
    desc: "Наш голубой дом — 71% поверхности покрыто водой. Магнитное поле защищает от солнечного ветра.",
    moons: 1, emoji: "🌍"
  },
  {
    name: "Марс", diameter: "6 779 км", distance: "227.9 млн км",
    color: "from-red-400 to-orange-600", fact: "Гора Олимп — самый высокий вулкан в Солнечной системе (27 км)",
    desc: "Красная планета с двумя лунами и тонкой атмосферой. Возможно, здесь когда-то была жидкая вода.",
    moons: 2, emoji: "🔴"
  },
  {
    name: "Юпитер", diameter: "139 820 км", distance: "778.5 млн км",
    color: "from-orange-300 to-amber-600", fact: "Большое красное пятно — шторм, бушующий более 350 лет",
    desc: "Газовый гигант — самая большая планета. Его масса в 2.5 раза превышает массу всех остальных планет вместе взятых.",
    moons: 95, emoji: "🟠"
  },
  {
    name: "Сатурн", diameter: "116 460 км", distance: "1.43 млрд км",
    color: "from-yellow-200 to-amber-400", fact: "Кольца состоят из льда и камней — толщина всего 10-100 м",
    desc: "Властелин колец Солнечной системы. Плотность Сатурна настолько мала, что он мог бы плавать в воде.",
    moons: 146, emoji: "🪐"
  },
  {
    name: "Уран", diameter: "50 724 км", distance: "2.87 млрд км",
    color: "from-cyan-300 to-teal-400", fact: "Вращается «лёжа на боку» — ось наклонена на 98°",
    desc: "Ледяной гигант с уникальным наклоном оси. Один полюс получает солнечный свет 42 года подряд.",
    moons: 27, emoji: "🔵"
  },
  {
    name: "Нептун", diameter: "49 244 км", distance: "4.5 млрд км",
    color: "from-blue-500 to-indigo-600", fact: "Ветры достигают 2 100 км/ч — самые сильные в Солнечной системе",
    desc: "Самая далёкая планета с неистовыми штормами. Большое тёмное пятно размером с Землю.",
    moons: 16, emoji: "🌀"
  },
];

const GALAXIES = [
  {
    name: "Млечный Путь", type: "Спиральная", stars: "200-400 млрд",
    size: "100 000 св. лет", color: "from-blue-400 to-purple-600",
    desc: "Наш космический дом — спиральная галактика с баром в центре. Солнечная система находится в рукаве Ориона, в 26 000 световых лет от центра.",
    fact: "Чёрная дыра Стрелец А* в центре в 4 миллиона раз тяжелее Солнца"
  },
  {
    name: "Андромеда (M31)", type: "Спиральная", stars: "1 триллион",
    size: "220 000 св. лет", color: "from-indigo-400 to-blue-600",
    desc: "Ближайшая к нам крупная галактика. Через 4.5 миллиарда лет она столкнётся с Млечным Путём.",
    fact: "Видна невооружённым глазом — это самый далёкий объект, различимый без телескопа"
  },
  {
    name: "Водоворот (M51)", type: "Спиральная", stars: "160 млрд",
    size: "76 000 св. лет", color: "from-teal-400 to-cyan-600",
    desc: "Первая галактика, в которой была обнаружена спиральная структура. Взаимодействует с галактикой-компаньоном NGC 5195.",
    fact: "Находится на расстоянии 23 миллиона световых лет от Земли"
  },
  {
    name: "Сомбреро (M104)", type: "Линзообразная", stars: "200 млрд",
    size: "50 000 св. лет", color: "from-amber-400 to-orange-600",
    desc: "Загадочная галактика с огромной центральной выпуклостью и тёмной полосой пыли. Напоминает мексиканское сомбреро.",
    fact: "Содержит одну из самых массивных чёрных дыр — в миллиард масс Солнца"
  },
  {
    name: "Антенны", type: "Взаимодействующие", stars: "300+ млрд",
    size: "500 000 св. лет", color: "from-rose-400 to-pink-600",
    desc: "Две сталкивающиеся галактики, образующие гигантские «антенны» из звёзд. Идеальная лаборатория для изучения слияний галактик.",
    fact: "В области столкновения рождаются тысячи новых звёзд одновременно"
  },
  {
    name: "Бол. Магелланово Облако", type: "Карликовая неправильная", stars: "30 млрд",
    size: "14 000 св. лет", color: "from-yellow-300 to-amber-500",
    desc: "Спутник Млечного Пути, видимый невооружённым глазом в Южном полушарии. Содержит Туманность Тарантул.",
    fact: "Туманность Тарантул — крупнейшая известная область звездообразования"
  },
];

const MYTHS = [
  {
    culture: "Древняя Греция", icon: "⚡",
    title: "Происхождение Млечного Пути",
    story: "Когда Гера обнаружила, что кормит чужого ребёнка — маленького Геракла, она оттолкнула его. Молоко брызнуло в небо и стало Млечным Путём. Именно отсюда его название — «galaxy» от греческого «gala» (молоко).",
    color: "from-blue-500/20 to-purple-500/20", border: "border-blue-500/30"
  },
  {
    culture: "Древний Египет", icon: "🌙",
    title: "Нут — богиня звёздного неба",
    story: "Богиня Нут изображалась как женщина, чьё тело выгнуто над землёй. Её тело украшено звёздами. Каждую ночь она заглатывает Солнце, проводит его через себя и рожает заново на рассвете. Без неё не было бы ни дня, ни ночи.",
    color: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/30"
  },
  {
    culture: "Скандинавия", icon: "🌉",
    title: "Биврёст — Радужный мост",
    story: "Боги построили мост Биврёст между Мидгардом (землёй) и Асгардом (небом богов). Разноцветный мост охраняет бог Хеймдалль. Во время Рагнарёка он рухнет под весом великанов огня.",
    color: "from-teal-500/20 to-cyan-500/20", border: "border-teal-500/30"
  },
  {
    culture: "Майя", icon: "🐍",
    title: "Пернатый Змей и звёзды",
    story: "Кетцалькоатль — пернатый змей создал людей из кукурузы и принёс им знания о движении звёзд. Майя создали точнейший астрономический календарь без телескопов, вычислив орбиту Венеры с погрешностью 2 часа за 500 лет.",
    color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30"
  },
  {
    culture: "Японская", icon: "🌟",
    title: "Легенда о Тануэ и Хикобоши",
    story: "Ткачиха Ори-химэ (Вега) и пастух Хикобоши (Альтаир) влюбились и забыли об обязанностях. Бог разлучил их Небесной рекой (Млечным Путём). Раз в год, в день Танабата, они встречаются на мосту из птиц.",
    color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/30"
  },
  {
    culture: "Инки", icon: "☀️",
    title: "Инти — Бог Солнца",
    story: "Инки считали себя детьми Солнца. Храм Кориканча в Куско был покрыт золотом, отражающим солнечные лучи. Жрецы точно вычисляли солнечные и лунные затмения, считая их небесными посланиями богов.",
    color: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/30"
  },
];

const MYSTERIES = [
  {
    title: "Сигнал «Wow!»",
    date: "15 августа 1977",
    icon: "📡",
    color: "from-green-500/20 to-teal-500/20",
    border: "border-green-500/30",
    accent: "#2dd4bf",
    short: "72-секундный сигнал с признаками внеземного происхождения",
    content: "Радиоастроном Джерри Эман получил 72-секундный радиосигнал из созвездия Стрельца и написал «Wow!» на распечатке. Сигнал идеально совпадал с теоретическим сигналом инопланетной цивилизации. За 45 лет наблюдений он так и не повторился. Происхождение неизвестно до сих пор."
  },
  {
    title: "Тёмная материя",
    date: "~27% Вселенной",
    icon: "🌑",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30",
    accent: "#a855f7",
    short: "Невидимая материя, которую мы не можем обнаружить напрямую",
    content: "27% Вселенной состоит из вещества, которое не испускает и не поглощает свет. Мы знаем о её существовании только по гравитационному воздействию на видимые объекты. Галактики вращаются не так, как должны — что-то невидимое удерживает их вместе. Природа тёмной материи — одна из главных загадок физики."
  },
  {
    title: "Ускорение расширения",
    date: "Открыто в 1998",
    icon: "🔭",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    accent: "#00c8ff",
    short: "Вселенная расширяется быстрее — загадочная тёмная энергия",
    content: "В 1998 году астрономы обнаружили, что Вселенная не просто расширяется — она расширяется с ускорением. Причина — «тёмная энергия», составляющая 68% всей Вселенной. Нобелевская премия 2011 года. Через триллионы лет все галактики разлетятся так далеко, что небо станет абсолютно тёмным."
  },
  {
    title: "Парадокс Ферми",
    date: "Вопрос без ответа",
    icon: "👽",
    color: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/30",
    accent: "#fbbf24",
    short: "Если инопланетяне существуют — почему мы их не слышим?",
    content: "В Млечном Пути — 400 миллиардов звёзд, многие с планетами. Некоторые цивилизации должны быть старше нас на миллиарды лет. Даже при скорости 1% от скорости света — вся галактика была бы заселена за 10 миллионов лет. Так где все? Великое молчание космоса — самый пугающий факт о Вселенной."
  },
  {
    title: "Быстрые радиовсплески",
    date: "FRB, открыты в 2007",
    icon: "⚡",
    color: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
    accent: "#f472b6",
    short: "Миллисекундные вспышки мощнее миллиарда Солнц",
    content: "Быстрые радиовсплески (FRB) — миллисекундные взрывы радиоволн, каждый из которых выделяет больше энергии, чем наше Солнце за тысячи лет. Один источник FRB 121102 повторяется — что противоречит теории взрыва. Мы не знаем, что их вызывает: нейтронные звёзды, магнетары, или нечто неизвестное."
  },
  {
    title: "Звезда Табби",
    date: "KIC 8462852",
    icon: "⭐",
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    accent: "#f59e0b",
    short: "Звезда с необъяснимыми затемнениями — до 22% яркости",
    content: "Звезда KIC 8462852 демонстрирует хаотичные затемнения — иногда теряя до 22% яркости. Ни одна известная астрофизическая теория не объясняет такое поведение полностью. В 2015 году учёные даже предложили гипотезу мегаструктуры инопланетной цивилизации. Загадка не решена."
  },
];

function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; r: number; alpha: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 350; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    let animId: number;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha = 0.3 + 0.7 * Math.abs(Math.sin(frame * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${s.alpha})`;
        ctx.fill();
      });
      frame++;
      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="stars-canvas" />;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [activePlanet, setActivePlanet] = useState(0);
  const [activeMyth, setActiveMyth] = useState<number | null>(null);
  const [activeMystery, setActiveMystery] = useState<number | null>(null);
  const [activeGalaxy, setActiveGalaxy] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal();

  function scrollTo(id: string) {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) setActiveSection(id);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cosmos-dark text-white relative">
      <StarsCanvas />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ background: "linear-gradient(to bottom, rgba(5,8,16,0.95), transparent)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cosmos-blue to-cosmos-purple animate-pulse absolute opacity-30" />
              <span className="relative text-cosmos-blue text-sm font-bold">✦</span>
            </div>
            <span className="font-oswald font-semibold tracking-widest text-sm text-cosmos-blue text-glow-blue">
              COSMOVERSUM
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`nav-link font-oswald text-xs tracking-widest uppercase transition-colors ${
                  activeSection === s ? "text-cosmos-blue active" : "text-white/60 hover:text-white"
                }`}
              >
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 mx-4 rounded-xl bg-black/90 backdrop-blur-md border border-cosmos-blue/20 p-4">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="block w-full text-left font-oswald text-sm tracking-widest uppercase text-white/70 hover:text-cosmos-blue py-3 border-b border-white/5 last:border-0 transition-colors"
              >
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-nebula"
          style={{ backgroundImage: `url(${NEBULA_IMG})`, opacity: 0.22 }}
        />
        <div className="nebula-bg w-96 h-96 top-1/4 left-1/4 bg-cosmos-purple/20" style={{ animation: "nebula-drift 20s ease-in-out infinite" }} />
        <div className="nebula-bg w-80 h-80 bottom-1/4 right-1/4 bg-cosmos-blue/15" style={{ animation: "nebula-drift 25s ease-in-out infinite 7s" }} />
        <div className="nebula-bg w-64 h-64 top-1/3 right-1/3 bg-cosmos-rose/10" style={{ animation: "nebula-drift 30s ease-in-out infinite 14s" }} />

        <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: "translate(-50%, -50%)" }}>
          {[500, 700, 900].map((size, i) => (
            <div
              key={size}
              className="absolute rounded-full border border-white/5"
              style={{
                width: size, height: size,
                top: -size / 2, left: -size / 2,
                animation: `spin-slow ${40 + i * 30}s linear infinite ${i % 2 === 1 ? "reverse" : ""}`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="font-oswald text-xs tracking-[0.4em] text-cosmos-blue/80 uppercase">
              ✦ Добро пожаловать во вселенную ✦
            </span>
          </div>

          <h1 className="font-cormorant font-light leading-none mb-6 animate-fade-in-up" style={{ fontSize: "clamp(4rem, 12vw, 9rem)", animationDelay: "0.4s" }}>
            <span className="gradient-text-blue">COSMOS</span>
            <br />
            <span className="italic text-white/90">versum</span>
          </h1>

          <p className="text-white/50 font-light text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            Путешествие сквозь галактики, легенды древних народов<br />
            и тайны, которые Вселенная ещё не раскрыла
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "1s" }}>
            {SECTIONS.slice(1).map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="cosmos-card glow-blue px-6 py-3 rounded-full font-oswald text-xs tracking-widest uppercase text-cosmos-blue hover:bg-cosmos-blue/10 transition-all duration-300"
              >
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-oswald text-[10px] tracking-widest text-white/30 uppercase">Исследовать</span>
          <Icon name="ChevronDown" size={20} className="text-cosmos-blue/50" />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="relative z-10 py-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: "Звёзд во Вселенной", value: "~10²⁴", icon: "⭐" },
            { label: "Известных галактик", value: "2 триллиона", icon: "🌌" },
            { label: "Возраст Вселенной", value: "13.8 млрд лет", icon: "⏳" },
            { label: "Скорость света", value: "299 792 км/с", icon: "⚡" },
          ].map((stat, i) => (
            <div key={i} className="reveal text-center cosmos-card rounded-xl p-5" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-cormorant text-2xl font-semibold gradient-text-blue">{stat.value}</div>
              <div className="font-oswald text-xs text-white/40 tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== GALAXIES ===== */}
      <section id="galaxies" className="relative z-10 py-24 overflow-hidden">
        <div className="nebula-bg w-[600px] h-[600px] top-0 right-0 bg-indigo-600/10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <span className="font-oswald text-xs tracking-[0.4em] text-cosmos-purple uppercase">Бесконечные острова звёзд</span>
            <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              <span className="gradient-text-blue">Галактики</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Каждая галактика — отдельная вселенная с миллиардами звёзд, планет и тайн</p>
          </div>

          {/* Interactive map */}
          <div className="reveal mb-12 cosmos-card rounded-2xl p-6 overflow-hidden">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${GALAXY_IMG})`, opacity: 0.3 }}
              />
              <div className="absolute top-3 left-4">
                <span className="font-oswald text-[10px] tracking-widest text-cosmos-blue/60 uppercase">Интерактивная карта галактик</span>
              </div>
              <div className="absolute top-3 right-4">
                <span className="font-oswald text-[10px] tracking-widest text-white/30">Нажми на точку</span>
              </div>
              {GALAXIES.map((g, i) => {
                const positions = [
                  { top: "50%", left: "50%" },
                  { top: "25%", left: "70%" },
                  { top: "65%", left: "28%" },
                  { top: "75%", left: "65%" },
                  { top: "30%", left: "22%" },
                  { top: "15%", left: "48%" },
                ];
                return (
                  <button
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ top: positions[i].top, left: positions[i].left }}
                    onClick={() => setActiveGalaxy(activeGalaxy === i ? null : i)}
                  >
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${g.color} transition-transform duration-300 ${activeGalaxy === i ? "scale-150" : "group-hover:scale-125"} relative z-10`} />
                    <div className={`absolute inset-0 rounded-full bg-white/20 transition-all duration-300 ${activeGalaxy === i ? "scale-300 opacity-0" : "opacity-0 group-hover:opacity-50 group-hover:scale-200"}`} />
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 font-oswald text-[9px] tracking-widest text-white/60 whitespace-nowrap">{g.name}</span>
                  </button>
                );
              })}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="50%" x2="70%" y2="25%" stroke="#00c8ff" strokeWidth="0.8" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="28%" y2="65%" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="65%" y2="75%" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="22%" y2="30%" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="48%" y2="15%" stroke="#f472b6" strokeWidth="0.8" strokeDasharray="5,5" />
              </svg>
            </div>

            {activeGalaxy !== null && (
              <div className={`mt-4 p-5 rounded-xl bg-gradient-to-br ${GALAXIES[activeGalaxy].color} border border-white/10`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-cormorant text-2xl">{GALAXIES[activeGalaxy].name}</h3>
                    <span className="font-oswald text-xs text-white/50 tracking-widest">{GALAXIES[activeGalaxy].type} · {GALAXIES[activeGalaxy].stars} звёзд · {GALAXIES[activeGalaxy].size}</span>
                    <p className="mt-3 text-white/70 text-sm leading-relaxed">{GALAXIES[activeGalaxy].desc}</p>
                    <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="font-oswald text-[10px] text-cosmos-gold tracking-widest">ФАКТ: </span>
                      <span className="text-white/60 text-xs">{GALAXIES[activeGalaxy].fact}</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveGalaxy(null)} className="text-white/40 hover:text-white shrink-0 transition-colors">
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALAXIES.map((g, i) => (
              <div
                key={i}
                className="reveal cosmos-card rounded-xl p-5 cursor-pointer"
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => setActiveGalaxy(i)}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${g.color} mb-4`} style={{ animation: `float ${6 + i * 0.5}s ease-in-out infinite ${i * 0.5}s` }} />
                <div className="font-cormorant text-xl mb-1">{g.name}</div>
                <div className="font-oswald text-[10px] text-white/40 tracking-widest mb-3">{g.type} · {g.stars}</div>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLANETS ===== */}
      <section id="planets" className="relative z-10 py-24 overflow-hidden">
        <div className="nebula-bg w-[700px] h-[700px] top-1/2 left-0 -translate-y-1/2 bg-blue-600/8" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <span className="font-oswald text-xs tracking-[0.4em] text-cosmos-teal uppercase">Наша Солнечная система</span>
            <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              <span className="gradient-text-teal">Планеты</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">8 миров, каждый с уникальным характером и тайнами</p>
          </div>

          <div className="reveal mb-8 flex gap-2 overflow-x-auto pb-2">
            {PLANETS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePlanet(i)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-oswald text-xs tracking-widest transition-all duration-300 ${
                  activePlanet === i
                    ? "bg-cosmos-blue/20 border border-cosmos-blue/50 text-cosmos-blue"
                    : "border border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                }`}
              >
                <span>{p.emoji}</span> {p.name}
              </button>
            ))}
          </div>

          <div className="reveal cosmos-card rounded-2xl p-6 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative shrink-0">
                <div
                  className={`planet-3d w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br ${PLANETS[activePlanet].color}`}
                  style={{ boxShadow: "0 0 40px rgba(0,200,255,0.2), 0 0 80px rgba(0,200,255,0.05)" }}
                />
                <div className="absolute -inset-6 rounded-full border border-white/5 animate-spin-slow" />
              </div>
              <div className="flex-1">
                <h3 className="font-cormorant text-4xl md:text-5xl mb-2">{PLANETS[activePlanet].emoji} {PLANETS[activePlanet].name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{PLANETS[activePlanet].desc}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Диаметр", value: PLANETS[activePlanet].diameter },
                    { label: "От Солнца", value: PLANETS[activePlanet].distance },
                    { label: "Спутников", value: String(PLANETS[activePlanet].moons) },
                  ].map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-oswald text-[10px] text-white/40 tracking-widest mb-1">{s.label}</div>
                      <div className="font-cormorant text-xl gradient-text-blue">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-cosmos-gold/5 border border-cosmos-gold/20">
                  <span className="font-oswald text-[10px] text-cosmos-gold tracking-widest">🌟 УДИВИТЕЛЬНЫЙ ФАКТ: </span>
                  <p className="text-white/70 text-sm mt-1">{PLANETS[activePlanet].fact}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {PLANETS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePlanet(i)}
                className={`reveal cosmos-card rounded-xl p-3 text-center transition-all duration-300 ${activePlanet === i ? "border-cosmos-blue/40" : ""}`}
                style={{ transitionDelay: `${i * 0.05}s`, boxShadow: activePlanet === i ? "0 0 20px rgba(0,200,255,0.15)" : "none" }}
              >
                <div
                  className={`planet-3d w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${p.color} mx-auto mb-2`}
                  style={{ animation: `float ${6 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` }}
                />
                <div className="font-oswald text-[9px] tracking-wider text-white/60 hidden md:block">{p.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MYTHOLOGY ===== */}
      <section id="mythology" className="relative z-10 py-24 overflow-hidden">
        <div className="nebula-bg w-[500px] h-[500px] top-0 left-1/2 bg-amber-600/8" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <span className="font-oswald text-xs tracking-[0.4em] text-cosmos-gold uppercase">Небо глазами древних</span>
            <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              <span className="gradient-text-gold">Мифология</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Как разные народы объясняли звёзды, планеты и явления неба — задолго до науки</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MYTHS.map((m, i) => (
              <div
                key={i}
                className={`reveal cosmos-card rounded-xl overflow-hidden cursor-pointer border ${m.border}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setActiveMyth(activeMyth === i ? null : i)}
              >
                <div className={`p-5 bg-gradient-to-br ${m.color}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-oswald text-[9px] tracking-widest text-white/40 uppercase">{m.culture}</span>
                      <h3 className="font-cormorant text-xl mt-1">{m.title}</h3>
                    </div>
                    <span className="text-3xl">{m.icon}</span>
                  </div>
                  <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: activeMyth === i ? "300px" : "60px" }}>
                    <p className="text-white/60 text-xs leading-relaxed">{m.story}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-white/30">
                    <Icon name={activeMyth === i ? "ChevronUp" : "ChevronDown"} size={14} />
                    <span className="font-oswald text-[9px] tracking-widest">{activeMyth === i ? "Свернуть" : "Читать миф"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fun facts */}
          <div className="reveal mt-10 cosmos-card rounded-2xl p-8 glow-gold">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🌌</div>
              <h3 className="font-cormorant text-3xl gradient-text-gold">То, о чём вы не задумывались</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: "👁️", title: "Мы смотрим в прошлое", text: "Когда вы смотрите на Полярную звезду — вы видите свет, который вышел оттуда 430 лет назад, когда на Руси правил Иван Грозный." },
                { icon: "⚛️", title: "Мы — звёздная пыль", text: "Атомы железа в вашей крови были созданы в умирающих звёздах миллиарды лет назад. Буквально — вы сделаны из звёзд." },
                { icon: "🌀", title: "Вы движетесь быстрее звука", text: "Земля вращается вокруг Солнца со скоростью 108 000 км/ч. Солнечная система мчится по Галактике со скоростью 792 000 км/ч." },
              ].map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-cormorant text-lg mb-2">{f.title}</div>
                  <p className="text-white/50 text-xs leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MYSTERIES ===== */}
      <section id="mysteries" className="relative z-10 py-24 overflow-hidden">
        <div className="nebula-bg w-[600px] h-[600px] bottom-0 right-0 bg-rose-600/8" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <span className="font-oswald text-xs tracking-[0.4em] text-cosmos-rose uppercase">Что наука не может объяснить</span>
            <h2 className="font-cormorant font-light mt-3" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              Космические <span className="gradient-text-blue italic">загадки</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Явления, перед которыми пасуют учёные всего мира</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MYSTERIES.map((m, i) => (
              <div
                key={i}
                className={`reveal cosmos-card rounded-xl overflow-hidden cursor-pointer border ${m.border} transition-all duration-300`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setActiveMystery(activeMystery === i ? null : i)}
              >
                <div className={`p-5 bg-gradient-to-br ${m.color}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-oswald text-[9px] tracking-widest text-white/40">{m.date}</span>
                      <h3 className="font-cormorant text-xl mt-1">{m.title}</h3>
                    </div>
                    <span className="text-3xl">{m.icon}</span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{m.short}</p>
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: activeMystery === i ? "250px" : "0px" }}
                  >
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-white/70 text-sm leading-relaxed">{m.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3" style={{ color: m.accent }}>
                    <Icon name={activeMystery === i ? "ChevronUp" : "ChevronDown"} size={14} />
                    <span className="font-oswald text-[9px] tracking-widest">{activeMystery === i ? "Свернуть" : "Узнать подробнее"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 cosmos-card rounded-2xl p-10 text-center glow-purple">
            <div className="text-5xl mb-6">🔭</div>
            <blockquote className="font-cormorant text-3xl md:text-4xl italic text-white/80 leading-relaxed max-w-3xl mx-auto">
              «Космос внутри нас. Мы сделаны из звёздного вещества. Мы — способ, которым Космос познаёт сам себя»
            </blockquote>
            <cite className="font-oswald text-xs tracking-widest text-cosmos-purple mt-4 block">— Карл Саган</cite>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 border-t border-white/5 text-center">
        <div className="font-oswald text-xs tracking-widest text-cosmos-blue/50 mb-2">COSMOVERSUM</div>
        <p className="text-white/20 text-xs">Вселенная бесконечна — и так же бесконечно человеческое любопытство</p>
        <div className="flex justify-center gap-6 mt-5 flex-wrap">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-oswald text-[10px] tracking-widest text-white/30 hover:text-cosmos-blue uppercase transition-colors"
            >
              {NAV_LABELS[s]}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Index;
