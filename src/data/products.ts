import sapphireStuds from "@/assets/product-sapphire-studs.png";
import kundanChoker from "@/assets/product-kundan-choker.png";
import diamondStuds from "@/assets/product-diamond-studs.png";
import goldPendant from "@/assets/product-gold-pendant.png";
import silverChain from "@/assets/product-silver-chain.png";
import coinNecklace from "@/assets/product-coin-necklace.png";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tagline: string;
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "sapphire-halo-studs",
    name: "Sapphire Halo Studs",
    price: 28500,
    image: sapphireStuds,
    category: "Earrings",
    tagline: "The Neelam signature, set in 18k gold.",
    description:
      "Oval-cut blue sapphires framed by a halo of round brilliant diamonds. Hand-set in 18k yellow gold by our Jaipur atelier.",
    details: ["18k Yellow Gold", "Natural Blue Sapphire", "VS Diamond Halo", "Push-back closure"],
  },
  {
    id: "kundan-rajwada-choker",
    name: "Rajwada Kundan Choker",
    price: 184000,
    image: kundanChoker,
    category: "Necklaces",
    tagline: "Heirloom craftsmanship for the modern bride.",
    description:
      "A Jadau choker handcrafted with uncut polki, emerald drops and freshwater pearls — a piece designed to be passed down.",
    details: ["22k Gold Plated Silver", "Polki Kundan", "Emerald Beads", "South Sea Pearls"],
  },
  {
    id: "solitaire-classique",
    name: "Solitaire Classique Studs",
    price: 96000,
    image: diamondStuds,
    category: "Earrings",
    tagline: "Brilliant. Effortless. Forever.",
    description:
      "Round brilliant solitaires in a four-prong basket setting — the cleanest expression of light and form.",
    details: ["18k White Gold", "0.75 ct each", "F/VS1 clarity", "Screw-back closure"],
  },
  {
    id: "luna-coin-pendant",
    name: "Luna Coin Pendant",
    price: 14200,
    image: goldPendant,
    category: "Necklaces",
    tagline: "A tiny constellation against the skin.",
    description:
      "A delicate gold disc set with a single diamond, suspended from a fine cable chain. Designed for layering.",
    details: ["18k Yellow Gold", "0.05 ct diamond", "16-18\" adjustable", "Skin-safe"],
  },
  {
    id: "linked-paperclip",
    name: "Linked Paperclip Set",
    price: 22800,
    image: silverChain,
    category: "Sets",
    tagline: "An everyday duo, quietly confident.",
    description:
      "A polished sterling silver paperclip chain and matching bracelet. Engineered to layer, made to live in.",
    details: ["925 Sterling Silver", "Anti-tarnish coated", "Adjustable length", "Hypoallergenic"],
  },
  {
    id: "est-1995-medallion",
    name: "Est. 1995 Medallion",
    price: 18600,
    image: coinNecklace,
    category: "Necklaces",
    tagline: "A keepsake stamped with your story.",
    description:
      "A solid gold medallion, engravable on request. Suspended from a whisper-fine chain.",
    details: ["18k Yellow Gold", "Engravable", "Comes in heritage box", "Lifetime polish"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
