export const resume = {
  name: "Jiya Jain",
  location: "New Delhi, IN",
  email: "jainjiya2312@gmail.com",
  linkedin: "https://linkedin.com/in/jiyajain23",
  github: "https://github.com/jiyajain23",
  summary:
    "Computer Science student focused on Machine Learning and AI, with experience building ML pipelines and solving real-world classification problems. Strong in DSA and analytical problem-solving, with a drive to turn theory into impactful solutions.",
  rotatingTitles: [
    "ML Engineer in the making",
    "NLP & Image recognition",
    "DSA problem-solver",
    "CS undergrad @ MSIT",
    "Building cool stuff",
    "Experimenting with AI & RAG",
    "Diving into Agentic AI"
  ],
  education: [
    {
      school: "Maharaja Surajmal Institute of Technology",
      location: "New Delhi, IN",
      degree: "B.Tech in Computer Science & Engineering",
      detail: "CGPA: 9.19 / 10.0",
      period: "Graduating 2028",
    },
  ],
  skills: [
    {
      group: "Languages",
      color: "coral",
      items: ["Python", "C++", "JavaScript", "HTML/CSS"],
    },
    {
      group: "AI & Machine Learning",
      color: "lavender",
      items: [
        "LangChain",
        "PyTorch",
        "TensorFlow",
        "Keras",
        "Sentence-Transformers",
        "Scikit-learn",
        "NLTK",
        "Pandas",
        "NumPy",
        "Matplotlib",
      ],
    },
    {
      group: "Backend & Databases",
      color: "mint",
      items: [
        "FastAPI",
        "ChromaDB",
        "FAISS",
        "Node.js",
        "REST APIs",
        "MongoDB",
        "SQLite",
      ],
    },
    {
      group: "Tools & Concepts",
      color: "sunshine",
      items: [
        "Streamlit",
        "Git",
        "Postman",
        "Jupyter",
        "Google Colab",
        "DSA",
        "OOP",
      ],
    },
  ],
  experience: [
    {
      role: "Summer Intern — Machine Learning",
      org: "Airports Authority of India",
      location: "Safdarjung Airport, New Delhi",
      period: "June 2026 — August 2026",
      color: "coral",
      bullets: [
        "Built a neural network training pipeline from scratch, evaluating activation functions and addressing vanishing gradients.",
        "Benchmarked custom CNN architecture against transfer-learning for image classification, reducing convergence time by 5×.",
        "Enhanced an enterprise RAG system by implementing BM25 retrieval, reranking, digital text detection to bypass unnecessary OCR, and model caching with lazy loading, significantly improving retrieval quality and inference latency.",
      ],
    },
    {
      role: "AI/ML Intern",
      org: "DomaiynLabs LLP",
      location: "Remote",
      period: "April 2026 — July 2026",
      color: "lavender",
      bullets: [
        "Conducted research in AI safety, focusing on adversarial testing, contributing to the development of Bayora, an automated adversarial red teaming platform.",
        "Prepared research summaries, technical documents & reports.",
        "Built an end-to-end firewall layer by training, evaluating, and refining a binary classification model for adversarial prompt detection, while contributing to a FastAPI inference backend enabling real-time protection of LLM applications.",
      ],
    },
  ],
  projects: [
    {
      name: "Aviation Safety RAG Assistant",
      tagline: "RAG pipeline for AAI’s ATS manual and ATMC circulars",
      color: "lime",
      emoji: "📝",
      tech: ["Python","LangChain","Llama 3.1","ChromaDB","Cross-Encoder","Streamlit"],
      details: [
        "Built a hybrid-retrieval RAG pipeline (BM25 + ChromaDB + cross-encoder reranking) over AAI’s ATS manual and ATMC circulars, resolving ambiguous technical acronyms and improving retrieval precision over vector-only search.",
        "Designed an ingestion pipeline with PyMuPDF and RapidOCR to parse and index both digital and scanned legacy PDFs, chunking and embedding 670+ pages into a persistent vector store.",
        "Built automated regression tests using Pytest and an evaluation suite to benchmark retrieval accuracy and prevent context-retrieval failures.",
      ],
      github: "https://github.com/jiyajain23/rag-agent-aai",
    },
    {
      name: "SpeakEZ",
      tagline: "Real-time AI coaching for workplace scenarios",
      color: "hotpink",
      emoji: "🎙️",
      tech: [
        "FastAPI",
        "Node.js",
        "Gemini Live API",
        "PyTorch",
        "sentence-transformers",
        "MediaPipe",
        "Prisma",
      ],
      details: [
        "Engineered a real-time AI coaching platform simulating workplace scenarios through low-latency voice interactions using the Gemini Live API on a distributed system.",
        "Developed a multi-modal evaluation pipeline: sentence-transformer embeddings, speech fluency analysis, acoustic confidence features, and MediaPipe-based live nudges — with personalized insights.",
        "Implemented context-injection via dynamic ingestion of resumes, job descriptions, and project docs so the AI adapts its questioning and feedback.",
      ],
      github: "https://github.com/jiyajain23/speakEZ-jj", 
    },
    {
      name: "Marketplace Product Image Classifier",
      tagline: "110k+ images across 42 categories",
      color: "cyan",
      emoji: "🛍️",
      tech: ["Python", "TensorFlow", "MobileNetV2", "Streamlit"],
      details: [
        "Built an image classification system using MobileNetV2 transfer learning to categorize 110,000+ marketplace product images across 42 classes at 72.4% accuracy.",
        "Designed a scalable preprocessing pipeline for 10GB of image data, mitigating class imbalance and improving validation accuracy by 5%.",
        "Deployed the model through an interactive Streamlit application.",
      ],
      github: "https://github.com/jiyajain23/product_classifier",
    },
  
  ],
  activities: [
    {
      title: "LinkedIn CoachIn Mentee",
      period: "Feb 2026 — June 2026",
      note: "Selected amongst top 100 from 21,000+ applicants",
      details: [
        "1:1 technical mentorship with a Senior LinkedIn Software Engineer.",
        "Mastered DSA through a rigorous curriculum, mock tests, and mock interviews.",
        "Won the internal hackathon amongst 20 teams."
      ],
      badge: "🏆",
      color: "sunshine",
    },
    {
      title: "Codess.cafe Mentee",
      period: "Oct 2024 — Present",
      note: "Community for Women in STEM & their ML cohort",
      details: [],
      badge: "💫",
      color: "hotpink",
    },
    {
      title: "Volunteer at Help the Needy",
      period: "Oct 2024 — Present",
      note: "Packed and distributed essentials at Old-age homes",
      details: [],
      badge: "💖",
      color: "coral",
    },
  ],
  certifications: [
    { name: "Advanced Learning Algorithms", org: "DeepLearning.AI", year: "2026", color: "lavender" },
    { name: "Supervised Learning: Regression & Classification", org: "DeepLearning.AI", year: "2026", color: "mint" },
    {
      name:"Fundamentals of AI Agents using RAG and Langchain",org:"IBM",year:"2026",color:"cyan",
    },
    { name: "Mathematics for Machine Learning", org: "DeepLearning.AI", year: "2025", color: "cyan" },
  ],
};

export type Resume = typeof resume;
