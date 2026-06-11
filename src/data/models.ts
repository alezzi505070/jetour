export type Series = "G" | "T" | "X" | "D";

export interface Localized {
  en: string;
  ar: string;
}

export interface VehicleSpecs {
  engine: Localized;
  power: Localized;
  torque: Localized;
  transmission: Localized;
  dimensions: Localized;
  seats: Localized;
  powertrain: Localized;
}

export interface VehicleModel {
  slug: string;
  /** Folder name under /public/images/gallery (mirrors jetourglobal.com). */
  dir: string;
  name: Localized;
  tagline: Localized;
  overview: Localized;
  series: Series;
  hybrid: boolean;
  /**
   * Availability tags follow plan §10. These are provisional until NATCO
   * confirms stock — the UI pairs them with a "verify with dealer" notice.
   */
  availability: "available" | "soon";
  /** Transparent studio cutout (official turntable frame). */
  cutout: string;
  /** Transparent side-profile beauty shot. */
  profile: string;
  /** Cinematic lifestyle keyart used as the model page hero. */
  hero: string;
  gallery: string[];
  highlights: { title: Localized; text: Localized }[];
  specs: VehicleSpecs;
  /** Turntable frames available under /public/images/360/{slug}. */
  has360?: boolean;
}

const g = (dir: string, files: string[]) => files.map((f) => `/images/gallery/${dir}/${f}`);

