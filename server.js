require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');

const Lens = require('./models/Lens');
const Coating = require('./models/Coating');
const Content = require('./models/Content');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

// Static files (Admin Panel)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/lenses', require('./routes/lensRoutes'));
app.use('/api/coatings', require('./routes/coatingRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cms', require('./routes/cmsRoutes'));

// Admin Dashboard Route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Auto-seed function with working reliable high-res optical images
async function autoSeedOnStartup() {
  try {
    const lensCount = await Lens.countDocuments();
    if (lensCount === 0) {
      console.log('🌱 [Auto-Init]: Loading Clean Optical Lenses...');
      await Lens.insertMany([
        {
          lensId: "lens_progressive_01",
          category: "progressive",
          categoryLabel: "Progressive Lenses",
          badge: "Most Popular 40+",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
          name: "HD Progressive Lens (No-Line Multifocal)",
          price: 1850,
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop&q=80",
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
          image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80",
          shortTag: "Laser CNC Surfaced with Low Image Jump",
          description: "Back-surface diamond surfaced reading segment with zero adaptation lag.",
          features: ["Back surface laser carving", "Significantly lower image jump", "Ultra-clear anti-glare"],
          bestFor: "Bifocal wearers wanting a flatter, modern upgrade."
        },
        {
          lensId: "lens_bifocal_03",
          category: "bifocal",
          categoryLabel: "Bifocal Lenses",
          badge: "Classic Dual Focus",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
          name: "Standard Bifocal Lens (D-Segment / Kryptok)",
          price: 950,
          image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&auto=format&fit=crop&q=80",
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
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
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
          image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&auto=format&fit=crop&q=80",
          shortTag: "Clinically Slows Eye Minus Power Increase in Kids",
          description: "Ring Defocus micro-lenslet optical structure slowing eye elongation in children (ages 6-18).",
          features: ["Ring defocus multi-segments", "Clear 9mm central school vision", "Polycarbonate impact shield"],
          bestFor: "Growing children and teens experiencing minus power growth annually."
        }
      ]);
    }

    const coatingCount = await Coating.countDocuments();
    if (coatingCount === 0) {
      console.log('🌱 [Auto-Init]: Loading Clean Optical Coatings...');
      await Coating.insertMany([
        {
          coatingId: "coat_hmc_arc_01",
          category: "hc-hmc",
          name: "HMC - ARC (Hard Multi-Coated Anti-Reflective)",
          priceAddon: 250,
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
          badge: "High Transmittance",
          description: "99.4% Luminous Transmittance & Zero White Glare"
        },
        {
          coatingId: "coat_hc_02",
          category: "hc-hmc",
          name: "HC (Hard Coating)",
          priceAddon: 150,
          image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&auto=format&fit=crop&q=80",
          badge: "Scratch Base",
          description: "Thermal Polymer Anti-Scratch Protective Barrier"
        },
        {
          coatingId: "coat_golden_03",
          category: "golden",
          name: "Golden Coating (Gold ARC Luxury Reflex)",
          priceAddon: 400,
          image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80",
          badge: "Royal Luxury",
          description: "Warm Contrast Enhancement with Rich Golden Reflection"
        },
        {
          coatingId: "coat_blue_cut_blue_04",
          category: "blue-cut",
          name: "Blue Cut Blue Lens (Cool Blue Reflex)",
          priceAddon: 350,
          image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop&q=80",
          badge: "Screen Guard",
          description: "Targeted 420nm Screen Shield with Visible Blue Reflector"
        }
      ]);
    }

    const contentCount = await Content.countDocuments();
    if (contentCount === 0) {
      await Content.insertMany([
        {
          page: "home",
          data: {
            tagline: "Optik Lensmart for everyone",
            banner: {
              badgeText: "New Season Lab Offer",
              heading: "Upgrade To HD Blue-Cut & Anti-Glare Lenses.",
              subtext: "Direct factory pricing with accurate 0.01D laser cutting. Get custom power fitted to any frame!",
              imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=1200&auto=format&fit=crop&q=80"
            },
            notice: {
              title: "Notice & Lens Guidance",
              badge: "Verified Optical Advisory",
              paragraphs: [
                "Welcome to Optik Lensmart! Precision engineered optical lenses crafted in clinical surfacing labs.",
                "All prescription orders are backed by a certified 0.01D laser check and rapid courier dispatch across India."
              ]
            },
            gallery: [
              { id: 1, isFeatured: true, tag: "Manufacturing", title: "Diamond CNC Lens Cutting", subtitle: "High-index thinning with zero edge distortions.", imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format&fit=crop&q=80" },
              { id: 2, isFeatured: false, tag: "Coating", title: "Blue-Shield Digital Filter", subtitle: "", imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80" },
              { id: 3, isFeatured: false, tag: "Custom Fitting", title: "Universal Frame Glazing", subtitle: "", imageUrl: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80" }
            ]
          }
        },
        {
          page: "payment_settings",
          data: {
            upiId: "optiklensmart@okhdfcbank",
            payeeName: "OptikLensmart",
            customQrUrl: ""
          }
        }
      ]);
    }
    console.log('✅ [Auto-Init Done]: All Lenses, Coatings & CMS Assets Ready!');
  } catch (err) {
    console.error(err);
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 [Server Running on Port]: ${PORT}`);
  console.log(`🌐 Admin Dashboard: http://localhost:5000/admin`);
  await connectDB();
  await autoSeedOnStartup();
});