require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Lens = require('./models/Lens');
const Coating = require('./models/Coating');
const Content = require('./models/Content');

const seedDatabase = async () => {
  await connectDB();

  console.log('🧹 Clearing old collections...');
  await Lens.deleteMany({});
  await Coating.deleteMany({});
  await Content.deleteMany({});

  console.log('🌱 Seeding 5 Optical Lenses...');
  await Lens.insertMany([
    {
      lensId: "lens_progressive_01",
      category: "progressive",
      categoryLabel: "Progressive Lenses",
      badge: "Most Popular 40+",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      name: "HD Progressive Lens (No-Line Multifocal)",
      price: 1850,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=700&q=80",
      shortTag: "Seamless Distance, Screen & Reading",
      description: "Continuous multifocal corridor with zero visible surface lines.",
      features: ["3-in-1 continuous focus", "100% invisible corridor", "Super Hydrophobic ARC included"],
      bestFor: "Professionals needing distance and screen multitasking."
    },
    {
      lensId: "lens_digital_bifocal_02",
      category: "digital-bifocal",
      categoryLabel: "Digital Bifocal",
      badge: "Next-Gen Freeform",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      name: "Digital Freeform Bifocal Lens",
      price: 1450,
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=80",
      shortTag: "Laser CNC Surfaced with Low Image Jump",
      description: "Back-surface diamond surfaced reading segment with zero adaptation lag.",
      features: ["Back surface laser carving", "Significantly lower image jump", "Ultra-clear anti-glare"],
      bestFor: "Bifocal lovers wanting a flatter, lighter modern upgrade."
    },
    {
      lensId: "lens_bifocal_03",
      category: "bifocal",
      categoryLabel: "Bifocal Lenses",
      badge: "Classic Dual Focus",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      name: "Standard Bifocal Lens (D-Segment / Kryptok)",
      price: 950,
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=700&q=80",
      shortTag: "Dual Vision with Dedicated Reading Window",
      description: "Classic D-28 segment separating distance walking power from near reading segment.",
      features: ["Distinct D-28 reading window", "Zero distance wave distortion", "Hard scratch coat"],
      bestFor: "Wearers 40+ wanting a fixed wide reading window."
    },
    {
      lensId: "lens_single_vision_04",
      category: "single-vision",
      categoryLabel: "Single Vision",
      badge: "Everyday Essential",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      name: "Single Vision HD Lens",
      price: 550,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
      shortTag: "Uniform Focal Power Across Entire Lens",
      description: "True 1-to-1 power distribution for Myopia, Hyperopia or Astigmatism.",
      features: ["1-to-1 edge-to-edge clarity", "UV420 & Blue filter built-in", "Oleophobic smudge shield"],
      bestFor: "Students, drivers, and daily screen workers."
    },
    {
      lensId: "lens_myopia_control_05",
      category: "myopia-control",
      categoryLabel: "Myopia Control (Kids)",
      badge: "Pediatric Care",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      name: "Myopia Control Pediatric Defocus Lens",
      price: 2400,
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=700&q=80",
      shortTag: "Clinically Slows Eye Minus Power Increase in Kids",
      description: "Ring Defocus micro-lenslet optical structure slowing eye elongation in children (ages 6-18).",
      features: ["Ring defocus multi-segments", "Clear 9mm central school vision", "Polycarbonate impact shield"],
      bestFor: "Growing children and teens experiencing minus power growth annually."
    }
  ]);

  console.log('🌱 Seeding 8 Vacuum Optical Coatings...');
  await Coating.insertMany([
    {
      coatingId: "coat_hmc_arc_01",
      category: "hc-hmc",
      categoryLabel: "HC & HMC-ARC",
      badge: "High Transmittance",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      name: "HMC - ARC (Hard Multi-Coated Anti-Reflective)",
      priceAddon: 250,
      reflexTone: "Emerald Green Reflex",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
      tagline: "99.4% Luminous Transmittance & Zero White Glare",
      description: "Precision vacuum anti-reflective stack removing reflections and camera glare.",
      benefits: ["99.4% throughput clarity", "Removes cosmetic white glare", "Hydrophobic wipe coating"],
      bestFor: "Everyday prescription wearers, camera users, and students."
    },
    {
      coatingId: "coat_hc_02",
      category: "hc-hmc",
      categoryLabel: "HC & HMC-ARC",
      badge: "Scratch Base",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      name: "HC (Hard Coating)",
      priceAddon: 150,
      reflexTone: "Clear Hard Coat",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=700&q=80",
      tagline: "Thermal Polymer Anti-Scratch Protective Barrier",
      description: "Baked polysiloxane lacquer elevating hardness to 4H rating.",
      benefits: ["Prevents micro-abrasions", "Prolongs lens life 2.5x", "Base primer layer"],
      bestFor: "Budget reading frames and workshop glasses."
    },
    {
      coatingId: "coat_golden_03",
      category: "golden",
      categoryLabel: "Golden ARC",
      badge: "Royal Luxury",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      name: "Golden Coating (Gold ARC Luxury Reflex)",
      priceAddon: 400,
      reflexTone: "Signature Warm Golden Reflex",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=80",
      tagline: "Warm Contrast Enhancement with Rich Golden Reflection",
      description: "Titanium-zirconium layering offering a royal golden reflection and warm low-light contrast.",
      benefits: ["Distinctive luxury gold reflex", "Warm indoor contrast", "Oleophobic makeup repellent"],
      bestFor: "Executive metal frames and warm indoor environments."
    },
    {
      coatingId: "coat_blue_cut_blue_04",
      category: "blue-cut",
      categoryLabel: "Blue Cut",
      badge: "Screen Guard",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      name: "Blue Cut Blue Lens (Cool Blue Reflex)",
      priceAddon: 350,
      reflexTone: "Cool Royal Blue Reflex",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=700&q=80",
      tagline: "Targeted 420nm Screen Shield with Visible Blue Reflector",
      description: "Bounces harsh monitor and smartphone blue radiation back with cool-blue reflex.",
      benefits: ["Reflects 400-420nm rays", "Alleviates ocular burning & fatigue", "100% UV block"],
      bestFor: "Software developers, gamers, and smartphone users."
    },
    {
      coatingId: "coat_blue_cut_green_05",
      category: "blue-cut",
      categoryLabel: "Blue Cut",
      badge: "Natural Color",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
      name: "Blue Cut Green Lens (Green HMC Reflex)",
      priceAddon: 350,
      reflexTone: "Soothing Emerald Green Reflex",
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=700&q=80",
      tagline: "Substrate Absorption with Soothing Green Reflex",
      description: "Absorbs blue light internally with 99% true-to-life colors without heavy yellow hue.",
      benefits: ["No yellow tint distortion", "Soothing green reflection", "Monomer internal absorption"],
      bestFor: "Graphic designers, video editors, and visual artists."
    },
    {
      coatingId: "coat_photo_blue_06",
      category: "photochromic",
      categoryLabel: "Photochromic Blue Cut",
      badge: "2-in-1 Action",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      name: "Blue Cut Photochromic Blue (Day & Night)",
      priceAddon: 750,
      reflexTone: "Cool Blue + Rapid Grey Tint",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=700&q=80",
      tagline: "UV Darkening Sunglasses + Indoor Screen Blue Blocker",
      description: "Clear with blue-cut indoors; darkens to sunglasses outdoors in 30 seconds.",
      benefits: ["Indoor/outdoor all-in-one pair", "Fast 30s UV darkening", "Continuous screen protection"],
      bestFor: "Professionals frequently moving outdoors and indoors."
    },
    {
      coatingId: "coat_photo_green_07",
      category: "photochromic",
      categoryLabel: "Photochromic Blue Cut",
      badge: "Smooth HD Transition",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      name: "Blue Cut Photochromic Green (Green HMC)",
      priceAddon: 750,
      reflexTone: "Emerald Green + Rapid Tint",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=80",
      tagline: "Substrate Blue Cut with Calming Green Reflex & Rapid Tinting",
      description: "Calm green HMC glare reduction paired with rapid solar UV darkening.",
      benefits: ["Zero cosmetic camera flash", "High-contrast green ARC", "Easy-clean oleophobic layer"],
      bestFor: "Comfort seekers wanting seamless sun protection."
    },
    {
      coatingId: "coat_night_vision_08",
      category: "night-vision",
      categoryLabel: "Night Vision",
      badge: "Highway Safe",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      name: "Night Vision Magenta / Yellow Coating",
      priceAddon: 600,
      reflexTone: "Magenta-Yellow Anti-Dazzle Spectral Reflex",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
      tagline: "Anti-Dazzle Filter for Blinding LED & Xenon High Beams",
      description: "Notch filter absorbing dazzling 450-480nm white-blue LED headlights for clear asphalt contrast.",
      benefits: ["Reduces oncoming headlight glare 68%", "Sharpens dark road edges", "Dual-sided anti-bounce ARC"],
      bestFor: "Night commuters, highway drivers, and cab operators."
    }
  ]);

  console.log('🌱 Seeding Dynamic Home, Terms & Support Content...');
  await Content.insertMany([
    {
      page: "home",
      data: {
        tagline: "Optik Lensmart for everyone",
        banner: {
          badgeText: "New Season Lab Offer",
          heading: "Upgrade To HD Blue-Cut & Anti-Glare Lenses.",
          subtext: "Direct factory pricing with accurate 0.01D laser cutting. Get custom power fitted to any frame!",
          imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1600&q=80"
        },
        notice: {
          title: "Notice & Lens Guidance",
          badge: "Verified Optical Advisory",
          paragraphs: [
            "Welcome to Optik Lensmart! Precision engineered optical lenses crafted in clinical surfacing labs.",
            "All prescription orders are backed by a certified 0.01D laser check and rapid courier dispatch."
          ]
        }
      }
    },
    {
      page: "terms",
      data: {
        badge: "Legal & Clinical Lab Policy",
        heading: "Terms & Conditions",
        subtitle: "Official lab policies governing prescription accuracy, UPI payments, and data retention.",
        sections: [
          { id: 1, title: "1. Mandatory Account Authentication", icon: "shield-check", content: "Prescription orders require verified accounts to preserve medical records." },
          { id: 2, title: "2. Prescription Accuracy & 0.01D Surfacing", icon: "check-circle", content: "Lenses are surfaced with 0.01D CNC precision strictly matching submitted OD/OS powers." },
          { id: 3, title: "3. Mandatory UPI Payment & 12-Digit UTR", icon: "credit-card", content: "Orders require valid 12-digit bank UTR numbers for lab billing verification." },
          { id: 4, title: "4. 1-Year Clinical Data Retention", icon: "lock", content: "Prescriptions and order history are archived securely for 365 days." }
        ]
      }
    },
    {
      page: "support",
      data: {
        helplinePhone: "+91 98765 43210",
        helplineDial: "+919876543210",
        whatsappNumber: "919876543210",
        operatingHours: "Mon-Sat 9AM - 8PM"
      }
    }
  ]);

  console.log('✅ Database Seeding Completed Successfully!');
  process.exit(0);
};

seedDatabase();