export const models: VehicleModel[] = [
  {
    slug: "g700",
    dir: "g700",
    name: { en: "JETOUR G700", ar: "جيتور G700" },
    tagline: {
      en: "All-terrain premium hybrid off-road SUV",
      ar: "سيارة دفع رباعي هجينة فاخرة لكل التضاريس",
    },
    overview: {
      en: "The flagship of JETOUR's professional off-road era. GAIA architecture, Kunpeng super-hybrid power and a luxury six-seat cabin take you anywhere — in first class.",
      ar: "رائدة مرحلة جيتور الاحترافية للطرق الوعرة. هندسة GAIA وقوة كون بنغ الهجينة الفائقة ومقصورة فاخرة بستة مقاعد تأخذك إلى أي مكان — وعلى الدرجة الأولى.",
    },
    series: "G",
    hybrid: true,
    availability: "soon",
    cutout: "/images/profiles/g700.png",
    profile: "/images/profiles/g700.png",
    hero: "/images/scenes/g700.png",
    gallery: g("g700", ["p1_1.png", "p1_2.png", "p1_3.png", "p2_1.png", "p2_2.png", "p2_3.png", "p4_1.png", "p4_2.png", "p4_3.png", "p4_4.png"]),
    has360: true,
    highlights: [
      {
        title: { en: "GAIA Off-Road Design", ar: "تصميم GAIA للطرق الوعرة" },
        text: {
          en: "Commanding stance, functional aesthetics and serious approach angles — engineered to conquer, styled to impress.",
          ar: "حضور مهيب وجماليات وظيفية وزوايا اقتراب جادة — هندسة للسيطرة وتصميم يفرض الإعجاب.",
        },
      },
      {
        title: { en: "Hybrid All-Terrain Power", ar: "قوة هجينة لكل التضاريس" },
        text: {
          en: "Kunpeng super-hybrid drivetrain delivers instant torque on rock, sand and asphalt alike.",
          ar: "نظام كون بنغ الهجين الفائق يمنح عزماً فورياً على الصخر والرمل والإسفلت على حد سواء.",
        },
      },
      {
        title: { en: "First-Class Six-Seat Cabin", ar: "مقصورة فاخرة بستة مقاعد" },
        text: {
          en: "Spacious six-seat layout with leg-rest and massage functions for true long-distance comfort.",
          ar: "تصميم رحب بستة مقاعد مع مساند للساقين ووظائف تدليك لراحة حقيقية في الرحلات الطويلة.",
        },
      },
      {
        title: { en: "Magnetic Ride + Air Suspension", ar: "تعليق هوائي مع تحكم مغناطيسي" },
        text: {
          en: "Adaptive magnetic dampers and air suspension read the road hundreds of times per second.",
          ar: "مخمدات مغناطيسية متكيفة وتعليق هوائي يقرأ الطريق مئات المرات في الثانية.",
        },
      },
    ],
    specs: {
      engine: { en: "2.0T + dual-motor super hybrid", ar: "محرك 2.0 تيربو + محركين كهربائيين هجين فائق" },
      power: { en: "Combined output approx. widely above 500 PS (global spec)", ar: "قوة مجمعة تتجاوز 500 حصان تقريباً (مواصفات عالمية)" },
      torque: { en: "Instant electric torque delivery", ar: "عزم كهربائي فوري" },
      transmission: { en: "Dedicated hybrid transmission (DHT)", ar: "ناقل حركة هجين مخصص (DHT)" },
      dimensions: { en: "Full-size off-road SUV", ar: "سيارة دفع رباعي كبيرة الحجم للطرق الوعرة" },
      seats: { en: "6 seats", ar: "6 مقاعد" },
      powertrain: { en: "Plug-in hybrid, intelligent 4WD", ar: "هجين قابل للشحن، دفع رباعي ذكي" },
    },
  },
  {
    slug: "t2",
    dir: "T2",
    name: { en: "JETOUR T2", ar: "جيتور T2" },
    tagline: {
      en: "Rugged adventure SUV",
      ar: "سيارة مغامرات متينة",
    },
    overview: {
      en: "A rugged adventure SUV with generous space and Kunpeng power. Hardcore body, long wheelbase and the confidence to take the road less travelled.",
      ar: "سيارة مغامرات متينة بمقصورة فسيحة وقوة كون بنغ. هيكل صلب وقاعدة عجلات طويلة وثقة تأخذك إلى الطرق الأقل ارتياداً.",
    },
    series: "T",
    hybrid: false,
    availability: "available",
    cutout: "/images/profiles/t2.png",
    profile: "/images/profiles/t2.png",
    hero: "/images/scenes/t2.png",
    gallery: g("T2", ["p1_1.png", "p1_2.png", "p1_3.png", "p3_1.png", "p3_2.png", "p3_3.png", "p3_4.png", "p5_1.png", "p5_2.png", "p5_3.png"]),
    has360: true,
    highlights: [
      {
        title: { en: "Hardcore Body, Boxy Attitude", ar: "هيكل صلب وحضور جريء" },
        text: {
          en: "High-strength steel-cage construction with an unmistakable squared-off silhouette.",
          ar: "بنية فولاذية عالية الصلابة بصورة ظلية مربعة لا تُخطئها العين.",
        },
      },
      {
        title: { en: "Super-Large Space", ar: "مساحة فائقة الاتساع" },
        text: {
          en: "4785×2006×1880 mm with a 2800 mm wheelbase — room for every adventure and everyone on it.",
          ar: "أبعاد 4785×2006×1880 ملم وقاعدة عجلات 2800 ملم — مساحة لكل مغامرة ولكل من يشاركك إياها.",
        },
      },
      {
        title: { en: "Kunpeng Power", ar: "قوة كون بنغ" },
        text: {
          en: "A responsive turbocharged drivetrain tuned for both city refinement and off-road grit.",
          ar: "نظام دفع تيربو سريع الاستجابة، مضبوط لنعومة المدينة وصلابة الطرق الوعرة.",
        },
      },
      {
        title: { en: "Off-Road Matrix", ar: "منظومة الطرق الوعرة" },
        text: {
          en: "Multiple terrain modes and intelligent torque distribution keep you in control anywhere.",
          ar: "أنماط متعددة للتضاريس وتوزيع ذكي للعزم يبقيانك مسيطراً في كل مكان.",
        },
      },
    ],
    specs: {
      engine: { en: "2.0L Turbo GDI", ar: "محرك 2.0 لتر تيربو حقن مباشر" },
      power: { en: "Approx. 254 PS (global spec)", ar: "نحو 254 حصاناً (مواصفات عالمية)" },
      torque: { en: "Approx. 390 N·m", ar: "نحو 390 نيوتن·متر" },
      transmission: { en: "7-speed DCT", ar: "ناقل حركة مزدوج القابض بـ7 سرعات" },
      dimensions: { en: "4785 × 2006 × 1880 mm, WB 2800 mm", ar: "4785 × 2006 × 1880 ملم، قاعدة العجلات 2800 ملم" },
      seats: { en: "5 seats", ar: "5 مقاعد" },
      powertrain: { en: "Petrol, intelligent AWD available", ar: "بنزين، مع دفع رباعي ذكي متاح" },
    },
  },
  {
    slug: "t2-idm",
    dir: "T2iDM",
    name: { en: "JETOUR T2 i-DM", ar: "جيتور T2 i-DM" },
    tagline: {
      en: "Hybrid adventure SUV",
      ar: "سيارة مغامرات هجينة",
    },
    overview: {
      en: "The T2's rugged soul with super-hybrid efficiency. High-efficiency engine, hybrid transmission, panoramic sunroof and L2 driving assistance.",
      ar: "روح T2 المتينة بكفاءة هجينة فائقة. محرك عالي الكفاءة وناقل حركة هجين وفتحة سقف بانورامية ومساعدات قيادة من المستوى الثاني.",
    },
    series: "T",
    hybrid: true,
    availability: "soon",
    cutout: "/images/profiles/t2-idm.png",
    profile: "/images/profiles/t2-idm.png",
    hero: "/images/scenes/t2-idm.png",
    gallery: g("T2iDM", ["p1_1.png", "p1_2.png", "p1_3.png", "p2_1.png", "p2_2.png", "p2_3.png", "p4_1.png", "p4_2.png", "p4_3.png", "p5_1.png", "p5_2.png", "p5_3.png"]),
    highlights: [
      {
        title: { en: "Super Hybrid Powertrain", ar: "نظام دفع هجين فائق" },
        text: {
          en: "High-efficiency engine paired with a super-hybrid transmission for power without thirst.",
          ar: "محرك عالي الكفاءة مقترن بناقل هجين فائق — قوة بلا شراهة في الوقود.",
        },
      },
      {
        title: { en: "L2 Intelligent Assistance", ar: "مساعدة ذكية من المستوى الثاني" },
        text: {
          en: "Adaptive cruising, lane keeping and a 540° panoramic image system watch every angle.",
          ar: "تثبيت سرعة متكيف وحفظ المسار ونظام رؤية بانورامية بزاوية 540 درجة يراقب كل الاتجاهات.",
        },
      },
      {
        title: { en: "Matrix Headlights", ar: "مصابيح أمامية مصفوفية" },
        text: {
          en: "Signature matrix lighting cuts through dust and dark with intelligent beam control.",
          ar: "إضاءة مصفوفية مميزة تخترق الغبار والظلام بتحكم ذكي في الحزمة الضوئية.",
        },
      },
      {
        title: { en: "Panoramic Sunroof", ar: "فتحة سقف بانورامية" },
        text: {
          en: "Open the cabin to the sky — desert nights never looked better.",
          ar: "افتح المقصورة على السماء — لم تبدُ ليالي الصحراء أجمل من هذا قط.",
        },
      },
    ],
    specs: {
      engine: { en: "1.5T high-efficiency + electric motor", ar: "محرك 1.5 تيربو عالي الكفاءة + محرك كهربائي" },
      power: { en: "Combined hybrid output (global spec)", ar: "قوة هجينة مجمعة (مواصفات عالمية)" },
      torque: { en: "Instant electric torque", ar: "عزم كهربائي فوري" },
      transmission: { en: "Super hybrid DHT", ar: "ناقل هجين فائق DHT" },
      dimensions: { en: "Adventure SUV, long wheelbase", ar: "سيارة مغامرات بقاعدة عجلات طويلة" },
      seats: { en: "5 seats", ar: "5 مقاعد" },
      powertrain: { en: "Plug-in hybrid i-DM", ar: "هجين قابل للشحن i-DM" },
    },
  },
  {
    slug: "t1",
    dir: "T1",
    name: { en: "JETOUR T1", ar: "جيتور T1" },
    tagline: {
      en: "Crossover design pioneer",
      ar: "رائدة التصميم الكروس أوفر",
    },
    overview: {
      en: "Where urban style meets off-road spirit. The T1 blends crossover design with genuine capability, a quiet cabin and Tour OS smart cockpit.",
      ar: "حيث تلتقي أناقة المدينة بروح الطرق الوعرة. تمزج T1 تصميم الكروس أوفر بقدرة حقيقية ومقصورة هادئة ونظام Tour OS الذكي.",
    },
    series: "T",
    hybrid: false,
    availability: "available",
    cutout: "/images/profiles/t1.png",
    profile: "/images/profiles/t1.png",
    hero: "/images/scenes/t1.png",
    gallery: g("T1", ["p1_1.png", "p1_2.png", "p1_3.png", "p3_1.png", "p3_2.png", "p3_3.png", "p3_4.png", "p5_1.png", "p5_2.png", "p5_3.png"]),
    highlights: [
      {
        title: { en: "Urban × Off-Road Design", ar: "تصميم يجمع المدينة والطرق الوعرة" },
        text: {
          en: "A crossover stance that looks at home outside a hotel or halfway up a mountain.",
          ar: "حضور كروس أوفر يبدو في مكانه أمام فندق فاخر أو في منتصف طريق جبلي.",
        },
      },
      {
        title: { en: "Cloud-Soft Quiet Cabin", ar: "مقصورة هادئة بمقاعد بنعومة السحاب" },
        text: {
          en: "Acoustic insulation and cloud-like seats turn every commute into a retreat.",
          ar: "عزل صوتي ومقاعد بنعومة السحاب تحوّل كل مشوار إلى استراحة.",
        },
      },
      {
        title: { en: "Tour OS 2.0", ar: "نظام Tour OS 2.0" },
        text: {
          en: "A fast, connected smart cockpit that keeps maps, media and calls one tap away.",
          ar: "قمرة قيادة ذكية سريعة ومتصلة تضع الخرائط والوسائط والمكالمات على بعد لمسة.",
        },
      },
      {
        title: { en: "Confident Capability", ar: "قدرة تبعث على الثقة" },
        text: {
          en: "Intelligent traction management shrugs off rough patches and broken tarmac.",
          ar: "إدارة جر ذكية تتجاوز المقاطع الوعرة والإسفلت المتكسر بثبات.",
        },
      },
    ],
    specs: {
      engine: { en: "1.5T / 2.0T petrol (market dependent)", ar: "محرك 1.5 أو 2.0 تيربو بنزين (حسب السوق)" },
      power: { en: "Up to approx. 254 PS (global spec)", ar: "حتى نحو 254 حصاناً (مواصفات عالمية)" },
      torque: { en: "Up to approx. 390 N·m", ar: "حتى نحو 390 نيوتن·متر" },
      transmission: { en: "7-speed DCT", ar: "ناقل مزدوج القابض بـ7 سرعات" },
      dimensions: { en: "Mid-size crossover SUV", ar: "كروس أوفر SUV متوسطة الحجم" },
      seats: { en: "5 seats", ar: "5 مقاعد" },
      powertrain: { en: "Petrol, AWD available", ar: "بنزين، مع دفع رباعي متاح" },
    },
  },
  {
    slug: "t1-idm",
    dir: "T1iDM",
    name: { en: "JETOUR T1 i-DM", ar: "جيتور T1 i-DM" },
    tagline: {
      en: "Plug-in hybrid crossover",
      ar: "كروس أوفر هجينة قابلة للشحن",
    },
    overview: {
      en: "Red Dot-awarded design with plug-in hybrid efficiency. Storm-eye headlights, dual-zone climate and Tour OS 2.0 — the future, ready today.",
      ar: "تصميم حائز على جائزة Red Dot بكفاءة هجينة قابلة للشحن. مصابيح بعين العاصفة وتكييف ثنائي المناطق ونظام Tour OS 2.0 — المستقبل، جاهز اليوم.",
    },
    series: "T",
    hybrid: true,
    availability: "soon",
    cutout: "/images/profiles/t1-idm.png",
    profile: "/images/profiles/t1-idm.png",
    hero: "/images/scenes/t1-idm.png",
    gallery: g("T1iDM", ["p1_1.jpg", "p1_2.jpg", "p1_3.jpg", "p3_1.jpg", "p3_2.jpg", "p3_3.jpg", "p5_1.jpg", "p5_2.jpg", "p5_3.jpg", "p6_1.jpg", "p6_2.jpg", "p7_1.jpg"]),
    highlights: [
      {
        title: { en: "Red Dot Award Design", ar: "تصميم حائز على جائزة Red Dot" },
        text: {
          en: "Internationally recognised design language with signature storm-eye headlights.",
          ar: "لغة تصميم معترف بها عالمياً مع مصابيح أمامية مميزة بعين العاصفة.",
        },
      },
      {
        title: { en: "i-DM Plug-in Hybrid", ar: "نظام i-DM الهجين القابل للشحن" },
        text: {
          en: "Charge at home, glide through the city on electric power, road-trip without range anxiety.",
          ar: "اشحن في المنزل، وانسَب في المدينة بالكهرباء، وسافر دون قلق من نفاد الطاقة.",
        },
      },
      {
        title: { en: "Dual-Zone Climate", ar: "تكييف ثنائي المناطق" },
        text: {
          en: "Dual-layer sunproof glass and independent climate zones keep everyone comfortable.",
          ar: "زجاج عازل مزدوج الطبقات ومناطق تكييف مستقلة تضمن راحة الجميع.",
        },
      },
      {
        title: { en: "Tour OS 2.0 Cockpit", ar: "قمرة Tour OS 2.0" },
        text: {
          en: "A crisp, responsive smart cockpit built around the way you actually drive.",
          ar: "قمرة قيادة ذكية سريعة الاستجابة، مبنية حول طريقتك الحقيقية في القيادة.",
        },
      },
    ],
    specs: {
      engine: { en: "1.5T + electric motor (i-DM)", ar: "محرك 1.5 تيربو + محرك كهربائي (i-DM)" },
      power: { en: "Combined hybrid output (global spec)", ar: "قوة هجينة مجمعة (مواصفات عالمية)" },
      torque: { en: "Instant electric torque", ar: "عزم كهربائي فوري" },
      transmission: { en: "Hybrid DHT", ar: "ناقل هجين DHT" },
      dimensions: { en: "Mid-size crossover SUV", ar: "كروس أوفر SUV متوسطة الحجم" },
      seats: { en: "5 seats", ar: "5 مقاعد" },
      powertrain: { en: "Plug-in hybrid i-DM", ar: "هجين قابل للشحن i-DM" },
    },
  },
  {
    slug: "dashing",
    dir: "dashing",
    name: { en: "JETOUR DASHING", ar: "جيتور داشينج" },
    tagline: {
      en: "Vanguard technology SUV",
      ar: "سيارة SUV بتقنيات طليعية",
    },
    overview: {
      en: "Sleek, athletic and loaded with tech: Sony surround sound, 40W wireless charging, environment purification and a full suite of active safety.",
      ar: "انسيابية ورياضية ومحملة بالتقنيات: صوت محيطي من سوني وشحن لاسلكي بقوة 40 واط ونظام تنقية للهواء وحزمة كاملة من أنظمة الأمان النشطة.",
    },
    series: "D",
    hybrid: false,
    availability: "available",
    cutout: "/images/profiles/dashing.png",
    profile: "/images/profiles/dashing.png",
    hero: "/images/scenes/dashing.png",
    gallery: g("dashing", ["p2_1.png", "p2_2.png", "p2_3.png", "p3_1.png", "p3_2.png", "p3_3.png", "p4_1.png", "p4_2.png", "p4_3.png", "p5_1.png", "p5_2.png", "p5_3.png"]),
    highlights: [
      {
        title: { en: "Athletic Vanguard Design", ar: "تصميم رياضي طليعي" },
        text: {
          en: "A sharp, coupe-inspired silhouette that turns heads at every junction.",
          ar: "صورة ظلية حادة مستوحاة من الكوبيه تلفت الأنظار عند كل منعطف.",
        },
      },
      {
        title: { en: "Sony Surround Audio", ar: "صوت محيطي من سوني" },
        text: {
          en: "Concert-grade sound staging tuned specifically for the cabin.",
          ar: "مسرح صوتي بمستوى الحفلات، مضبوط خصيصاً للمقصورة.",
        },
      },
      {
        title: { en: "Clean-Air Cabin", ar: "مقصورة بهواء نقي" },
        text: {
          en: "Environment purification keeps cabin air fresh through traffic and dust alike.",
          ar: "نظام تنقية يحافظ على نقاء هواء المقصورة وسط الزحام والغبار.",
        },
      },
      {
        title: { en: "40W Wireless Charging", ar: "شحن لاسلكي بقوة 40 واط" },
        text: {
          en: "Drop your phone on the pad and forget cables forever.",
          ar: "ضع هاتفك على القاعدة وانسَ الكوابل إلى الأبد.",
        },
      },
    ],
    specs: {
      engine: { en: "1.5T / 1.6T GDI (market dependent)", ar: "محرك 1.5 أو 1.6 تيربو (حسب السوق)" },
      power: { en: "Up to approx. 197 PS (global spec)", ar: "حتى نحو 197 حصاناً (مواصفات عالمية)" },
      torque: { en: "Up to approx. 290 N·m", ar: "حتى نحو 290 نيوتن·متر" },
      transmission: { en: "7-speed DCT", ar: "ناقل مزدوج القابض بـ7 سرعات" },
      dimensions: { en: "Compact-plus SUV", ar: "سيارة SUV مدمجة بلمسة أكبر" },
      seats: { en: "5 seats", ar: "5 مقاعد" },
      powertrain: { en: "Petrol, FWD", ar: "بنزين، دفع أمامي" },
    },
  },
  {
    slug: "x70",
    dir: "x70",
    name: { en: "JETOUR X70", ar: "جيتور X70" },
    tagline: {
      en: "Big family SUV",
      ar: "سيارة العائلة الكبيرة",
    },
    overview: {
      en: "The SUV that built the brand. Ultra-silent cabin, panoramic sunroof and honest, dependable engineering for families who go places together.",
      ar: "السيارة التي بنت العلامة. مقصورة فائقة الهدوء وفتحة سقف بانورامية وهندسة صادقة يعتمد عليها — لعائلات تذهب إلى كل مكان معاً.",
    },
    series: "X",
    hybrid: false,
    availability: "available",
    cutout: "/images/profiles/x70.png",
    profile: "/images/profiles/x70.png",
    hero: "/images/scenes/x70.png",
    gallery: g("x70", ["p1_1.png", "p1_2.png", "p1_3.png", "p2_1.png", "p2_2.png", "p2_3.png", "p3_1.png", "p3_2.png", "p3_3.png"]),
    highlights: [
      {
        title: { en: "Ultra-Silent Cabin", ar: "مقصورة فائقة الهدوء" },
        text: {
          en: "Layered acoustic insulation hushes the road so conversations don't have to compete.",
          ar: "عزل صوتي متعدد الطبقات يكتم ضجيج الطريق كي لا تضطر أحاديثكم للمنافسة.",
        },
      },
      {
        title: { en: "Panoramic Sunroof", ar: "فتحة سقف بانورامية" },
        text: {
          en: "Light floods the cabin; stars take the night shift.",
          ar: "الضوء يغمر المقصورة نهاراً، والنجوم تتولى النوبة الليلية.",
        },
      },
      {
        title: { en: "Family-First Space", ar: "مساحة تضع العائلة أولاً" },
        text: {
          en: "Clever storage and generous legroom across all rows.",
          ar: "حلول تخزين ذكية ومساحات واسعة للأرجل في جميع الصفوف.",
        },
      },
      {
        title: { en: "Proven Reliability", ar: "موثوقية مثبتة" },
        text: {
          en: "The model that carried JETOUR to a million owners worldwide.",
          ar: "الطراز الذي أوصل جيتور إلى مليون مالك حول العالم.",
        },
      },
    ],
    specs: {
      engine: { en: "1.5T / 1.6T petrol", ar: "محرك 1.5 أو 1.6 تيربو بنزين" },
      power: { en: "Up to approx. 197 PS (global spec)", ar: "حتى نحو 197 حصاناً (مواصفات عالمية)" },
      torque: { en: "Up to approx. 290 N·m", ar: "حتى نحو 290 نيوتن·متر" },
      transmission: { en: "6MT / 7-speed DCT", ar: "يدوي 6 سرعات / مزدوج القابض 7 سرعات" },
      dimensions: { en: "Mid-size family SUV", ar: "سيارة عائلية متوسطة الحجم" },
      seats: { en: "5 / 7 seats", ar: "5 / 7 مقاعد" },
      powertrain: { en: "Petrol, FWD", ar: "بنزين، دفع أمامي" },
    },
  },
  {
    slug: "x70-plus",
    dir: "x70Plus",
    name: { en: "JETOUR X70 PLUS", ar: "جيتور X70 بلس" },
    tagline: {
      en: "The family SUV, amplified",
      ar: "سيارة العائلة، بنسخة أقوى",
    },
    overview: {
      en: "Athletic style, LED meteor tail-lights and a flexible 5/7-seat layout on a 2720 mm wheelbase — the family favourite with extra presence.",
      ar: "أناقة رياضية ومصابيح خلفية LED بتصميم الشهب وخيارات مرنة بخمسة أو سبعة مقاعد على قاعدة عجلات بطول 2720 ملم — المفضلة للعائلة بحضور أقوى.",
    },
    series: "X",
    hybrid: false,
    availability: "available",
    cutout: "/images/profiles/x70-plus.png",
    profile: "/images/profiles/x70-plus.png",
    hero: "/images/scenes/x70-plus.png",
    gallery: g("x70Plus", ["p1_1.png", "p1_2.png", "p1_3.png", "p1_4.png", "p2_1.png", "p2_2.png", "p2_3.png", "p4_1.png", "p4_2.png", "p5_1.png", "p5_2.png", "p5_3.png"]),
    highlights: [
      {
        title: { en: "Meteor LED Tail-Lights", ar: "مصابيح خلفية LED بتصميم الشهب" },
        text: {
          en: "A signature full-width light bar that announces you after dark.",
          ar: "شريط ضوئي مميز بعرض السيارة يعلن وصولك بعد الغروب.",
        },
      },
      {
        title: { en: "Flexible 5/7 Seats", ar: "مقاعد مرنة 5/7" },
        text: {
          en: "Reconfigure in seconds — school run on Sunday, full convoy on Friday.",
          ar: "أعد ترتيب المقاعد في ثوانٍ — مشوار المدرسة يوم الأحد، ورحلة العائلة الكاملة يوم الجمعة.",
        },
      },
      {
        title: { en: "Active Safety Suite", ar: "حزمة أمان نشطة" },
        text: {
          en: "Lane departure warning and blind-spot monitoring as standard guardians.",
          ar: "تنبيه مغادرة المسار ومراقبة النقطة العمياء حارسان دائمان.",
        },
      },
      {
        title: { en: "Athletic Styling", ar: "تصميم رياضي" },
        text: {
          en: "Sport wheels and sculpted lines give the family car a confident edge.",
          ar: "عجلات رياضية وخطوط منحوتة تمنح سيارة العائلة حافة من الثقة.",
        },
      },
    ],
    specs: {
      engine: { en: "1.5T / 1.6T GDI", ar: "محرك 1.5 أو 1.6 تيربو حقن مباشر" },
      power: { en: "Up to approx. 197 PS (global spec)", ar: "حتى نحو 197 حصاناً (مواصفات عالمية)" },
      torque: { en: "Up to approx. 290 N·m", ar: "حتى نحو 290 نيوتن·متر" },
      transmission: { en: "7-speed DCT", ar: "ناقل مزدوج القابض بـ7 سرعات" },
      dimensions: { en: "WB 2720 mm", ar: "قاعدة العجلات 2720 ملم" },
      seats: { en: "5 / 7 seats", ar: "5 / 7 مقاعد" },
      powertrain: { en: "Petrol, FWD", ar: "بنزين، دفع أمامي" },
    },
  },
  {
    slug: "x90-plus",
    dir: "x90Plus",
    name: { en: "JETOUR X90 PLUS", ar: "جيتور X90 بلس" },
    tagline: {
      en: "Premium flagship SUV",
      ar: "الرائدة الفاخرة",
    },
    overview: {
      en: "The premium flagship: chrome-detailed grille, dual 12.3-inch screens, wireless charging and lounge-grade comfort across three rows.",
      ar: "الرائدة الفاخرة: شبك أمامي بتفاصيل الكروم وشاشتان مقاس 12.3 بوصة وشحن لاسلكي وراحة بمستوى الصالات الفاخرة عبر ثلاثة صفوف.",
    },
    series: "X",
    hybrid: false,
    availability: "available",
    cutout: "/images/profiles/x90-plus.png",
    profile: "/images/profiles/x90-plus.png",
    hero: "/images/scenes/x90-plus.png",
    gallery: g("x90Plus", ["p1_1.png", "p1_2.png", "p1_3.png", "p1_4.png", "p3_1.png", "p3_2.png", "p3_3.png", "p4_1.png", "p4_2.png", "p5_1.png", "p5_2.png", "p5_3.png"]),
    highlights: [
      {
        title: { en: "Dual 12.3-inch Screens", ar: "شاشتان مقاس 12.3 بوصة" },
        text: {
          en: "A seamless digital horizon for driver and co-pilot alike.",
          ar: "أفق رقمي متصل للسائق ومرافقه على حد سواء.",
        },
      },
      {
        title: { en: "Chrome-Detailed Presence", ar: "حضور بتفاصيل الكروم" },
        text: {
          en: "A flagship grille and LED tail-lights that read 'executive' from any angle.",
          ar: "شبك أمامي بمستوى الرائدات ومصابيح LED خلفية توحي بالفخامة من أي زاوية.",
        },
      },
      {
        title: { en: "360° Park & Radar Suite", ar: "منظومة رادارات ورؤية 360°" },
        text: {
          en: "Blind-spot monitoring, front/rear radar and 360° parking camera as standard company.",
          ar: "مراقبة النقطة العمياء ورادارات أمامية وخلفية وكاميرا ركن بزاوية 360 درجة.",
        },
      },
      {
        title: { en: "Three-Row Luxury", ar: "فخامة بثلاثة صفوف" },
        text: {
          en: "Premium materials and multi-seat layouts for guests who expect more.",
          ar: "خامات فاخرة وتوزيعات مقاعد متعددة لضيوف يتوقعون المزيد.",
        },
      },
    ],
    specs: {
      engine: { en: "1.6T / 2.0T GDI", ar: "محرك 1.6 أو 2.0 تيربو حقن مباشر" },
      power: { en: "Up to approx. 254 PS (global spec)", ar: "حتى نحو 254 حصاناً (مواصفات عالمية)" },
      torque: { en: "Up to approx. 390 N·m", ar: "حتى نحو 390 نيوتن·متر" },
      transmission: { en: "7-speed DCT", ar: "ناقل مزدوج القابض بـ7 سرعات" },
      dimensions: { en: "Full-size 3-row SUV", ar: "سيارة كبيرة بثلاثة صفوف" },
      seats: { en: "6 / 7 seats", ar: "6 / 7 مقاعد" },
      powertrain: { en: "Petrol, FWD", ar: "بنزين، دفع أمامي" },
    },
  },
];

export function getModel(slug: string): VehicleModel | undefined {
  return models.find((m) => m.slug === slug);
}

export const featuredSlugs = ["g700", "t2", "x90-plus", "dashing"] as const;
