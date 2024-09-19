import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const readline = require("readline");

// Type Definitions
interface Product {
  id: string;
  title: string;
  categories: string[];
  description: string;
  embedding?: number[];
}

interface SearchResult {
  product: Product;
  similarity: number;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example Produk
// const products: Product[] = [
//   {
//     id: "P001",
//     title: "Garmin Forerunner 945",
//     categories: ["Sports Watch", "GPS", "Fitness Tracker"],
//     description: "Advanced running and triathlon smartwatch with built-in GPS, performance monitoring, and long battery life. Features music storage and smart notifications.",
//   },
//   {
//     id: "P002",
//     title: "Garmin Fenix 6 Pro",
//     categories: ["Sports Watch", "Outdoor", "GPS"],
//     description: "Multisport GPS smartwatch designed for outdoor enthusiasts. Offers advanced training metrics, navigation tools, and rugged durability with a long-lasting battery.",
//   },
//   {
//     id: "P003",
//     title: "Polar Vantage V2",
//     categories: ["Sports Watch", "GPS", "Fitness Tracker"],
//     description: "Premium multisport watch with precision tracking, running and cycling analytics, and recovery insights. Features integrated GPS and customizable training plans.",
//   },
//   {
//     id: "P004",
//     title: "Suunto 9 Baro",
//     categories: ["Sports Watch", "Outdoor", "GPS"],
//     description: "Durable GPS watch with intelligent battery modes, weather tracking, and detailed sport-specific metrics. Ideal for long-distance runners and outdoor adventurers.",
//   },
//   {
//     id: "P005",
//     title: "Coros Apex Pro",
//     categories: ["Sports Watch", "GPS", "Fitness Tracker"],
//     description: "Lightweight and rugged GPS sports watch offering extensive battery life, advanced training features, and seamless connectivity with smart devices.",
//   },
//   {
//     id: "P006",
//     title: "Garmin Instinct Solar",
//     categories: ["Sports Watch", "Outdoor", "GPS"],
//     description: "Rugged outdoor smartwatch with solar charging capabilities, built-in GPS, heart rate monitoring, and various sport modes for adventurers.",
//   },
//   {
//     id: "P007",
//     title: "Garmin Vivoactive 4",
//     categories: ["Sports Watch", "Fitness Tracker", "Smartwatch"],
//     description: "Versatile smartwatch with GPS, heart rate monitoring, advanced fitness tracking features, music storage, and smart notifications for everyday use.",
//   },
//   {
//     id: "P008",
//     title: "Garmin Forerunner 55",
//     categories: ["Sports Watch", "GPS", "Fitness Tracker"],
//     description: "Entry-level running smartwatch with built-in GPS, daily suggested workouts, heart rate monitoring, and lightweight design for comfortable wear.",
//   },
//   {
//     id: "P009",
//     title: "Garmin Fenix 7",
//     categories: ["Sports Watch", "Outdoor", "GPS"],
//     description: "Next-generation multisport GPS smartwatch with advanced navigation, extended battery life, solar charging, and comprehensive health and fitness tracking.",
//   },
//   {
//     id: "P010",
//     title: "Garmin Venu 2",
//     categories: ["Sports Watch", "Fitness Tracker", "Smartwatch"],
//     description: "Stylish smartwatch with AMOLED display, built-in GPS, advanced health monitoring, music storage, and smart notifications tailored for active lifestyles.",
//   },
// ];

const products: Product[] = [
  {
    id: "P001",
    title: "Garmin Forerunner 945, Premium GPS Running/Triathlon Smartwatch with Music, Black - 010-02063-00",
    categories: ["Sports Watch", "GPS", "Fitness Tracker"],
    description:
      "	Unduh lagu ke jam tangan Anda, termasuk playlist dari Spotify, Amazon Music, atau Deezer (mungkin memerlukan langganan premium dengan penyedia musik pihak ketiga).\nFitur pemantauan kinerja meliputi Vo2 Max dan status pelatihan dengan penyesuaian untuk panas, ketinggian, status aklimasi, fokus beban pelatihan, waktu pemulihan, serta efek pelatihan aerobik dan anaerobik.\nGarmin Pay, solusi pembayaran tanpa kontak (tersedia untuk kartu yang didukung dari bank-partner), memungkinkan Anda melakukan pembayaran dengan mudah menggunakan jam tangan Anda sehingga Anda dapat meninggalkan uang tunai dan kartu di rumah.\nPeta berwarna penuh yang terintegrasi membimbing Anda saat berlari sehingga Anda tidak pernah tersesat selama latihan.\nFitur keselamatan dan pelacakan meliputi deteksi insiden (selama aktivitas tertentu) yang mengirimkan lokasi Anda secara real-time ke kontak darurat melalui smartphone yang kompatibel yang dipasangkan.\nDaya tahan baterai: Hingga 2 minggu dalam mode smartwatch, 10 jam dalam mode GPS dengan musik, atau hingga 60 jam dalam mode ultratrac. Resolusi layar - 240 x 240 piksel",
  },
  {
    id: "P002",
    title: "Garmin 010-02158-01 fenix 6 Pro, Premium Multisport GPS Watch, Features Mapping, Music, Grade-Adjusted Pace Guidance and Pulse Ox Sensors, Black",
    categories: ["Sports Watch", "Outdoor", "GPS"],
    description:
      "Cocok untuk performa dengan desain yang tangguh dan canggih yang menampilkan layar selalu aktif berukuran 1,3” (18% lebih besar daripada model Fenix sebelumnya) yang dapat dibaca di bawah sinar matahari dengan bezel dari stainless steel, titanium, atau lapisan karbon seperti berlian (DLC). Fitur Khusus: Bluetooth.\nEstimasi detak jantung pergelangan tangan dan Pulse Ox yang ditingkatkan untuk mendukung pemantauan tidur tingkat lanjut dan aklimatisasi ketinggian pada elevasi tinggi (ini bukan perangkat medis dan tidak dimaksudkan untuk digunakan dalam diagnosis atau pemantauan kondisi medis apa pun).\nFitur pelatihan tingkat lanjut termasuk PacePro untuk panduan kecepatan yang disesuaikan dengan tingkat kesulitan sepanjang aktivitas Anda serta estimasi VO2 max dan status pelatihan yang disesuaikan dengan lingkungan.\nMenavigasi alam luar dengan peta topografi yang telah dimuat sebelumnya, peta ski untuk lebih dari 2.000 resor ski di seluruh dunia, dukungan untuk berbagai sistem satelit navigasi global (GPS, GLONASS, dan Galileo), serta sensor bawaan untuk kompas 3-sumbu, giroskop, dan altimeter barometrik.\nDukungan untuk pembayaran tanpa kontak Garmin Pay (tidak semua negara dan jaringan pembayaran memenuhi syarat), penyimpanan musik dengan dukungan layanan streaming premium (mungkin memerlukan langganan dengan penyedia musik pihak ketiga), notifikasi pintar, dan lainnya.\nPerforma baterai: Hingga 14 hari dalam mode Smart Watch, hingga 10 jam dalam mode GPS dan musik, hingga 28 hari dalam mode aktivitas GPS ekspedisi, dan hingga 48 hari dalam mode hemat baterai Smart Watch.\nKomponen yang disertakan: Fenix 6, kabel pengisian/data, dokumentasi.",
  },
  {
    id: "P003",
    title: "Polar Vantage V3, Sport Watch with GPS, Heart Rate Monitor, and Extended Battery Life, Smart Watch for Men and Women, Offline Maps, Running, Triathlon Watch, Black",
    categories: ["Sports Watch", "GPS", "Fitness Tracker"],
    description:
      "Layar sentuh AMOLED paling tajam. Layar yang cerah dan besar untuk melihat semua data dan metrik Anda—dengan dasbor dan widget yang dapat disesuaikan untuk akses cepat ke informasi yang paling penting.\nJam Tangan Sport dengan GPS frekuensi ganda dan peta detail. Lihat di mana Anda berada dan ke mana Anda akan pergi dengan peta yang dapat diunduh dengan kontur yang detail untuk pengalaman topografi terbaik.\nSuite pelatihan dan pemulihan paling komprehensif – lebih dari sekadar jam tangan lari. Dengan lebih dari 150 olahraga yang tersedia, Anda mendapatkan semua yang Anda butuhkan untuk meningkatkan performa Anda.\nDaya tahan baterai yang diperpanjang yang bertahan selama berhari-hari. Hingga 140 jam waktu pelatihan dan hingga 8 hari penggunaan reguler dengan sekali pengisian. Baterai jam pintar ini dirancang untuk memberikan durasi penggunaan yang lebih lama.",
  },
  {
    id: "P004",
    title: "SUUNTO 9 Baro: Rugged GPS Running, Cycling, Adventure Watch with Route Navigation",
    categories: ["Sports Watch", "Outdoor", "GPS"],
    description:
      "Jam GPS multisport yang tahan lama ini dirancang untuk atlet yang menuntut yang terbaik; Menampilkan lebih dari 80 mode olahraga, barometer untuk informasi ketinggian yang akurat, dan monitor detak jantung pergelangan tangan.\nBuilt To Last: Dibuat untuk pelatihan, balapan, dan petualangan ekstrem, jam GPS ini memberikan hingga 120 jam pelacakan latihan terus-menerus; Tahan air hingga 100 meter; Sempurna untuk lari, hiking, bersepeda, dan lainnya.\nGet Connected: Hubungkan ke aplikasi olahraga dan layanan favorit Anda dari aplikasi Suunto untuk mendapatkan lebih banyak dari jam tangan Anda; Bagikan dengan komunitas olahraga Anda dan akses analisis pelatihan serta panduan khusus.\nAdventure Starts Here: Menggabungkan desain Skandinavia dengan material yang sangat tahan lama, jam tangan kami melacak olahraga, aktivitas harian, dan tidur Anda untuk membantu Anda menjaga keseimbangan hidup, pelatihan, dan pemulihan.\nAuthentic Heritage: Didirikan pada tahun 1936, Suunto membawa lebih dari 80 tahun kerajinan warisan berkualitas tinggi, ketepatan yang tak kenal lelah, dan inovasi pionir ke jam tangan, kompas, dan produk menyelam kami. Bangga dibuat dengan 100% energi terbarukan.",
  },
  {
    id: "P005",
    title: "Coros Apex Pro",
    categories: ["Sports Watch", "GPS", "Fitness Tracker"],
    description: "Lightweight and rugged GPS sports watch offering extensive battery life, advanced training features, and seamless connectivity with smart devices.",
  },
  {
    id: "P006",
    title: "Garmin Instinct Solar",
    categories: ["Sports Watch", "Outdoor", "GPS"],
    description: "Smartwatch outdoor yang tangguh dengan kemampuan pengisian daya surya, GPS bawaan, pemantauan detak jantung, dan berbagai mode olahraga untuk para petualang.",
  },
  {
    id: "P007",
    title: "Garmin Vivoactive 4",
    categories: ["Sports Watch", "Fitness Tracker", "Smartwatch"],
    description: "Smartwatch serbaguna dengan GPS, pemantauan detak jantung, fitur pelacakan kebugaran tingkat lanjut, penyimpanan musik, dan notifikasi pintar untuk penggunaan sehari-hari.",
  },
  {
    id: "P008",
    title: "Garmin Forerunner 55",
    categories: ["Sports Watch", "GPS", "Fitness Tracker"],
    description: "Smartwatch lari tingkat pemula dengan GPS bawaan, latihan yang disarankan setiap hari, pemantauan detak jantung, dan desain ringan untuk kenyamanan pemakaian.",
  },
  {
    id: "P009",
    title: "Garmin Fenix 7",
    categories: ["Sports Watch", "Outdoor", "GPS"],
    description: "Smartwatch GPS multisport generasi berikutnya dengan navigasi tingkat lanjut, daya tahan baterai yang diperpanjang, pengisian daya surya, dan pelacakan kesehatan serta kebugaran yang komprehensif.",
  },
  {
    id: "P010",
    title: "Garmin Venu 2",
    categories: ["Sports Watch", "Fitness Tracker", "Smartwatch"],
    description: "Smartwatch bergaya dengan layar AMOLED, GPS bawaan, pemantauan kesehatan tingkat lanjut, penyimpanan musik, dan notifikasi pintar yang disesuaikan untuk gaya hidup aktif.",
  },
];

async function getEmbedding(text: string, model: string = "text-embedding-ada-002"): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    // Extract the embedding vector from the response
    const [{ embedding }] = response.data;
    console.log(`Hasil Embedding untuk text: "${text}"`);
    console.log(embedding);
    return embedding;
  } catch (error: any) {
    // Handle errors (e.g., network issues, API errors)
    if (error.response) {
      console.error("Error Response:", error.response.status, error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
    throw error;
  }
}

async function generateEmbeddingsBatch(products: Product[], model: string = "text-embedding-ada-002"): Promise<Product[]> {
  try {
    const texts = products.map((product) => `${product.title}. Categories: ${product.categories.join(", ")}. Description: ${product.description}`);
    const response = await openai.embeddings.create({
      model: model,
      input: texts,
    });

    // Explicitly type 'item' to avoid implicit 'any'
    const embeddings = response.data.map((item: { embedding: number[] }) => item.embedding);
    // Map embeddings to products and display them
    const productsWithEmbeddings = products.map((product, index) => ({
      ...product,
      embedding: embeddings[index],
    }));

    productsWithEmbeddings.forEach((product, index) => {
      console.log(`Embedding for product ${index + 1}: ${product.title}`);
      console.log(product.embedding);
    });

    return productsWithEmbeddings;
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      console.error("Error Response:", error.response.status, error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
    throw error;
  }
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, idx) => acc + val * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

async function semanticSearch(query: string, products: Product[], getEmbeddingFn: (text: string) => Promise<number[]>, topK: number = 5): Promise<SearchResult[]> {
  // Generate embedding for the query
  const queryEmbedding = await getEmbeddingFn(query);

  // Calculate similarity scores
  const results: SearchResult[] = products
    .filter((product) => product.embedding) // Ensure the product has an embedding
    .map((product) => ({
      product: product,
      similarity: cosineSimilarity(queryEmbedding, product.embedding!),
    }))
    .sort((a, b) => b.similarity - a.similarity) // Sort descending by similarity
    .slice(0, topK); // Get top K results

  return results;
}

async function initializeProductCatalog(products: Product[]): Promise<Product[]> {
  console.log("Generating embeddings for the product catalog...");
  const productsWithEmbeddings = await generateEmbeddingsBatch(products);
  console.log("Embeddings generated successfully.\n");
  return productsWithEmbeddings;
}

/**
 * Runs the semantic search application.
 */
async function runSemanticSearch() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // Initialize the product catalog with embeddings
    const catalogWithEmbeddings = await initializeProductCatalog(products);

    // Prompt the user for queries
    rl.question("Enter your search query: ", async (query: string) => {
      console.log(`\nSearch Query: "${query}"\n`);

      // Perform semantic search
      const results = await semanticSearch(query, catalogWithEmbeddings, getEmbedding, 3);

      // Display the results
      console.log("Top Search Results:");
      results.forEach((result, index) => {
        console.log(`\nResult ${index + 1}:`);
        console.log(`Product ID: ${result.product.id}`);
        console.log(`Title: ${result.product.title}`);
        console.log(`Categories: ${result.product.categories.join(", ")}`);
        console.log(`Description: ${result.product.description}`);
        console.log(`Similarity Score: ${result.similarity.toFixed(4)}`);
      });

      console.log("\n" + "-".repeat(50) + "\n");

      // Close the readline interface
      rl.close();
    });
  } catch (error) {
    console.error("An error occurred during semantic search:", error);
    rl.close();
  }
}

// Execute the semantic search
runSemanticSearch();
